import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

export default function index() {
  return (
    <View className="flex-1 bg-slate-500 items-center justify-center">
      <ActivityIndicator size="large" color="white" />
    </View>
  );
}
