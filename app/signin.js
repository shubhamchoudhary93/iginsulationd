import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../context/authContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function signin() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Please enter your email and password");
      return;
    }

    setLoading(true);
    const response = await login(emailRef.current, passwordRef.current);
    setLoading(false);
    if (!response.success) {
      Alert.alert("Sign In", response.msg);
      return;
    }
  };

  return (
    <View
      className="flex-1 items-center self-center justify-center p-10 gap-5"
      style={{ height: hp(25), width: wp(40) }}
    >
      <View className="bg-slate-200 p-7 rounded-xl">
        <Text className="text-3xl text-indigo-500 mb-10">Sign In</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(value) => (emailRef.current = { value })}
          style={{ fontSize: hp(2) }}
          className="font-semibold text-neutral-700 h-10 p-2"
          placeholder="Email Address"
          placeholderTextColor={"gray"}
        />
        <TextInput
          secureTextEntry
          onChangeText={(value) => (passwordRef.current = { value })}
          style={{ fontSize: hp(2) }}
          className="font-semibold text-neutral-700 h-10 p-2"
          placeholder="Password"
          placeholderTextColor={"gray"}
        />
        <View>
          {loading ? (
            <View className="bg-indigo-400 justify-center items-center pl-10 pr-10 pt-5 pb-5 rounded-2xl mt-5">
              <Text
                style={{ fontSize: hp(2.7) }}
                className="text-white font-bold tracking-wider"
              >
                Loading...
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              onPress={handleLogin}
              style={{ height: hp(6.5) }}
              className="bg-indigo-500 justify-center items-center pl-10 pr-10 pt-5 pb-5 rounded-2xl mt-5"
            >
              <Text
                style={{ fontSize: hp(2.7) }}
                className="text-white font-bold tracking-wider"
              >
                Sign In
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
