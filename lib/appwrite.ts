import { CreateUserParams, GetMenuParams, SignInParams } from "@/type";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const appWriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  platform: "com.mpn.foodordering",
  databaseID: "6888d9ae00209154dd56",
  bucketID: "6897263d0018337a0f29",
  userCollectionID: "688b4df90038d7df7a7b",
  categoriesCollectionID: "689484e8000276ae8dff",
  menusCollectionID: "689485e6002afb1d7088",
  customizationsCollectionID: "68971f27003871a4556f",
  menuCustomizationCollectionID: "689724aa003c0b14797a",
};

const client = new Client();

client
  .setEndpoint(appWriteConfig.endpoint!)
  .setProject(appWriteConfig.projectId!)
  .setPlatform(appWriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
const avatars = new Avatars(client);

export const createUser = async ({
  name,
  email,
  password,
}: CreateUserParams) => {
  try {
    // create a new user
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) throw Error;

    await signIn({ email, password });

    const avatarURL = avatars.getInitialsURL(name);

    return await databases.createDocument(
      appWriteConfig.databaseID,
      appWriteConfig.userCollectionID,
      ID.unique(),
      { name, email, accountID: newAccount.$id, avatar: avatarURL },
    );
  } catch (error) {
    throw new Error(error as string);
  } finally {
  }
};

export const signIn = async ({ email, password }: SignInParams) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
  } catch (err) {
    throw new Error(err as string);
  }
};

// Getting the details of the currently logged in user

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appWriteConfig.databaseID,
      appWriteConfig.userCollectionID,
      [Query.equal("accountID", currentAccount.$id)],
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (e) {
    throw new Error(e as string);
  }
};

export const getMenu = async ({
  category,
  query,
  limit,
}: GetMenuParams & { limit?: number }) => {
  try {
    const queries: string[] = [];
    if (category) queries.push(Query.equal("categories", category));
    if (query) queries.push(Query.search("name", query));
    if (limit) queries.push(Query.limit(limit));

    const menus = await databases.listDocuments(
      appWriteConfig.databaseID,
      appWriteConfig.menusCollectionID,
      queries,
    );

    return menus.documents;
  } catch (e) {
    console.error("Error fetching menu:", e);
    throw new Error(e as string);
  }
};

export const getCategories = async () => {
  try {
    const categories = await databases.listDocuments(
      appWriteConfig.databaseID,
      appWriteConfig.categoriesCollectionID,
    );

    return categories;
  } catch (e) {
    throw Error(e as string);
  }
};
