import { View, Text } from 'react-native'
import React from 'react'
import {SafeAreaView } from 'react-native-safe-area-context'


export default function Home() {
  return (
  <SafeAreaView>
      <View >
        <Text className='text-blue-700 text-xl font-bold'>Home</Text>
      </View>
  </SafeAreaView>
  )
}