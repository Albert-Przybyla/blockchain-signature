import { createItem } from "@/api/items";
import InputField from "@/components/InputField";
import { ItemRequest } from "@/models/item/itemRequest.model";
import { useNavigation } from "expo-router";
import React, { useLayoutEffect } from "react";
import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { Alert, Button, View } from "react-native";

const ItemForm = () => {
  const navigation = useNavigation();
  const { ...methods } = useForm<ItemRequest>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={methods.handleSubmit(onSubmit, onError)} title="Zapisz" />,
    });
  }, [navigation]);

  const onSubmit: SubmitHandler<ItemRequest> = async (data) => {
    try {
      await createItem(data);
    } catch (error: any) {
      Alert.alert("Item creation failed", error.message);
    }
  };
  const onError: SubmitErrorHandler<ItemRequest> = (errors, e) => {
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
          <InputField name="description" label="Opis" keyboardType="default" />
          <InputField name="code" label="Kod kreskowy" keyboardType="default" />
          <InputField name="quantity" label="Ilośc" keyboardType="numeric" />
        </FormProvider>
      </View>
    </View>
  );
};

export default ItemForm;
