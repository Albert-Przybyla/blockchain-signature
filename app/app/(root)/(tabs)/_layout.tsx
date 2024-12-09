import { TabBarIcon } from "@/components/TabBarIcon";
import { Tabs } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Tabs initialRouteName="calendar" screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="calendar"
        options={{ title: "Kalendarz", tabBarIcon: () => <TabBarIcon name="calendar-outline" /> }}
      />
      <Tabs.Screen
        name="documents"
        options={{ title: "Dokumenty", tabBarIcon: () => <TabBarIcon name="file-tray-full-outline" /> }}
      />
      <Tabs.Screen
        name="orders"
        options={{ title: "Zlecenia", tabBarIcon: () => <TabBarIcon name="albums-outline" /> }}
      />
      <Tabs.Screen name="states" options={{ title: "Stany", tabBarIcon: () => <TabBarIcon name="cube-outline" /> }} />
      <Tabs.Screen
        name="(more)"
        options={{
          headerShown: false,
          title: "Więcej",
          tabBarIcon: () => <TabBarIcon name="ellipsis-vertical-outline" />,
        }}
      />
    </Tabs>
  );
};

export default Layout;
