import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ActivityIndicator } from "react-native-web";
import generateTestData from "../utils/generateTestData";
import SelectDropdown from "react-native-select-dropdown";
import StockListDaily from "./StockListDaily";
import DailyStockScreenSelectDropdown from "./DailyStockScreenSelectDropdown";

export default function DailyStockComponent({ stocks }) {
  const [category, setCategory] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedStockList, setSelectedStockList] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [stockDetail, setStockDetail] = useState([]);
  const quantityRef = useRef(0);
  const [stockTransactions, setStockTrasanctions] = useState([]);

  useEffect(() => {
    setCategory(getCategory());
  }, [stocks]);

  useEffect(() => {
    filterStocksbyCategory();
  }, [selectedOption]);

  useEffect(() => {
    setStockDetail(stocks.filter((item) => item.name == selectedStock)[0]);
  }, [selectedStock]);

  const getCategory = () => {
    const uniqueValues = new Set(stocks.map((item) => item["category"]));
    return [...uniqueValues];
  };

  const handleSelectforCategory = (value, index) => {
    setSelectedOption(value);
  };

  const handleSelectforStock = (value, index) => {
    setSelectedStock(value);
  };

  const filterStocksbyCategory = () => {
    const filteredData = stocks.filter(
      (item) => item.category == selectedOption
    );
    const uniqueValues = new Set(filteredData.map((item) => item["name"]));
    setSelectedStockList([...uniqueValues]);
  };

  return (
    <ScrollView className="flex-1 bg-white">
      {stocks.length > 0 ? (
        <View>
          <DailyStockScreenSelectDropdown
            list={category}
            handle={handleSelectforCategory}
            text="Select Category"
          />
          <DailyStockScreenSelectDropdown
            list={selectedStockList}
            handle={handleSelectforStock}
            text="Select Stock"
          />

          {stockDetail && (
            <>
              <View style={{ marginEnd: 20 }} className="items-end">
                <Text
                  className={`${
                    stockDetail.current <= stockDetail.threshold
                      ? "text-red-600"
                      : ""
                  }`}
                >
                  Current Stock: {stockDetail.current}
                </Text>
              </View>
              <View style={{ height: hp(9) }}>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="numeric"
                  onChangeText={(value) => (quantityRef.current = { value })}
                  style={{
                    fontSize: hp(2),
                    paddingStart: 30,
                    marginHorizontal: 20,
                    marginVertical: 10,
                    borderRadius: 10,
                  }}
                  className="font-semibold flex-1 text-neutral-700 bg-slate-100"
                  placeholder="Quantity"
                  placeholderTextColor={"gray"}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  height: hp(9),
                  marginHorizontal: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    setStockTrasanctions((stockTransactions) => [
                      ...stockTransactions,
                      {
                        name: stockDetail.name,
                        quantity: quantityRef.current.value,
                        add: true,
                      },
                    ])
                  }
                  style={{ height: hp(6.5), marginEnd: 10, marginVertical: 10 }}
                  className="flex-1 bg-green-400 justify-center items-center "
                >
                  <Text
                    style={{ fontSize: hp(2.7) }}
                    className="text-white font-bold tracking-wider"
                  >
                    ADD
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    setStockTrasanctions((stockTransactions) => [
                      ...stockTransactions,
                      {
                        name: stockDetail.name,
                        quantity: quantityRef.current.value,
                        add: false,
                      },
                    ])
                  }
                  style={{ height: hp(6.5), marginVertical: 10 }}
                  className="flex-1 bg-red-400 justify-center items-center"
                >
                  <Text
                    style={{ fontSize: hp(2.7) }}
                    className="text-white font-bold tracking-wider"
                  >
                    MINUS
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
          {stockTransactions.length !== 0 ? (
            <StockListDaily stockTransactions={stockTransactions} />
          ) : null}
          <TouchableOpacity
            onPress={() => console.log("commit")}
            style={{
              height: hp(6.5),
              marginVertical: 10,
              marginHorizontal: 20,
            }}
            className="flex-1 bg-neutral-500 justify-center items-center"
          >
            <Text
              style={{ fontSize: hp(2.7) }}
              className="text-white font-bold tracking-wider"
            >
              SAVE
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="flex item-center" style={{ top: hp(30) }}>
          <ActivityIndicator size="large" />
          <TouchableOpacity
            className="items-center pt-6"
            onPress={generateTestData}
          >
            <Text style={{ fontSize: hp(2) }}>Generate Test Data</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}
