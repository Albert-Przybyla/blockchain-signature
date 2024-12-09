import React from "react";
import { Text, View } from "react-native";

const ListEmpty = () => {
  return (
    <View className="w-full flex justify-center  items-center px-4 py-6">
      <Text>Brak danych!</Text>
    </View>
  );
};

export default ListEmpty;
