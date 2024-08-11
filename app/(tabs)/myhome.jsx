import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import PetListByCategory from '../../components/Home/PetListByCategory'
import Colors from '../../constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
export default function myhome() {
  const router=useRouter()
  return (
    <View style={{
     padding:20,
     marginTop:20
    }}>  
  {/* Header */}
  <Header/>

  {/* slider */}
  <Slider/>

  {/* caategory +petlist*/}

  <PetListByCategory 

  
  />

  {/* list of pets */}

  {/* add new pet */}
  <TouchableOpacity onPress={()=>router.push({
      pathname: "/add-new-pet",
      
      
    })}
    
  
  style={{
    padding:20,
    backgroundColor:Colors.ligh,
    borderRadius:15,
    marginTop:10,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    gap:10,
    display:"flex",
    borderWidth:1,
    borderColor:Colors.primary,
    
    
    
  }}>
  <MaterialIcons name="pets" size={24} color={Colors.primary}/>
    <Text style={{
      fontFamily:"outfit-Regular",
      fontSize:18,
      color:Colors.black,
      marginTop:5,
    }}>Add new pet</Text>
  </TouchableOpacity>
    </View>
  )
}


