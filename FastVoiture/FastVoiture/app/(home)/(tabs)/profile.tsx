
import React from 'react'
import { View,Text } from 'react-native'

import {useUser} from '../../userauth';


export default function ProfileScreen() {
    const user = useUser()
  
    return (
     <View><Text> Profile</Text></View>
    )
  
}

