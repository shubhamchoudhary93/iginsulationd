import React, { useEffect, useState } from "react";
import DailyStockComponent from "../../components/DailyStockComponent";
import { useAuth } from "../../context/authContext";
import { getDocs, query } from "firebase/firestore";
import { stockRef } from "../../firebaseConfig";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { View } from "react-native";

export default function dailystock() {
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

  return <DailyStockComponent stocks={stocks} />;
}
