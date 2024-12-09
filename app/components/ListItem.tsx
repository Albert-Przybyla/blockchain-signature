import { View, TouchableOpacity, Text, Touchable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

interface SwipeButtonProps {
  iconName?: keyof typeof Ionicons.glyphMap;
  color?: string;
  onPress?: () => void;
}

const SwipeButton = ({ iconName, color, onPress }: SwipeButtonProps) => (
  <View>
    <TouchableOpacity onPress={onPress} style={{ justifyContent: "center", alignItems: "center", width: 64 }}>
      {iconName && <Ionicons name={iconName} size={24} color={color || "black"} />}
    </TouchableOpacity>
  </View>
);

interface ListItemProps {
  title: string;
  leftIconName?: keyof typeof Ionicons.glyphMap;
  rightIconName?: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

const ListItem = ({ title, leftIconName, rightIconName, onPress }: ListItemProps) => {
  return (
    <View className="w-full bg-white">
      <TouchableOpacity
        onPress={() => onPress()}
        className="w-full px-2 py-4 space-x-2 border-b border-neutral-200 bg-white active:bg-white flex flex-row items-center"
      >
        {leftIconName && <Ionicons name={leftIconName} size={20} style={{ marginRight: 8 }} />}
        <View className="flex-grow">
          <Text>{title}</Text>
        </View>
        {rightIconName && <Ionicons name={rightIconName} size={20} style={{ marginLeft: 8 }} />}
      </TouchableOpacity>
    </View>
  );
};

export { ListItem, SwipeButton };
