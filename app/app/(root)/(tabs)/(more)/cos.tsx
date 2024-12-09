import { useColorScheme } from "nativewind";
import React from "react";
import { Button, Text, View } from "react-native";

const home = () => {
  const { setColorScheme } = useColorScheme();

  const test = (set: "dark" | "light" | "system") => {
    setColorScheme(set);
  };
  return (
    <View className="bg-slate-200 dark:bg-slate-900">
      <Text>Cos</Text>
      <Button onPress={() => test("dark")} title="dark" />
      <Button onPress={() => test("light")} title="light" />
      <Button onPress={() => test("system")} title="system" />
    </View>
  );
};

export default home;
