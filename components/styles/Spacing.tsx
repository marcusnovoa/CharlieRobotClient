import React from 'react'
import { View } from 'react-native'

export interface Props {
    top?: number,
    bottom?: number
}

const Spacing: React.FC<Props> = ({ top, bottom }) => (
    <View style={{ marginTop: top, marginBottom: bottom }}/>
)

export default Spacing
