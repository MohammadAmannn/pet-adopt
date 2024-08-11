import { View, Text, Image } from "react-native";
import React from "react";
import * as WebBrowser from "expo-web-browser";
import Colors from "../../constants/Colors";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { useCallback } from "react";
import { Link } from "expo-router";

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL("/(tabs)/myhome", { scheme: "myapp" }),
        });

      if (createdSessionId) {
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View
      style={{
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <Image
        source={require("./../../assets/images/login.png")}
        style={{ width: "100%", height: 500 }}
      />
      <View
        style={{
          padding: 20,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontFamily: "outfit-bold",
            textAlign: "center",
          }}
        >
          Ready To Make New Friend?
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontFamily: "outfit-Regular",
            textAlign: "center",
            marginTop: 10,
            color: Colors.GRAY,
          }}
        >
          Let's Adopt The Pet Which You Like And Make Their Life Happy Again
        </Text>

        <Link
          href={'/(tabs)/myhome'}
          style={{
            marginTop: 90,
            width: "80%",
            borderRadius: 40,
            backgroundColor: Colors.primary,
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 15,
            textAlign:"center"
          }} 
          onPress={onPress}
        >
          <Text
            style={{
              fontSize: 18,
              color: Colors.black,
              fontFamily: "outfit-Medium",
              textAlign: "center", // Ensure text is centered
            }}
          >
            Get Started
          </Text>
        </Link>
      </View>
    </View>
  );
}
