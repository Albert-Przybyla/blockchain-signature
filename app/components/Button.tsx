import { ButtonProps } from "@/types/type";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const Button = ({ title, onPress, IconLeft, IconRight, className, ...props }: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-full rounded-full flex flex-row items-center justify-center shadow-md shadow-neutral-400/70 ${className}`}
      {...props}
    >
      {IconLeft && <IconLeft />}
      <Text>{title}</Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
};

export default Button;
