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
          headerTitle: (route.params as { id?: string }).id ? "Edytuj użytkownika" : "Dodaj użytkownika",
          headerBackTitle: "Zamknij",
          presentation: "modal",
        })}
        name="user_form"
      />
    </Stack>
  );
};

export default Layout;
