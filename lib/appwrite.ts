import { CreateUserParams } from "@/type";
import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";

export const appWriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  platform: "com.mpn.foodordering",
  databaseID: "6888d9ae00209154dd56",
  userCollectionID: "688b4df90038d7df7a7b",
};

const client = new Client();

client
  .setEndpoint(appWriteConfig.endpoint!)
  .setProject(appWriteConfig.projectId!)
  .setPlatform(appWriteConfig.platform);

export const account = new Account(client);
export const database = new Databases(client);
const avatars = new Avatars(client);

export const createUser = async ({
  name,
  email,
  password,
}: CreateUserParams) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);
  } catch (error) {
    throw new Error(error as string);
  } finally {
  }
};
