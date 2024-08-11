import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import MarkFav from '../MarkFav'
export default function PetInfo({pet}) {
  return (
    <View>
        <Image source={{uri:pet.ImageUrl}} style={{
            width: "100%",
            height: 400,
            objectFit: "cover",
            borderRadius: 10,
          
            
        }}/>
        <View style={{
          padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
            marginBottom: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            display:"flex"
        }}>
          <View>
            <Text style={{
              fontSize: 27,
             
              fontFamily:'outfit-bold'
            }}>{pet.name}</Text>
            <Text style={{
              fontSize: 18,
              fontFamily:'outfit-Medium',
              color: "#666",
            }}>{pet.address}</Text>
          </View>
          <MarkFav pet={pet}/>
        </View>

    </View>
  )
}