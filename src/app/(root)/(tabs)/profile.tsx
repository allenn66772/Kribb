import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { useAuth } from '@clerk/expo';

export default function profile() {

  const router=useRouter();
  const {signOut}=useAuth();
  const handleSignout =async()=>{
    try {
      await signOut();
      router.replace("/sign-in")
      router
    } catch (error) {
      console.error("Error Signing Out",error)
    }
  }
  return (
   <SafeAreaView>
        <View className='m-9'>
          <TouchableOpacity className='w-[80px] h-[40px] border-2 ' onPress={handleSignout}><Text className='flex-row text-center items-center'>LogOut</Text></TouchableOpacity>
        </View>
   </SafeAreaView>
  )
}