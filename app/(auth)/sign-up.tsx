import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    verifyPassword: "",
  });

  const submit = async () => {
    if (!form.name || !form.email || !form.password)
      Alert.alert("Error", "Please fill out the rest of the form");

    setIsSubmitting(true);
    try {
      Alert.alert("Success", "User Created Successfully");
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
    }
  };

  return (
    <View className="gap-10 bg-white rounded-lg p-5 m-5">
      <CustomInput
        placeholder="Enter your Full Name"
        value={form.name}
        onChangeText={(text) => {
          setForm((prev) => ({ ...prev, name: text }));
        }}
        label="Full Name"
      />
      <CustomInput
        placeholder="Enter your email"
        value={form.email}
        onChangeText={(text) => {
          setForm((prev) => ({ ...prev, email: text }));
        }}
        label="Email"
        keyboardType="email-address"
      />

      <CustomInput
        placeholder="Enter your password"
        value={form.password}
        onChangeText={(password) => {
          setForm((prev) => ({ ...prev, password: password }));
        }}
        label="Password"
        secureTextEntry={true}
      />

      <CustomInput
        placeholder="Verify your password"
        value={form.verifyPassword}
        onChangeText={(verifyPassword) => {
          setForm((prev) => ({ ...prev, verifyPassword: verifyPassword }));
        }}
        label="Password"
        secureTextEntry={true}
      />

      <CustomButton title="Sign Up" isLoading={isSubmitting} onPress={submit} />

      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className=" base-regular text-gray-100">
          Already have an account?
        </Text>
        <Link href={"/sign-in"} className="base-bold text-primary">
          Sign In
        </Link>
      </View>
    </View>
  );
};

export default SignUp;
