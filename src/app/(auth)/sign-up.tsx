import { useState } from 'react'
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'
import { useAuth, useSignUp } from '@clerk/expo'
import { Link, useRouter } from 'expo-router'

/*
  Palette (dark: petrol + amber)
  petrol   #0B1F22  background
  surface  #12292D  fields, secondary buttons
  line     #24474D  field borders  (#1B3A3F for rings + dividers)
  text     #EAF2F0  primary text
  muted    #8FA9A8  secondary text, icons
  amber    #F5B94A  the only accent
*/
const PETROL = '#0B1F22'
const MUTED = '#8FA9A8'

/* Quiet concentric rings in the top-right corner */
function Rings() {
  return (
    <View
      pointerEvents="none"
      className="absolute -right-28 -top-28 h-80 w-80 items-center justify-center"
    >
      <View className="absolute h-80 w-80 rounded-full border border-[#1B3A3F]" />
      <View className="absolute h-60 w-60 rounded-full border border-[#1B3A3F]" />
      <View className="absolute h-40 w-40 rounded-full border border-[#1B3A3F] bg-[#F5B94A0F]" />
    </View>
  )
}

export default function SignUp() {
  const { signUp, errors, fetchStatus } = useSignUp()
  const { isSignedIn } = useAuth()
  const router = useRouter()

  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [code, setcode] = useState('')
  const [pendingVerification, setPendingVerification] = useState(false)

  const isLoading = fetchStatus === 'fetching'

  // Already signed in — nothing to do here.
  if (isSignedIn) {
    router.replace('/')
    return null
  }

  const onSignUpPress = async () => {
    const { error } = await signUp.password({
      emailAddress: email,
      password,
      lastName,
      firstName,
    })

    if (error) {
      alert(error.message)
      return
    }

    await signUp.verifications.sendEmailCode()
    setPendingVerification(true)
  }

  const onVerifyPress = async () => {
    const { error } = await signUp.verifications.verifyEmailCode({ code })

    if (error) {
      alert(error.message)
      return
    }

    if (signUp.status === 'complete') {
      await signUp.finalize({
        navigate: () => router.replace('/'),
      })
    }
  }

  if (pendingVerification) {
    return (
      <View className="flex-1 bg-[#0B1F22]">
        <StatusBar style="light" />
        <Rings />
        <SafeAreaView className="flex-1">
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            className="flex-1"
          >
            <ScrollView
              contentContainerClassName="grow px-6 pb-6 pt-6"
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <View className="h-11 w-11 items-center justify-center rounded-xl bg-[#F5B94A]">
                <Ionicons name="heart" size={22} color={PETROL} />
              </View>

              <View className="mt-10">
                <Text className="text-[34px] font-semibold leading-[40px] tracking-tight text-[#EAF2F0]">
                  Verify your{'\n'}email
                </Text>
                <Text className="mt-3 text-base leading-6 text-[#8FA9A8]">
                  Enter the code we sent to {email}.
                </Text>
              </View>

              <View className="mt-8">
                <Text className="mb-2 text-[13px] font-medium text-[#8FA9A8]">
                  Verification code
                </Text>
                <View className="h-14 flex-row items-center rounded-2xl border border-[#24474D] bg-[#12292D] px-4">
                  <TextInput
                    placeholder="123456"
                    keyboardType="number-pad"
                    placeholderTextColor="#5F7B7C"
                    selectionColor="#F5B94A"
                    cursorColor="#F5B94A"
                    value={code}
                    onChangeText={setcode}
                    className="ml-3 flex-1 py-0 text-base text-[#EAF2F0]"
                  />
                </View>
                {errors?.fields?.code && (
                  <Text className="mt-2 text-red-500">{errors.fields.code.message}</Text>
                )}
              </View>

              <TouchableOpacity
                onPress={onVerifyPress}
                disabled={isLoading}
                className="mt-6 h-14 items-center justify-center rounded-2xl bg-[#F5B94A] active:opacity-90"
              >
                {isLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-base font-semibold text-[#0B1F22]">Verify email</Text>
                )}
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    )
  }

  return (
    <View className="flex-1 bg-[#0B1F22]">
      <StatusBar style="light" />
      <Rings />

      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          className="flex-1"
        >
          <ScrollView
            contentContainerClassName="grow px-6 pb-6 pt-6"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Logomark */}
            <View className="h-11 w-11 items-center justify-center rounded-xl bg-[#F5B94A]">
              <Ionicons name="heart" size={22} color={PETROL} />
            </View>

            {/* Heading */}
            <View className="mt-10">
              <Text className="text-[34px] font-semibold leading-[40px] tracking-tight text-[#EAF2F0]">
                Create your{'\n'}account
              </Text>
              <Text className="mt-3 text-base leading-6 text-[#8FA9A8]">
                Save what you love and pick up where you left off.
              </Text>
            </View>

            {/* Form */}
            <View className="mt-8 gap-4">
              {/* name */}
              <View className="flex-row gap-10">
                <View className="w-[40%]">
                  <Text className="mb-2 text-[13px] w-[50%] font-medium text-[#8FA9A8]">
                    First name
                  </Text>
                  <View className="h-14 flex-row items-center rounded-2xl border border-[#24474D] bg-[#12292D] px-4">
                    <TextInput
                      placeholder="Alex"
                      placeholderTextColor="#5F7B7C"
                      selectionColor="#F5B94A"
                      cursorColor="#F5B94A"
                      value={firstName}
                      onChangeText={setfirstName}
                      className="ml-3 flex-1 py-0 text-base text-[#EAF2F0]"
                    />
                  </View>
                </View>

                <View className="w-[40%]">
                  <Text className="mb-2 text-[13px] w-[50%] font-medium text-[#8FA9A8]">
                    Last name
                  </Text>
                  <View className="h-14 flex-row items-center rounded-2xl border border-[#24474D] bg-[#12292D] px-4">
                    <TextInput
                      placeholder="Morgan"
                      placeholderTextColor="#5F7B7C"
                      selectionColor="#F5B94A"
                      cursorColor="#F5B94A"
                      value={lastName}
                      onChangeText={setlastName}
                      className="ml-3 flex-1 py-0 text-base text-[#EAF2F0]"
                    />
                  </View>
                </View>
              </View>

              {/* Email */}
              <View>
                <Text className="mb-2 text-[13px] font-medium text-[#8FA9A8]">Email</Text>
                <View className="h-14 flex-row items-center rounded-2xl border border-[#24474D] bg-[#12292D] px-4">
                  <Ionicons name="mail-outline" size={20} color={MUTED} />
                  <TextInput
                    placeholder="you@example.com"
                    placeholderTextColor="#5F7B7C"
                    selectionColor="#F5B94A"
                    cursorColor="#F5B94A"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setemail}
                    className="ml-3 flex-1 py-0 text-base text-[#EAF2F0]"
                  />
                </View>
                {errors?.fields?.emailAddress && (
                  <Text className="mt-2 text-red-500">{errors.fields.emailAddress.message}</Text>
                )}
              </View>

              {/* Password */}
              <View>
                <Text className="mb-2 text-[13px] font-medium text-[#8FA9A8]">Password</Text>
                <View className="h-14 flex-row items-center rounded-2xl border border-[#24474D] bg-[#12292D] px-4">
                  <Ionicons name="lock-closed-outline" size={20} color={MUTED} />
                  <TextInput
                    placeholder="At least 8 characters"
                    placeholderTextColor="#5F7B7C"
                    selectionColor="#F5B94A"
                    cursorColor="#F5B94A"
                    secureTextEntry
                    value={password}
                    onChangeText={setpassword}
                    className="ml-3 flex-1 py-0 text-base text-[#EAF2F0]"
                  />
                  <Ionicons name="eye-outline" size={20} color={MUTED} />
                </View>
                {errors?.fields?.password && (
                  <Text className="mt-2 text-red-500">{errors.fields.password.message}</Text>
                )}

                {/* Strength meter (static preview) */}
                <View className="mt-3 flex-row items-center gap-3">
                  <View className="flex-1 flex-row gap-1.5">
                    <View className="h-1 flex-1 rounded-full bg-[#F5B94A]" />
                    <View className="h-1 flex-1 rounded-full bg-[#F5B94A]" />
                    <View className="h-1 flex-1 rounded-full bg-[#F5B94A]" />
                    <View className="h-1 flex-1 rounded-full bg-[#24474D]" />
                  </View>
                  <Text className="text-xs font-medium text-[#F5B94A]">Good</Text>
                </View>
              </View>
            </View>

            {/* Terms */}
            <View className="mt-5 flex-row items-start gap-3">
              <View className="mt-0.5 h-5 w-5 items-center justify-center rounded-md bg-[#F5B94A]">
                <Ionicons name="checkmark" size={14} color={PETROL} />
              </View>
              <Text className="flex-1 text-sm leading-5 text-[#8FA9A8]">
                I agree to the{' '}
                <Text className="font-medium text-[#EAF2F0]">Terms of Service</Text> and{' '}
                <Text className="font-medium text-[#EAF2F0]">Privacy Policy</Text>.
              </Text>
            </View>

            {/* Primary action */}
            <TouchableOpacity
              onPress={onSignUpPress}
              disabled={isLoading}
              className="mt-6 h-14 items-center justify-center rounded-2xl bg-[#F5B94A] active:opacity-90"
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-base font-semibold text-[#0B1F22]">Create account</Text>
              )}
            </TouchableOpacity>

            {/* Footer pinned to the bottom */}
            <View className="mt-auto flex-row items-center justify-center pt-8">
              <Text className="text-[#8FA9A8]">Already have an account? </Text>
             <Link href="/sign-in" asChild>
    <Pressable>
      <Text className="font-semibold text-[#F5B94A]">Log in</Text>
    </Pressable>
  </Link>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  )
}