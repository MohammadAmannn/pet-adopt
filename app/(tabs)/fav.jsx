import { View, Text, FlatList, ActivityIndicator, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Shared from '../../shared/Shared';
import { useUser } from '@clerk/clerk-expo';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../Config/FirebaseConfig';
import PetListItem from '../../components/Home/PetListItem';

export default function Favourite() {
  const { user } = useUser();
  const [favourite, setFavourite] = useState([]);
  const [favPetList, setFavPetList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      GetFavPet();
    }
  }, [user]);

  // Get the favorite pet IDs
  const GetFavPet = async () => {
    setLoading(true); // Start loading
    try {
      const favList = await Shared.GetFavList(user);
      setFavourite(favList?.favorites || []);
    } catch (error) {
      console.error("Error fetching favorite pets:", error);
    } finally {
      setLoading(false); // Stop loading after the fetch
    }
  };

  // Get the pet details based on favorite IDs
  const GetFavPetList = async () => {
    if (favourite.length === 0) return;

    setLoading(true); // Start loading when fetching pet details
    try {
      const q = query(collection(db, 'Pets'), where('id', 'in', favourite));
      const querySnapshot = await getDocs(q);
      const petList = [];
      querySnapshot.forEach((doc) => {
        petList.push(doc.data());
      });
      setFavPetList(petList);
    } catch (error) {
      console.error("Error fetching favorite pet details:", error);
    } finally {
      setLoading(false); // Stop loading after the fetch
    }
  };

  // Fetch favorite pets whenever `favourite` state changes
  useEffect(() => {
    if (favourite.length > 0) {
      GetFavPetList();
    }
  }, [favourite]);

  return (
    <View
      style={{
        padding: 20,
        marginTop: 20,
      }}
    >
      <Text
        style={{
          fontFamily: 'outfit-Medium',
          fontSize: 20,
        }}
      >
        Favourites
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : favPetList.length === 0 ? (
        <View style={{ alignItems: 'center', marginTop: 50 }}>
          <Image
            source={require('../../assets/images/Nofav.jpeg')} // Make sure to add this image to your assets folder
            style={{ width: 200, height: 200 }}
            resizeMode="contain"
          />
          <Text style={{ fontFamily: 'outfit-Medium', fontSize: 18, marginTop: 20 }}>
            No Favorites Yet!
          </Text>
        </View>
      ) : (
        <FlatList 
          data={favPetList}
          numColumns={2}
          renderItem={({ item }) => (
            <View>
              <PetListItem pet={item} />
            </View>
          )}
          keyExtractor={(item) => item.id} // Use a unique key extractor
        />
      )}
    </View>
  );
}
