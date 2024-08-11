import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";

export default function PetSubInfo({ pet }) {
    return (
        <View
            style={{
                paddingHorizontal: 15,
                // borderBottomWidth: 1,
                // borderBottomColor: "#ccc",
                marginBottom: 10,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    // justifyContent: "space-between",
                    // alignItems: "center",
                    // marginBottom: 10,
                    display: "flex",
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 10,
                        display: "flex",
                        backgroundColor: Colors.WHITE,
                        padding: 10,
                        borderRadius: 10,
                        margin: 5,
                        gap: 10,
                        flex: 1,
                    }}
                >
                    <Image
                        source={require("../../assets/images/calendar.png")}
                        style={{
                            width: 40,
                            height: 40,
                            marginRight: 10,
                        }}
                    />
                    <View>
                        <Text
                            style={{
                                fontFamily: "outfit-Medium",
                                fontSize: 18,
                            }}
                        >
                            Age
                        </Text>
                        <Text
                            style={{
                                fontFamily: "outfit-Regular",
                                fontSize: 18,
                                color: "#666",
                            }}
                        >
                            {pet.age +" Yrs"}
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 10,
                        display: "flex",
                        backgroundColor: Colors.WHITE,
                        padding: 10,
                        borderRadius: 10,
                        margin: 5,
                        gap: 10,
                        flex: 1,
                    }}
                >
                    <Image
                        source={require("../../assets/images/bone.png")}
                        style={{
                            width: 40,
                            height: 40,
                            marginRight: 10,
                        }}
                    />
                    <View
                        style={{
                            flex: 1,
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: "outfit-Medium",
                                fontSize: 18,
                            }}
                        >
                            Breed
                        </Text>
                        <Text
                            style={{
                                fontFamily: "outfit-Regular",
                                fontSize: 18,
                                color: "#666",
                            }}
                        >
                            {pet.breed}
                        </Text>
                    </View>
                </View>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    // justifyContent: "space-between",
                    // alignItems: "center",
                    // marginBottom: 10,
                    display: "flex",
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 10,
                        display: "flex",
                        backgroundColor: Colors.WHITE,
                        padding: 10,
                        borderRadius: 10,
                        margin: 5,
                        gap: 10,
                        flex: 1,
                    }}
                >
                    <Image
                        source={require("../../assets/images/weight.png")}
                        style={{
                            width: 40,
                            height: 40,
                            marginRight: 10,
                        }}
                    />
                    <View>
                        <Text
                            style={{
                                fontFamily: "outfit-Medium",
                                fontSize: 18,
                            }}
                        >
                            Weight
                        </Text>
                        <Text
                            style={{
                                fontFamily: "outfit-Regular",
                                fontSize: 18,
                                color: "#666",
                            }}
                        >
                            {pet.weight}
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 10,
                        display: "flex",
                        backgroundColor: Colors.WHITE,
                        padding: 10,
                        borderRadius: 10,
                        margin: 5,
                        gap: 10,
                        flex: 1,
                    }}
                >
                    <Image
                        source={require("../../assets/images/sex.png")}
                        style={{
                            width: 40,
                            height: 40,
                            marginRight: 10,
                        }}
                    />
                    <View
                        style={{
                            flex: 1,
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: "outfit-Medium",
                                fontSize: 18,
                            }}
                        >
                            Sex
                        </Text>
                        <Text
                            style={{
                                fontFamily: "outfit-Regular",
                                fontSize: 18,
                                color: "#666",
                            }}
                        >
                            {pet.Sex}
                        </Text>
                    </View>
                </View>
            </View>
            
        </View>
    );
}
