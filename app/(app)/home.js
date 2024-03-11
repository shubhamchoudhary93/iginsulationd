import { View, Text, Pressable } from "react-native";
import React, { useEffect, useRef, useState } from "react";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import DailyStockComponent from "../../components/DailyStockComponent";
import { useRouter } from "expo-router";

export default function home() {
  const router = useRouter();
  return (
    <View
      className="flex-1 items-center self-center justify-center p-10 gap-5"
      style={{ height: hp(25), width: wp(40) }}
    >
      <Pressable onPress={() => router.push("dailystock")}>
        <Text className="text-indigo-500 text-2xl">Daily Stock</Text>
      </Pressable>
    </View>
  );
}
