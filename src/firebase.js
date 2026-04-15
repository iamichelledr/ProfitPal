// Import Firebase core
import { initializeApp } from "firebase/app";

// Import services
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB4hz7Y1UOqB__0fIpzfk09n0TV8WYQmM8",
  authDomain: "profitpal-342f9.firebaseapp.com",
  projectId: "profitpal-342f9",
  storageBucket: "profitpal-342f9.firebasestorage.app",
  messagingSenderId: "847991009822",
  appId: "1:847991009822:web:9d660ad25ffa6d2fd7740f",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
