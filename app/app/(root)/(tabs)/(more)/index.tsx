import ListEmpty from "@/components/ListEmpty";
import { ListItem } from "@/components/ListItem";
import { Text } from "@/components/Text";
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView, SectionList, View } from "react-native";
import { Alert } from "react-native";

interface section {
  title: string;
  data: data[];
}

interface data {
  name: string;
  icon?: keyof typeof Ionicons.glyphMap;
  action: () => void;
}

const MoreScreen = () => {
  const { authState, onLogout } = useAuth();

  const onLogoutPress = () => {
    Alert.alert(
      "Czy na pewno chcesz wylogować się?",
      undefined,
      [
        {
          text: "Anuluj",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            onLogout!();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const moreScreens: section[] = [
    {
      title: "Organizacja",
      data: [
        {
          name: "Zasoby",
          icon: "construct-outline",
          action: () => {
            router.push("/(root)/(tabs)/(more)/(items)");
          },
        },
        {
          name: "Klienci",
          icon: "people-outline",
          action: () => {
            router.push("/(root)/(tabs)/(more)/(customers)");
          },
        },
        {
          name: "Realizacje",
          icon: "receipt-outline",
          action: () => {
            router.push("/(root)/(tabs)/(more)/(orders)");
          },
        },
        {
          name: "Użytkownicy",
          icon: "people-outline",
          action: () => {
            router.push("/(root)/(tabs)/(more)/(users)");
          },
        },
        {
          name: "Cos",
          icon: "search-outline",
          action: () => {
            router.push("/(root)/(tabs)/(more)/cos");
          },
        },
      ],
    },
    {
      title: "Użytkownik",
      data: [
        {
          name: "Ustawienia",
          icon: "settings-outline",
          action: () => {
            router.push("/(root)/(tabs)/(more)/(items)");
          },
        },
        {
          name: "Wyloguj sie",
          icon: "log-out-outline",
          action: () => {
            onLogoutPress();
          },
        },
      ],
    },
  ];

  const renderHeader = () => {
    return (
      <View className="p-2 space-x-2 w-full bg-white flex flex-row items-center border-b border-neutral-200">
        <Ionicons name="person" size={42} style={{ marginRight: 8 }} />
        <View className="p-2">
          <Text type="title">
            {authState?.userData?.first_name} {authState?.userData?.last_name}
          </Text>
          <Text type="subtitle">{authState?.userData?.email}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <SectionList
        className="h-full"
        keyExtractor={(item) => item.name}
        sections={moreScreens}
        renderItem={(item) => (
          <ListItem
            title={item.item.name}
            leftIconName={item.item.icon}
            rightIconName="chevron-forward"
            onPress={item.item.action}
          />
        )}
        ListEmptyComponent={ListEmpty}
        ListHeaderComponent={renderHeader}
        renderSectionHeader={({ section }) => <Text className="p-2 bg-neutral-100">{section.title}</Text>}
      />
    </SafeAreaView>
  );
};

export default MoreScreen;
