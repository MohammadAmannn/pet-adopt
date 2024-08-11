import { useFonts } from "expo-font";
import * as SecureStore from "expo-secure-store";
import { Stack } from "expo-router";
import { ClerkProvider } from "@clerk/clerk-expo";

const tokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key); // Clean up potentially corrupt data
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      console.log(`Saving token under key: ${key}`);
      await SecureStore.setItemAsync(key, value);
      console.log(`Token saved successfully under key: ${key}`);
    } catch (err) {
      console.error("SecureStore save item error: ", err);
    }
  },
};

export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    throw new Error(
      "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
    );
  }

  const [fontsLoaded] = useFonts({
    "outfit-Regular": require("./../assets/fonts/Outfit-Regular.ttf"),
    "outfit-bold": require("./../assets/fonts/Outfit-Bold.ttf"),
    "outfit-Medium": require("./../assets/fonts/Outfit-Medium.ttf"),
    style: require("./../assets/fonts/StyleScript-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null; // or a loading spinner
  }

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={publishableKey}
    >
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="login/index"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </ClerkProvider>
  );
}
