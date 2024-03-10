import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-RmkIs5MbyF38-wLWR7ybYzotCT7DsT8",
  authDomain: "iginsulationd.firebaseapp.com",
  projectId: "iginsulationd",
  storageBucket: "iginsulationd.appspot.com",
  messagingSenderId: "296583881588",
  appId: "1:296583881588:web:8ce9da7bff80bd862e0221",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(
  app
  //   {
  //   persistence: getReactNativePersistence(AsyncStorage),
  // }
);

export const db = getFirestore(app);

export const stockRef = collection(db, "stocks");
