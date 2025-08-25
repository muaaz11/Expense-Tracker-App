import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { use, useContext, useEffect, useState } from 'react'
import { AppContext } from '@/context/store.js'
import { colors } from '@/constant/style'

const Landing = () => {

  const {user} = useContext(AppContext)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log("User Details",user);
  }, [])

  if(!user){
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size={'large'} color={"green"}/>
      </View>
    )
  }

  return (
    <View>
      <Text>{user.email}</Text>
    </View>
  )
}

export default Landing

const styles = StyleSheet.create({})