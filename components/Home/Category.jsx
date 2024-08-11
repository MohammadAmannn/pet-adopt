import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Config/FirebaseConfig";
import Colors from "../../constants/Colors";

export default function Category({ category }) {
  const [categoryList, setcategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Dogs");
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    GetCategories();
  }, []);

  const GetCategories = async () => {
    try {
      const snapshot = await getDocs(collection(db, "Category"));
      const categories = snapshot.docs.map((doc) => doc.data());
      setcategoryList(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false); // Stop loading once data is fetched
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 20 }} />;
  }

  return (
    <View style={{ flexDirection: "column", justifyContent: "space-between", marginTop: 10 }}>
      <Text style={{ fontFamily: "outfit-Medium", fontSize: 20 }}>Category</Text>

      <FlatList
        data={categoryList}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setSelectedCategory(item.name);
                category(item.name);
              }}
              style={[
                {
                  marginRight: 10,
                  marginBottom: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 10,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "#000",
                  backgroundColor: Colors.ligh,
                  shadowColor: Colors.Secondary,
                  marginTop: 10,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                },
                selectedCategory === item.name && {
                  backgroundColor: Colors.Secondary, // Adjust this to your desired color
                  borderColor: Colors.Secondary, // Adjust this to your desired color
                },
              ]}
            >
              <Image source={{ uri: item?.ImageUrl }} style={{ height: 40, width: 40 }} />
              <Text style={{ fontFamily: "outfit-Medium", fontSize: 15 }}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
