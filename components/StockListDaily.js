import { View, Text, FlatList } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function StockListDaily({ stockTransactions }) {
  return (
    <View
      style={{
        height: wp(80),
        marginHorizontal: 20,
        backgroundColor: "#f1f5f9",
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
        marginBottom: 20,
      }}
    >
      <FlatList
        contentContainerStyle={{
          alignSelf: "flex-start",
        }}
        numColumns={3}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
        data={stockTransactions}
        renderItem={({ item }) => (
          <View className="p-2">
            <Text className={`text-center ${item.add ? "" : "text-red-600"}`}>
              {item.name}
            </Text>
            <Divider item={item} />
            <Text className={`text-center ${item.add ? "" : "text-red-600"}`}>
              {item.quantity}
            </Text>
          </View>
        )}
        keyExtractor={(item) => Math.random()}
      />
    </View>
  );
}

const Divider = ({ item }) => {
  return (
    <View
      className={`w-full p-[1px] ${
        item <= 10 ? "bg-red-600" : "bg-neutral-600"
      }`}
    />
  );
};
