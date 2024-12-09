import Button from "@/components/Button";
import onboarding from "@/constants";
import { router } from "expo-router";
import React, { useRef } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import Swiper from "react-native-swiper";

const WelcomeScreen = () => {
  const swiperRef = useRef<Swiper | null>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  return (
    <SafeAreaView className="flex h-full items-center justify-between">
      <TouchableOpacity
        className="w-full flex justify-end items-end p-5"
        onPress={() => {
          router.replace("/(auth)/sign-in");
        }}
      >
        <Text>SKIP</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View className="w-6  h-3 bg-gray-300 rounded-full mx-2 transition duration-500" />}
        activeDot={<View className="w-12 h-3 bg-black rounded-full mx-2 transition duration-500" />}
        onIndexChanged={(index) => {
          setActiveIndex(index);
        }}
      >
        {onboarding.map((item, index) => (
          <View
            className="flex-1 items-center justify-center"
            key={index}
            style={{
              backgroundColor: "#fff",
            }}
          >
            <Text className="text-4xl font-bold">{item.title}</Text>
            <Text className="text-lg">{item.description}</Text>
          </View>
        ))}
      </Swiper>
      <Button
        className="w-full flex justify-center items-center"
        onPress={() => {
          if (activeIndex === onboarding.length - 1) {
            router.replace("/(auth)/sign-in");
          } else {
            if (swiperRef.current) swiperRef.current.scrollBy(1);
          }
        }}
        title="NEXT"
      />
    </SafeAreaView>
  );
};

export default WelcomeScreen;
