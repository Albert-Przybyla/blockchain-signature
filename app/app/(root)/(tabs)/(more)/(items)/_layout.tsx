import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        options={({ route }) => ({
          headerShown: true,
          headerTitle: (route.params as { id?: string }).id ? "Edytuj zasób" : "Dodaj zasób",
          headerBackTitle: "Zamknij",
          presentation: "modal",
        })}
        name="item_form"
      />
    </Stack>
  );
};

export default Layout;
