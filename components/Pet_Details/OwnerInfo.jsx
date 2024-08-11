import { View, Text ,Image} from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import { StyleSheet } from 'react-native'
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function OwnerInfo({pet}) {
  return (
    <View style={styles?.container}>
        <View style={{
            display:'flex',
            flexDirection:'row',
            gap:20


           
        }}>
        <Image source={{uri:pet?.userImage}} style={{
  width:50,
  height:50,
  borderRadius:99,
  marginTop:10,
}} />
<View>
    <Text 
    style={{
        fontSize:18,
        fontFamily:'outfit-Medium',
        color:'#000'
    }}
    >
        {pet?.userName}
    </Text>
    <Text style={{
        fontSize:14,
        fontFamily:'outfit-Regular',
        color:Colors.GRAY
    }}>Pet Owner</Text>

</View>
</View>
<MaterialCommunityIcons name="send" size={24} color="black" />    
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    gap:10,
    marginTop:10,
    marginBottom:20,
    padding:10,
    borderBottomWidth:1,
    borderBottomColor:'#ccc',
    borderRadius:15,
    marginHorizontal:20,
    backgroundColor:Colors.WHITE,
    justifyContent:"space-between",

    
 
  }
})
