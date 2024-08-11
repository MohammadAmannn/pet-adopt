import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "react-native";
import Colors from "../../constants/Colors";
import { useRouter } from "expo-router";
import MarkFav from "../../components/MarkFav";

export default function PetListItem({ pet }) {
const router=useRouter()

  return (
    <TouchableOpacity onPress={()=>router.push({
      pathname: "/pet-details",
      params: 
         pet
      
    })}
    
    
    style={{
        padding:10,
        marginRight: 15,
        backgroundColor:Colors.WHITE,
        borderRadius: 10,
        
    }}>
      <View style={{
       position:'absolute',
       top: 10,
       right: 10,
       zIndex: 10,

      }}>
        <MarkFav pet={pet}/>
      </View>
      <Image
        source={{ uri: pet?.ImageUrl }}
        style={{
          width: 150,
          height: 135,
          objectFit: "cover",
          borderRadius: 10,
          
         
        }}
      />

      <Text style={{
        fontFamily: "outfit-Medium",
        fontSize: 18,
        marginTop: 10,
        marginBottom: 10,
        color: Colors.Secondary,
      }}
      
      >{pet.name}</Text>

      <View style={{
        flexDirection: "row",
        justifyContent:"space-between",
        display:"flex",
        alignItems:"center"

      }}>
        <Text style={{
          fontFamily: "outfit-Medium",
          fontSize: 15,
          color: Colors.GRAY,
        }}
        >{pet.breed}</Text>
        <Text style={{
            fontFamily: "outfit-Medium",
            fontSize: 11,
            paddingHorizontal:7,
            borderRadius: 10,
            color: Colors.primary,
            backgroundColor:Colors.ligh  
        }}
        > {pet.age}YRS</Text>
      </View>




    </TouchableOpacity>
  );
}
