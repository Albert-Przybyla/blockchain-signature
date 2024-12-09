import { Link, Stack } from "expo-router";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View>
        <View className="w-full h-[300px] m-4 relative flex justify-center items-center">
          <Image source={require("@/assets/images/404.webp")} className="w-2/3 max-h-2/3" resizeMode="cover" />
        </View>
        <View className="p-4">
          <Text>This screen doesn't exist.</Text>
          <Link href="/" className="mt-5">
            <Text>Go to home screen!</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
