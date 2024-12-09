import { createCustomer } from "@/api/customers";
import InputField from "@/components/InputField";
import { CustomerRequest } from "@/models/customer/customerRequest.model";
import { useNavigation } from "expo-router";
import React, { useLayoutEffect } from "react";
import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { Alert, Button, View } from "react-native";

const ItemForm = () => {
  const navigation = useNavigation();
  const { ...methods } = useForm<CustomerRequest>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={methods.handleSubmit(onSubmit, onError)} title="Zapisz" />,
    });
  }, [navigation]);

  const onSubmit: SubmitHandler<CustomerRequest> = async (data) => {
    try {
      await createCustomer(data);
    } catch (error: any) {
      Alert.alert("Customer creation failed", error.message);
    }
  };
  const onError: SubmitErrorHandler<CustomerRequest> = (errors, e) => {
    console.log(errors);
    console.log(e);
  };
  return (
    <View>
      <View className="p-4">
        <FormProvider {...methods}>
          <InputField
            name="name"
            label="Nazwa"
            keyboardType="default"
            rules={{
              required: "Nazwa jest wymagana!",
              minLength: { value: 3, message: "Nazwa jest za krótka!" },
            }}
          />
        </FormProvider>
      </View>
    </View>
  );
};

export default ItemForm;
