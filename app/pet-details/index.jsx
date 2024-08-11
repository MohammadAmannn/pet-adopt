import { View, Text, ScrollView, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import PetInfo from '../../components/Pet_Details/Pet_info';
import PetSubInfo from '../../components/Pet_Details/PetSubInfo';
import Aboutpet from '../../components/Pet_Details/Aboutpet';
import OwnerInfo from '../../components/Pet_Details/OwnerInfo';
import { StyleSheet } from 'react-native'
import Colors from '../../constants/Colors';
import { useUser } from '@clerk/clerk-expo';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '../../Config/FirebaseConfig';


export default function PetDetails() {

  const pet=useLocalSearchParams();
  const navigation=useNavigation();
  const {user}=useUser()
  const router=useRouter()

  useEffect(()=>{
    navigation.setOptions({
      headerTransparent:true,
      headerTitle:"",
    })
  })

//   useEffect(() => {
//     console.log("Pet:", pet); // Check the pet object
//   }, [pet]);
  

// const InitiateChat=async()=>{

// const docId1=user?.primaryEmailAddress?.emailAddress+'_'+pet?.email;
// const docId2=pet?.email+'_'+user?.primaryEmailAddress?.emailAddress;

// const q=query(collection(db,'Chat'),where('id','in',[docId1,docId2]));
// const querySnapshot=await getDocs(q);
// querySnapshot.forEach(doc=>{

//   console.log(doc.data())

//   router.push({
//     pathname:'/chat',
//     params:{id:doc.id}
//   })

// })

// if(querySnapshot.docs?.length==0){
//   await setDoc(doc(db,'Chat',docId1),{
//     id:docId1,
//     users:[
//       {
//         email:user?.primaryEmailAddress?.emailAddress,
//         imageUrl:user?.imageUrl,
//         name:user?.fullName
//       },
//       {
//         email:pet?.email,
//          imageUrl:pet?.userImage,
//          name:pet?.userName
//       }
//     ]

//   });

//   router.push({
//     pathname:'/chat',
//      params:{id:docId1}

//   })
// }


// }

  return (
    <View>
      <ScrollView>
  {/* pet info */}
  <PetInfo pet={pet}/>
  {/* pet des */}
  <PetSubInfo pet={pet}/>
  {/* about */}
  <Aboutpet pet={pet}/>
  {/* owner detail */}
  <OwnerInfo pet={pet}/>
<View style={{
 height:70
}}> 
 <View style={styles?.container}>
  <TouchableOpacity 
  
  style={styles.adoptbtn}>
    <Text style={{
      fontSize:18,
      fontFamily:'outfit-Medium',
      textAlign:'center',
    }}>Adopt Me</Text>

  </TouchableOpacity>
  </View>

</View>
  
  </ScrollView>
  {/* adopt */}
 
    </View>
  )
}

const styles = StyleSheet.create({
  adoptbtn:{
    padding:15 ,
    backgroundColor:Colors.primary
    
  },
  container:{
    position:"absolute",
    width:'100%',
    bottom:0,
    
  }
})
