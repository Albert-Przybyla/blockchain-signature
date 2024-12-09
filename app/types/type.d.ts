import { TextInputProps, TouchableOpacityProps } from "react-native";

declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
}

declare interface InputFieldProps extends TextInputProps {
  label: string;
  Icon?: any;
  secureTextEntry?: boolean;
  labelClass?: string;
  containerClass?: string;
  inputClass?: string;
  iconClass?: string;
  className?: string;
  name: string;
  rules?: any;

  defaultValue?: string;
}
declare interface SelectFieldProps extends SelectProps {
  label: string;
  Icon?: any;
  labelClass?: string;
  containerClass?: string;
  inputClass?: string;
  iconClass?: string;
  className?: string;
  name: string;
  rules?: any;
  defaultValue?: string;
}
