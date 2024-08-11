import { View, Pressable, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Shared from '../shared/Shared';
import { useUser } from '@clerk/clerk-expo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';

export default function MarkFav({ pet}) {
  const { user } = useUser();
  const [favList, setFavList] = useState([]);

  useEffect(() => {
    if (user) {
      GetFav();
    }
  }, [user]);

  const GetFav = async () => {
    try {
      const result = await Shared.GetFavList(user);
      if (result?.favorites) {
        setFavList(result.favorites);
      }
    } catch (error) {
      console.error("Error fetching favorite list:", error);
    }
  };

  const AddToFav = async () => {
    const updatedFavList = [...favList, pet.id];
    await Shared.UpdateFav(user, updatedFavList);
    GetFav(); // Refresh the favorites list after adding a new favorite.
  };

  const removeFromFav = async () => {
    const updatedFavList = favList.filter((id) => id !== pet.id);
    await Shared.UpdateFav(user, updatedFavList);
    GetFav(); // Refresh the favorites list after removing a favorite.
  };

  return (
    <View>
      {favList.includes(pet.id) ? (
        <TouchableOpacity onPress={removeFromFav}>
          <FontAwesome name="heart" size={24} color="red" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={AddToFav}>
          <Feather name="heart" size={24} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
}
