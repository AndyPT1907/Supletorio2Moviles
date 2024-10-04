import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB-FT994c5wYn37IYojRoLtgjVE-AFFshs",
  authDomain: "complexivonucelo3.firebaseapp.com",
  databaseURL: "https://complexivonucelo3-default-rtdb.firebaseio.com",
  projectId: "complexivonucelo3",
  storageBucket: "complexivonucelo3.appspot.com",
  messagingSenderId: "639092752",
  appId: "1:639092752:web:ebb6b3b0af66288567e295"
};
// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
//export const auth = getAuth(firebase);
export const auth = initializeAuth(firebase, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const dbRealTime = getDatabase(firebase);
