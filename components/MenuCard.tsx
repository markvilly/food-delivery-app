import { appWriteConfig } from "@/lib/appwrite";
import { MenuItem } from "@/type";
import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";

const MenuCard = ({ item: { image_url, name, price } }: { item: MenuItem }) => {
  const imageURL = `${image_url}?project=${appWriteConfig.projectId}`;
  return (
    <TouchableOpacity>
      <Image
        source={{ uri: imageURL }}
        className="size-32 absolute -top-10"
        resizeMode="contain"
      />
      <Text>{name}</Text>
    </TouchableOpacity>
  );
};

export default MenuCard;
