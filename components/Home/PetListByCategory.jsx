import { View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Category from "./Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Config/FirebaseConfig";
import PetListItem from "./PetListItem";
import Colors from "../../constants/Colors";

export default function PetListByCategory() {
  const [petList, setPetList] = useState([]);
  const [loader,setLoader]=useState(false)

  useEffect(() => {
    GetPetList("Dogs"); // Fetch pets for the initial category 'Dogs'
  }, []);

  // Function to fetch pets based on the selected category
  const GetPetList = async (category) => {
    setLoader(true)
    setPetList([]); // Clear the previous list before fetching new data
    const q = query(
      collection(db, "Pets"),
      where("category", "==", category || "Dogs")
    );
    const querySnapshot = await getDocs(q);

    const pets = [];
    querySnapshot.forEach((doc) => {
      pets.push(doc.data());
    });
    setPetList(pets);
    setLoader(false)
  };

  return (
    <View style={{
     padding:10,
     marginRight:15,
     backgroundColor:Colors.WHITE,
     borderRadius:10,
     
    }}>
      {/* Category component to select the category */}
      <Category
        category={(value) => {
          GetPetList(value);
        }}
      />
      {/* FlatList to display the pets */}
      <FlatList
      showsHorizontalScrollIndicator={false}
      style={{
          marginTop: 10,
        }}
      horizontal={true}
      refreshing={loader}
      onRefresh={() => GetPetList("Dogs")}

        data={petList}
        renderItem={({ item }) => <PetListItem pet={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
