import { View, Text } from "react-native";
import React from "react";
import SelectDropdown from "react-native-select-dropdown";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function DailyStockScreenSelectDropdown({ list, handle, text }) {
  return (
    <SelectDropdown
      data={list}
      onSelect={handle}
      defaultButtonText={text}
      buttonStyle={{
        backgroundColor: "#f1f5f9",
        marginHorizontal: 20,
        marginVertical: 10,
        width: wp(90),
        borderRadius: 10,
      }}
      dropdownStyle={{ backgroundColor: "#f1f5f9", borderRadius: 10 }}
      searchInputStyle={{ backgroundColor: "#f1f5f9", borderRadius: 10 }}
    />
  );
}
