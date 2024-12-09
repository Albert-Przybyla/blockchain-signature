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
          headerTitle: (route.params as { id?: string }).id ? "Edytuj klienta" : "Dodaj klienta",
          headerBackTitle: "Zamknij",
          presentation: "modal",
        })}
        name="customer_form"
      />
    </Stack>
  );
};

export default Layout;
