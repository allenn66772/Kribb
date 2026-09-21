import type { ReactNode } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'

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
const TEXT = '#EAF2F0'
const MUTED = '#8FA9A8'

type FieldProps = TextInputProps & {
  label: string
  icon: keyof typeof Ionicons.glyphMap
  right?: ReactNode
}

function Field({ label, icon, right, ...inputProps }: FieldProps) {
  return (
    <View>
      <Text className="mb-2 text-[13px] font-medium text-[#8FA9A8]">{label}</Text>
      <View className="h-14 flex-row items-center rounded-2xl border border-[#24474D] bg-[#12292D] px-4">
        <Ionicons name={icon} size={20} color={MUTED} />
        <TextInput
          {...inputProps}
          placeholderTextColor="#5F7B7C"
          selectionColor="#F5B94A"
          cursorColor="#F5B94A"
          className="ml-3 flex-1 py-0 text-base text-[#EAF2F0]"
        />
        {right}
      </View>
    </View>
  )
}

function SocialButton({
  icon,
  label,
}: {
  icon: keyof typeof Ionicons.glyphMap
  label: string
}) {
  return (
    <Pressable className="h-14 flex-1 flex-row items-center justify-center gap-2 rounded-2xl border border-[#24474D] bg-[#12292D] active:bg-[#17343A]">
      <Ionicons name={icon} size={20} color={TEXT} />
      <Text className="text-[15px] font-medium text-[#EAF2F0]">{label}</Text>
    </Pressable>
  )
}

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
              <Field label="Full name" icon="person-outline" placeholder="Alex Morgan" />
              <Field label="Email" icon="mail-outline" placeholder="you@example.com" />

              <View>
                <Field
                  label="Password"
                  icon="lock-closed-outline"
                  placeholder="At least 8 characters"
                  secureTextEntry
                  right={<Ionicons name="eye-outline" size={20} color={MUTED} />}
                />

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
            <Pressable className="mt-6 h-14 items-center justify-center rounded-2xl bg-[#F5B94A] active:opacity-90">
              <Text className="text-base font-semibold text-[#0B1F22]">Create account</Text>
            </Pressable>

            {/* Social */}
            <View className="my-6 flex-row items-center gap-3">
              <View className="h-px flex-1 bg-[#1B3A3F]" />
              <Text className="text-[13px] text-[#8FA9A8]">Or continue with</Text>
              <View className="h-px flex-1 bg-[#1B3A3F]" />
            </View>

            <View className="flex-row gap-3">
              <SocialButton icon="logo-google" label="Google" />
              <SocialButton icon="logo-apple" label="Apple" />
            </View>

            {/* Footer pinned to the bottom */}
            <View className="mt-auto flex-row items-center justify-center pt-8">
              <Text className="text-[#8FA9A8]">Already have an account? </Text>
              <Text className="font-semibold text-[#F5B94A]">Log in</Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  )
}