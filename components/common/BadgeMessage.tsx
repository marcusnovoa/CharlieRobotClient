import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'native-base'
import BadgeCustom from './BadgeCustom'

export interface Props {
  success: boolean,
  text: string
}

const BadgeMessage: React.FC<Props> = ({ success, text }) => (
  <View style={styles.badgeContainer}>
    <View style={styles.badgeWrapper}>
      <BadgeCustom success={success} />
    </View>
    <Text style={styles.messageText}>{text}</Text>
  </View>
)

const styles = StyleSheet.create({
  badgeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  badgeWrapper: {
    marginRight: 16
  },
  messageText: {
    color: '#fff'
  }
})

export default BadgeMessage
