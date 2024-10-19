import React from 'react'
import { View,Text } from 'react-native'

import {useUser} from '../../userauth';



export default function Home(){

  const user = useUser()
  
    return (
      <View>
        {user && 
        <Text>Acceuil {user.user?.name}</Text>}
        </View>
    )
  
}
