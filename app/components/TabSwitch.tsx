import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "./Text";

interface Option {
  name: string;
  value: any;
}

interface TabSwitchProps {
  options: Option[];
  value: any;
  setValue: (value: any) => void;
}

const TabSwitch = ({ options, value, setValue }: TabSwitchProps) => {
  return (
    <View className="min-w-full flex flex-row space-x-2">
      {options.map((option) => (
        <TouchableOpacity
          className={`flex items-center justify-center shadow-md shadow-neutral-400/70 p-2 ${option.value === value ? "bg-neutral-200" : "bg-white"}`}
        >
          <Text>{option.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TabSwitch;
