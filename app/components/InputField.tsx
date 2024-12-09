import { InputFieldProps } from "@/types/type";
import React from "react";
import {
  KeyboardAvoidingView,
  Text,
  View,
  TouchableWithoutFeedback,
  TextInput,
  Platform,
  Keyboard,
} from "react-native";
import { useController, useFormContext } from "react-hook-form";

const InputField = ({
  label,
  Icon,
  labelClass,
  containerClass,
  inputClass,
  iconClass,
  defaultValue,
  name,
  rules,
  secureTextEntry = false,
  ...props
}: InputFieldProps) => {
  const formContext = useFormContext();
  if (!formContext || !name) {
    const msg = !formContext ? "TextInput must be wrapped by the FormProvider" : "Name must be defined";
    console.error(msg);
    return null;
  }
  const { field } = useController({ name, rules, defaultValue });
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          <Text className={`text-lg font-jakartaSemiBold mb-3 ${labelClass}`}>{label}</Text>
          <View
            className={`flex flex-row justify-start items-center relative bg-neutral-200 rounded-full border border-neutral-200 focus:border-primary-500 ${containerClass}`}
          >
            {Icon && <Icon className={`w-6 h-6 ml-4 ${iconClass}`} />}
            <TextInput
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              value={field.value}
              className={`rounded-lg p-4 font-JakartaSemiBold text-[15px] flex-1 ${inputClass}`}
              secureTextEntry={secureTextEntry}
              {...props}
            />
          </View>
          {typeof formContext.formState.errors[name]?.message === "string" && (
            <Text className="text-red-500 px-2 py-4">{formContext.formState.errors[name].message}</Text>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
