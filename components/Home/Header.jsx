import { View, Text } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Image } from "react-native";


export default function Header() {
  const { user } = useUser();
  return (
    <View style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    }}>
      <View>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "outfit-Medium",
          }}
        >
          Hello,
        </Text>
        <Text
          style={{
            fontSize: 25,
            fontFamily: "outfit-Regular",
          }}
        >
          {user?.fullName}
        </Text>
      </View>
<Image source={{uri:user?.imageUrl}} style={{
  width:40,
  height:40,
  borderRadius:99,
  marginTop:10,
}} />

    </View>
  );
}
