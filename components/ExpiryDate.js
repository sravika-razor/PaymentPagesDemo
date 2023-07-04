import React, { useState } from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import DatePicker from "react-native-date-picker";
import { useToast } from "react-native-toast-notifications";

const PickDate = (props) => {
  const [date, setDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [dateString, setDateString] = useState(props.expiryDate);
  const toast = useToast();

  const onDateConfirm = (date) => {
    setIsOpen(false);
          setDate(date);
          setDateString(date.toDateString());
          toast.show("Expiry date successfully changed.", {
            type: "success",
            placement: "top",
            duration: 4000,
            animationType: "slide-in",
          });
  }

  return (
    <>
    <View style={{flexDirection: "row"}}>
      <Text>{dateString}</Text>
      <View>
        <TouchableOpacity style={{ width: 30 }} onPress={() => setIsOpen(true)}>
          <Image
            source={require("../icons/icons8-calendar-50.png")}
            style={{ height: 20, width: 20, marginLeft: 10 }}
          />
        </TouchableOpacity>
      </View>
      <DatePicker
        modal
        mode="date"
        open={isOpen}
        date={date}
        onConfirm={(date) => {onDateConfirm(date)}}
        onCancel={() => {setIsOpen(false);}}
      />
      </View>
    </>
  );
};

export default PickDate;
