import { View, Text, FlatList, Dimensions, Image, StyleSheet, Animated } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Config/FirebaseConfig";

export default function Slider() {
  // State for slider items and current index
  const [sliderList, setSliderList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Reference to the FlatList
  const flatListRef = useRef(null);
  
  useEffect(() => {
    GetSliders();
  }, []);

  // Fetch sliders from database
  const GetSliders = async () => {
    const snapshot = await getDocs(collection(db, "Sliders"));
    const sliders = [];
    snapshot.forEach((doc) => {
      sliders.push(doc.data());
    });
    setSliderList(sliders);
  };

  // Auto-slide functionality
  useEffect(() => {
    if (sliderList.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % sliderList.length;
          flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
          return nextIndex;
        });
      }, 5000);
      
      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [sliderList]);

  return (
    <View>
      <FlatList
        ref={flatListRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={sliderList}
        renderItem={({ item }) => (
          <View>
            <Image
              source={{ uri: item?.ImageUrl }}
              style={styles.sliderImage}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sliderImage: {
    width: Dimensions.get("screen").width * 0.9,
    height: 160,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    marginRight: 20,
  },
});
