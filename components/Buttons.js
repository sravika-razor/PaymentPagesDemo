import React, { useState } from "react";
import {
  Alert,
  Share,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

const Buttons = () => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Share",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const buttonsInfo = [
    { name: "share", icon: require("../icons/icons8-share-32.png"), id: "1" },
    {
      name: "duplicate",
      icon: require("../icons/icons8-copy-32.png"),
      id: "2",
    },
    {
      name: "edit",
      icon: require("../icons/icons8-edit-file-32.png"),
      id: "3",
    },
    {
      name: "receipt",
      icon: require("../icons/icons8-receipt-32.png"),
      id: "4",
    },
    {
      name: "settings",
      icon: require("../icons/icons8-settings-32.png"),
      id: "5",
    },
  ];

  const showButtons = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          margin: 10,
          marginTop: 30,
        }}
      >
        {buttonsInfo.map((item) => (
          <View style={styles.icon} key={item.id}>
            <TouchableOpacity style={{ width: 30 }}>
              <Image source={item.icon} style={styles.icon} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };

  return <View>{showButtons()}</View>;
};

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
    marginRight: 35,
  },
  iconImage: {
    width: 30,
    height: 30,
  },
});

export default Buttons;
