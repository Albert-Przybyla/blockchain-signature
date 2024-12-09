import { router, Stack } from "expo-router";
import React from "react";
import { Button } from "react-native";

const Layout = () => {
  return (
    <Stack screenOptions={{ title: "Więcej" }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="(items)"
        options={{
          headerShown: true,
          headerTitle: "Zasoby",
          headerBackTitle: "Cofnij",
          headerRight: () => (
            <Button
              onPress={() => {
                router.push({
                  pathname: "/(items)/item_form",
                  params: { id: undefined },
                });
              }}
              title="Dodaj"
            />
          ),
        }}
      />
      <Stack.Screen
        name="(customers)"
        options={{
          headerShown: true,
          headerTitle: "Klienci",
          headerBackTitle: "Cofnij",
          headerRight: () => (
            <Button
              onPress={() => {
                router.push({
                  pathname: "/(customers)/customer_form",
                  params: { id: undefined },
                });
              }}
              title="Dodaj"
            />
          ),
        }}
      />
      <Stack.Screen
        name="(orders)"
        options={{
          headerShown: true,
          headerTitle: "Zamówienia",
          headerBackTitle: "Cofnij",
          headerRight: () => (
            <Button
              onPress={() => {
                router.push({
                  pathname: "/(orders)/order_form",
                  params: { id: undefined },
                });
              }}
              title="Dodaj"
            />
          ),
        }}
      />
      <Stack.Screen
        name="(users)"
        options={{
          headerShown: true,
          headerTitle: "Użytkownicy",
          headerBackTitle: "Cofnij",
          headerRight: () => (
            <Button
              onPress={() => {
                router.push({
                  pathname: "/(users)/user_form",
                  params: { id: undefined },
                });
              }}
              title="Dodaj"
            />
          ),
        }}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Zasoby",
          headerBackTitle: "Cofnij",
          headerRight: () => (
            <Button
              onPress={() => {
                console.log("Add item");
              }}
              title="Dodaj"
            />
          ),
          presentation: "modal",
        }}
        name="cos"
      />
    </Stack>
  );
};

export default Layout;
