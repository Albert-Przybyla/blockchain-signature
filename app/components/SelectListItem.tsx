import React from "react";
import { View } from "react-native";
import { Text } from "./Text";
import BouncyCheckbox from "react-native-bouncy-checkbox";
interface SelectListItemProps {
  title: string;
  selected: boolean;
  onPress: (isChecked: boolean) => void;
}

const SelectListItem = ({ title, selected, onPress }: SelectListItemProps) => {
  return (
    <View className="w-full  p-2">
      <BouncyCheckbox
        size={25}
        fillColor="red"
        unFillColor="#FFFFFF"
        text={title}
        innerIconStyle={{ borderWidth: 2 }}
        isChecked={selected}
        textStyle={{
          textDecorationLine: "none",
        }}
        onPress={(isChecked: boolean) => {
          onPress(isChecked);
        }}
      />
    </View>
  );
};

export default SelectListItem;
