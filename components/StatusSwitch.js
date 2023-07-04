import React, { useState } from "react";
import { View, StyleSheet, Alert, Switch, Text } from "react-native";
import { useToast } from "react-native-toast-notifications";

const statusSwitch = (props) => {
  const statusValue = props.status === "active";
  const [isEnabled, setIsEnabled] = useState(statusValue);
  const [status, setStatus] = useState(props.status);
  const toast = useToast();

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    if (status == "active") {
      setStatus("inactive");
    } else {
      setStatus("active");
    }
  };

  const showConfirmDialog = () => {
    if (status === "active") {
      return Alert.alert(
        "Deactivate Page?",
        "Once you deactivate the page, you will not be able to accept payments till you activate it again.",
        [
          {
            text: "Yes, deactivate",
            onPress: () => {
              
              toggleSwitch();
              toast.show("Page is now Inactive", {
                type: "success",
                placement: "top",
                duration: 4000,
                offset: 30,
                animationType: "slide-in ",
              });
            },
          },
          {
            text: "No, don't!",
          },
        ]
      );
    } else {
      return Alert.alert(
        "Activate Page?",
        "Once you activate the page, you will be able to accept payments.",
        [
          {
            text: "Yes, activate",
            onPress: () => {
              
              toggleSwitch();
              toast.show("Page is now active", {
                type: "success",
                placement: "top",
                duration: 4000,
                offset: 30,
                animationType: "slide-in ",
              });
            },
          },
          {
            text: "No, don't!",
          },
        ]
      );
    }
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <Switch
        trackColor={{ false: "#767577", true: "blue" }}
        onValueChange={showConfirmDialog}
        value={isEnabled}
      />
      <Text>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default statusSwitch;
