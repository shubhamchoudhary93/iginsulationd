import { View, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/authContext";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db, stockRef } from "../../firebaseConfig";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DailyStockComponent from "../../components/DailyStockComponent";

export default function home() {
  const { user } = useAuth();
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    if (user?.uid) getStocks();
  }, []);

  const getStocks = async () => {
    const q = query(stockRef);

    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data() });
    });

    setStocks(data);
  };

  return (
    <View>
      <DailyStockComponent stocks={stocks} />
    </View>
  );
}
