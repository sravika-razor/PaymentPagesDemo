import { BladeProvider } from "@razorpay/blade/components";
import { paymentTheme } from "@razorpay/blade/tokens";
import "react-native-gesture-handler";
import React from "react";
import InfoSection from "./components/InfoSection";
import { ToastProvider } from "react-native-toast-notifications";

function App() {
  return (
    <BladeProvider themeTokens={paymentTheme} colorScheme="light">
      <ToastProvider>
        <InfoSection />
      </ToastProvider>
    </BladeProvider>
  );
}

export default App;
