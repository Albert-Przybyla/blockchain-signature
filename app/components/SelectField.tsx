import { SelectFieldProps } from "@/types/type";
import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { View } from "react-native";

const SelectField = ({
  label,
  Icon,
  labelClass,
  containerClass,
  inputClass,
  iconClass,
  defaultValue,
  name,
  rules,
  ...props
}: SelectFieldProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="my-2 w-full">
      <Text className={`text-lg font-jakartaSemiBold mb-3 ${labelClass}`}>{label}</Text>
      <TouchableOpacity style={styles.input} onPress={() => setModalVisible(true)}>
        <Text style={selectedValue ? styles.selectedText : styles.placeholderText}>{selectedValue || placeholder}</Text>
        <Ionicons name="chevron-down" size={20} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

export default SelectField;
