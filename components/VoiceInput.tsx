import React, { useState, useEffect } from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import {
  SPEECH_TO_TEXT_URL,
  serverURL,
  TEXT_TO_SPEECH_URL } from '../env.json'
import { Body, Button, Card, CardItem, Text } from 'native-base'
import { Audio } from 'expo-av'
import * as FileSystem from 'expo-file-system'
import * as Permissions from 'expo-permissions'
import Axios from 'axios'
import base64 from 'react-native-base64'
import ScreenContainer from './containers/ScreenContainer'
import Spacing from './styles/Spacing'

const backgroundColor = '#004785'

/* ========= REDEFINE FORM DATA FOR REACT-NATIVE ========= */
interface FormDataValue {
  uri: string
  name: string
  type: string
}
interface FormData {
  append(name: string, value: string | Blob | FormDataValue, fileName?: string): void
  delete(name: string): void
  get(name: string): FormDataEntryValue | null
  getAll(name: string): FormDataEntryValue[]
  has(name: string): boolean
  set(name: string, value: string | Blob | FormDataValue, fileName?: string): void
}
declare let FormData: {
  prototype: FormData
  new (form?: HTMLFormElement): FormData
}
interface FormData {
  entries(): IterableIterator<[string, string | File]>
  keys(): IterableIterator<string>
  values(): IterableIterator<string | File>
  [Symbol.iterator](): IterableIterator<string | File>
}
/* ========= REDEFINE FORM DATA FOR REACT-NATIVE ========= */

const api = Axios.create({
  baseURL: serverURL
})

const recordingOptions = {
    /* ANDROID NOT CURRENTLY IN USE. Not getting results from speech to
     * text with .m4a files but the parameters are required. */
    android: {
      extension: '.m4a',
      outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
      audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
    },
    ios: {
      extension: '.wav',
      audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
      sampleRate: 44100,
      numberOfChannels: 1,
      bitRate: 128000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
}

const VoiceInput: React.FC = () => {
  const [recording, setRecording]: any = useState()
  const [isFetching, setIsFetching] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [intent, setIntent] = useState('')
  const [watsonRes, setWatsonRes] = useState('')

  useEffect(() => {
    Permissions.askAsync(Permissions.AUDIO_RECORDING)
    const enableAudio = async () => {
      await Audio.setIsEnabledAsync(true)
      await Audio.setAudioModeAsync({
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: true,
      })
    }
    enableAudio()
  }, [])

  const deleteRecordingFile = async () => {
    try {
      const info = await FileSystem.getInfoAsync(recording.getURI())
      await FileSystem.deleteAsync(info.uri)
    } catch (error) {
      console.log('There was an error deleting recording file', error)
    }
  }

  const getTextToSpeech = async (text: string) => {
    try {
      const response = await fetch(TEXT_TO_SPEECH_URL, {
        method: 'POST',
        body: text
      })
      const data = await response.json()
      const audioStream = data[0].audioContent.data // Data Bytes
      const encoded = base64.encodeFromByteArray(audioStream)

      try {
        // Create sound file in device directory
        const soundUri = FileSystem.documentDirectory + 'watsonRes.mp3'
        FileSystem.writeAsStringAsync(soundUri, encoded, {
          encoding: FileSystem.EncodingType.Base64
        })
        // Play Watson Response
        const playResponse = async () => {
          try {
            await Audio.Sound.createAsync({
              uri: soundUri
            }, { shouldPlay: true })
          } catch (error) {
            console.log(error)
          }
        }
        playResponse()
      } catch(error) {
        console.log(error)
      }
    } catch(error) {console.log(`getTextToSpeech Error: ${error}`)}
  }

  const getTranscription = async () => {
    setIsFetching(true)
    try {
      const info = await FileSystem.getInfoAsync(recording.getURI())
      // console.log(`FILE INFO: ${JSON.stringify(info)}`)
      const uri = info.uri
      const formData = new FormData()
      formData.append('file', {
        uri,
        type: 'audio/x-wav',
        name: 'speech2text'
      })
      const response = await fetch(SPEECH_TO_TEXT_URL, {
        method: 'POST', // @ts-ignore: Type 'FormData' is not assignable to body
        body: formData
      })
      const data = await response.json()
      console.log(`User Intent: ${data.transcript}`)
      setIntent(data.transcript)
      askWatson(data.transcript)
    } catch (error) {
      console.log('There was an error reading file', error)
      stopRecording()
      resetRecording() // Audio file deleted here
    }
    setIsFetching(false)
  }

  const startRecording = async () => {
    const { status } = await Permissions.getAsync(Permissions.AUDIO_RECORDING)
    if (status !== 'granted') return

    setIsRecording(true)
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: true,
    })
    
    setIntent('')    // Reset last intent
    setWatsonRes('') // Reset Watson's last response
    const newRecording = new Audio.Recording()

    try {
      await newRecording.prepareToRecordAsync(recordingOptions)
      await newRecording.startAsync()
    } catch (error) {
      console.log(error)
      stopRecording()
    }
    setRecording(newRecording)
  }

  const stopRecording = async () => {
    setIsRecording(false)
    try {
      await recording.stopAndUnloadAsync()
    } catch (error) {
      // Do nothing here. Already unloaded
    }
  }

  const resetRecording = () => {
    deleteRecordingFile()
    setRecording(null)
  }

  const handleOnPressIn = () => {
    startRecording()
  }

  const handleOnPressOut = () => {
    stopRecording()
    getTranscription()
  }

  const askWatson = (intent: string) => {
    api.post('/talk', {
      text: intent
    })
    .then((res) => {
      console.log(`Watson Response: ${res.data}`)
      setWatsonRes(res.data)
      getTextToSpeech(res.data)
    }, (err) => {
      console.log(err)
    })
  }

  return (
    <ScreenContainer>
      <Spacing top={40} />
      <Card style={styles.card}>
        <CardItem>
          <Body style={{ alignItems: 'center' }}>
            <FontAwesome
              name='microphone'
              size={48}
              color={backgroundColor}
              style={{ marginBottom: 10 }} />
            <Text style={styles.text}>Ask Watson</Text>
            <Spacing bottom={20} />
            <Button full style={{ backgroundColor }}
              onPressIn={handleOnPressIn}
              onPressOut={handleOnPressOut}
            >
              {isFetching && <ActivityIndicator color='#ffffff' />}
              {!isFetching && <Text style={styles.text}>
                Hold to Ask Watson
              </Text>}
            </Button>
          </Body>
        </CardItem>
      </Card>
      <Spacing bottom={20} />
      {intent !== '' && <Text style={styles.res}>{`You Asked:\n${intent}`}</Text>}
      <Spacing bottom={20} />
      {watsonRes !== '' && (
        <Text style={styles.res}>{`Watson Replied:\n${watsonRes}`}</Text>)}
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  card: {
    paddingTop: 20,
    paddingBottom: 8
  },
  res: {
    color: '#fff',
    fontSize: 20
  },
  text: {
    fontSize: 16
  }
})

export default VoiceInput
