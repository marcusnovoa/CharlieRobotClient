import React from 'react'
import { StyleSheet } from 'react-native'
import { Badge, Icon } from 'native-base'

export interface Props {
  success: boolean
}

const BadgeCustom: React.FC<Props> = ({ success }) => (
    <Badge success danger={!success} style={styles.badge}>
      <Icon type='FontAwesome' name={success ? 'check' : 'times'} style={styles.icon}/>
    </Badge>
)

const styles = StyleSheet.create({
  badge: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: 35,
    borderRadius: 100
  },
  icon: {
    color: '#fff',
    fontSize: 20
  }
})

export default BadgeCustom
