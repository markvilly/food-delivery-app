import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Text, View } from "react-native";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState();
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async () => {};

  return (
    <View className="gap-10 bg-white rounded-lg p-5 m-5">
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
        value={form.password}
        onChangeText={(password) => {
          setForm((prev) => ({ ...prev, password: password }));
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
