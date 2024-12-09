import { createUser } from "@/api/user";
import InputField from "@/components/InputField";
import { UserFromRequest, UserRequest } from "@/models/user/userRequest.model";
import { useNavigation } from "expo-router";
import React, { useLayoutEffect } from "react";
import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { Alert, Button, View } from "react-native";

const OrderForm = () => {
  const navigation = useNavigation();
  const { ...methods } = useForm<UserFromRequest>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={methods.handleSubmit(onSubmit, onError)} title="Zapisz" />,
    });
  }, [navigation]);

  const onSubmit: SubmitHandler<UserRequest> = async (data) => {
    try {
      await createUser(data);
    } catch (error: any) {
      Alert.alert("Customer creation failed", error.message);
    }
  };
  const onError: SubmitErrorHandler<UserRequest> = (errors, e) => {
    console.log(errors);
    console.log(e);
  };
  return (
    <View>
      <View className="p-4">
        <FormProvider {...methods}>
          <InputField
            name="email"
            label="Email"
            keyboardType="email-address"
            rules={{
              required: "Email jest wymagany!",
              pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Nie prawidłowy email!" },
            }}
          />
          <InputField
            name="first_name"
            label="Imie"
            keyboardType="default"
            rules={{
              required: "Imie jest wymagane!",
              minLength: { value: 3, message: "Imie jest za krótkkie!" },
            }}
          />
          <InputField
            name="last_name"
            label="Nazwisko"
            keyboardType="default"
            rules={{
              required: "Nazwisko jest wymagane!",
              minLength: { value: 3, message: "Nazwisko jest za krótkie!" },
            }}
          />
          <InputField
            name="password"
            label="Hasło"
            secureTextEntry
            keyboardType="default"
            rules={{
              required: "Hasło jest wymagane!",
              minLength: { value: 3, message: "Hasło jest za krótkie!" },
            }}
          />
          <InputField
            name="password_confirmation"
            label="Powtórz hasło"
            secureTextEntry
            keyboardType="default"
            rules={{
              required: "Hasło jest wymagane!",
              minLength: { value: 3, message: "Hasło jest za krótkie!" },
              validate: (value, { password }) => value === password || "Hasła muszą być takie same!",
            }}
          />
        </FormProvider>
      </View>
    </View>
  );
};

export default OrderForm;
