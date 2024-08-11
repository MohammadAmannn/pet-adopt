import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import Colors from '../../constants/Colors';

export default function Aboutpet({ pet }) {
  const [readMore, setReadMore] = useState(true);

  return (
    <View style={{ padding: 10 }}>
      <Text style={{
        fontSize: 20,
        color: '#000',
        fontFamily: 'outfit-Medium'
      }}>
        About {pet?.name}
      </Text>
      <Text numberOfLines={readMore ? 3 : undefined} style={{
        fontSize: 14,
        color: '#000',
        fontFamily: 'outfit-Regular',
        marginTop: 10
      }}>
        {pet?.about} 
      </Text>
      <Pressable onPress={() => setReadMore(!readMore)}>
        <Text style={{
          fontSize: 14,
          color: Colors.Secondary,
          fontFamily: 'outfit-Regular',
          marginTop: 5
        }}>
          {readMore ? 'Read More' : 'Read Less'}
        </Text>
      </Pressable>
    </View>
  );
}
