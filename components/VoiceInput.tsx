import React, { useState, useEffect } from 'react'
import { ActivityIndicator, Dimensions, Image, StyleSheet, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import {
  SPEECH_TO_TEXT_URL,
  serverURL,
  TEXT_TO_SPEECH_URL } from '../env.json'
import { Button, Text } from 'native-base'
import { Audio } from 'expo-av'
import * as FileSystem from 'expo-file-system'
import * as Permissions from 'expo-permissions'
import Axios from 'axios'
import base64 from 'react-native-base64'
import Spacing from './styles/Spacing'

const backgroundColor = '#004785'
const soundUri = FileSystem.documentDirectory + 'charlieRes.mp3'

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
  const [charlieRes, setCharlieRes] = useState('')

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

  const askCharlie = (intent: string) => {
    api.post('/talk', {
      text: intent
    })
    .then(res => {
      console.log(`Charlie Response: ${res.data}`)
      setCharlieRes(modifyRes(res.data))
      getTextToSpeech(res.data)
    })
    .catch(error => {
      console.log(error)
    })
  }

  const deleteRecordingFile = async () => {
    try {
      const info = await FileSystem.getInfoAsync(recording.getURI())
      await FileSystem.deleteAsync(info.uri)
    } catch (error) {
      console.log('There was an error deleting recording file', error)
    }
  }

  const deleteResponseFile = async () => {
    try {
      const resFile = await FileSystem.getInfoAsync(soundUri)
      if (resFile.exists) await FileSystem.deleteAsync(resFile.uri, {
        idempotent: true
      })
    } catch (error) {
      console.log('There was an error deleting response audio file', error)
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
        FileSystem.writeAsStringAsync(soundUri, encoded, {
          encoding: FileSystem.EncodingType.Base64
        })
        playResponse(soundUri) // Play Charlie Response
      } catch(error) {
        console.log(error)
      }
    } catch(error) {console.log(`getTextToSpeech Error: ${error}`)}
  }

  const getTranscription = async () => {
    setIsFetching(true)
    try {
      const info = await FileSystem.getInfoAsync(recording.getURI())
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
      setIntent(modifyIntent(data.transcript))
      askCharlie(data.transcript)
    } catch (error) {
      console.log('There was an error reading file', error)
      stopRecording()
      resetRecording() // Audio file deleted here
    }
    setIsFetching(false)
    // deleteResponseFile()
  }

  const handleOnPressIn = () => {
    startRecording()
  }

  const handleOnPressOut = async () => {
    stopRecording()
    getTranscription()
  }

  const modifyIntent = (intent: string) => {
    const interrogativeWords = {
      can: 'can',
      how: 'how',
      should: 'should',
      who: 'who',
      'who\'s': 'who\'s',
      what: 'what',
      'what\'s': 'what\'s',
      where: 'where',
      'where\'s': 'where\'s',
      when: 'when',
      'when\'s': 'when\'s',
      why: 'why'
    } // @ts-ignore: Element implicitly has an 'any' type
    if (interrogativeWords[intent.split(' ')[0]])
      intent += '?' // Add question mark if necessary
    else
      intent += '.' // Add period
    return intent.charAt(0).toUpperCase() + intent.slice(1) // Capitalize
  }

  const modifyRes = (res: string) => {
    if (res[res.length-1] !== '.' && res[res.length-1] !== '?' &&
        res[res.length-1] !== ' ')
          res += '.' // Add period
    return res
  }

  const playResponse = async (uri: string) => {
    try {
      await Audio.Sound.createAsync({ uri },
        { shouldPlay: true })
    } catch (error) {
      console.log(error)
    }
  }

  const resetRecording = () => {
    deleteRecordingFile()
    setRecording(null)
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
    setCharlieRes('') // Reset Charlie's last response
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

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/img/charlie_logo.png')} />
      <Spacing top={40} />
      <View style={styles.wrapper}>
        {intent === '' ? (
          <View>
            <View style={styles.titleTextWrapper}>
              <Text style={{ color: '#fff', fontSize: 30 }}>Charlie Assistant</Text>
            </View>
          </View>) : (
          <View style={styles.resTextWrapper}>
            {intent !== '' && <Text style={styles.res}>{`You Asked:\n${intent}`}</Text>}
            <Spacing top={20} />
            {charlieRes !== '' && (
              <Text style={styles.res}>{`Charlie Replied:\n${charlieRes}`}</Text>)}
          </View>
        )}
        <View style={styles.buttonWrapper}>
          <Button full style={styles.button}
            onPress={!isRecording ? handleOnPressIn : handleOnPressOut}
            disabled={isFetching}
          >
            {isFetching ? (
              <ActivityIndicator
                color={backgroundColor}
                size={'large'} />) :
              (<Text style={styles.text}>
                {!isRecording ? (
                  <FontAwesome
                    name='microphone'
                    size={35}
                    color={backgroundColor} />
                ) : (
                  <FontAwesome
                    name='stop'
                    size={30}
                    color={backgroundColor} />
                )}
              </Text>)}
          </Button>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    borderRadius: 100,
    width: 75,
    height: 75
  },
  buttonWrapper: {
    width: '100%',
    paddingLeft: (Dimensions.get('window').width / 2) - (75 / 2),
    position: 'absolute',
    bottom: 25
  },
  container: {
    height: '100%',
    backgroundColor: '#111'
  },
  logo: {
    height: '100%',
    width: '100%',
    opacity: 0.2,
    position: 'absolute',
    resizeMode: 'contain'
  },
  res: {
    color: '#fff',
    fontSize: 20
  },
  text: {
    fontSize: 16
  },
  titleTextWrapper: {
    width: '90%',
    marginLeft: '5%',
    alignItems: 'center'
  },
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    position: 'relative'
  },
  resTextWrapper: {
    width: '90%',
    marginLeft: '5%'
  }
})

export default VoiceInput
