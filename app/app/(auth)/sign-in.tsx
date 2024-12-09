import InputField from "@/components/InputField";
import React from "react";
import { SafeAreaView, Text, ScrollView, View, Button, Alert, Image } from "react-native";
import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { LoginRequest } from "@/models/user/user.model";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";

const SignInScreen = () => {
  const { ...methods } = useForm<LoginRequest>();
  const { onLogin } = useAuth();

  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    try {
      await onLogin!(data);
      router.replace("/(root)/(tabs)/calendar");
    } catch (error: any) {
      Alert.alert("Login failed", error.message);
    }
  };
  const onError: SubmitErrorHandler<LoginRequest> = (errors, e) => {
    // Alert.alert("Login failed", error);
  };
  return (
    <SafeAreaView>
      <View>
        <View className="w-full h-[300px] m-4 relative flex justify-center items-center">
          <Image source={require("@/assets/images/login.webp")} className="w-2/3 h-2/3" resizeMode="cover" />
        </View>
        <View className="p-4">
          <FormProvider {...methods}>
            <InputField
              name="email"
              label="Email"
              keyboardType="email-address"
              rules={{
                required: "Email is required!",
                pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" },
              }}
              placeholder="Email"
            />
            <InputField
              name="password"
              label="Password"
              keyboardType="default"
              rules={{ required: "Password is required!" }}
              placeholder="Password"
            />
            <View>
              <Button title="Login" color="blue" onPress={methods.handleSubmit(onSubmit, onError)} />
            </View>
          </FormProvider>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
