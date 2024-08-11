import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import Colors from "../../constants/Colors";
import { Picker } from "@react-native-picker/picker";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { db, storage } from "../../Config/FirebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";

export default function NewPet({pet}) {
  const navigation = useNavigation();

  // State to store form data, category list, image URI, loading status, and error messages
  const [formData, setFormData] = useState({
    sex: "Male",
    category: "Dogs",
  });
  const [categoryList, setCategoryList] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const { user } = useUser();

  // Fetch categories when the component mounts
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Pet",
    });
    GetCategories();
  }, []);

  // Function to fetch pet categories from Firestore
  const GetCategories = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "Category"));
      const categories = snapshot.docs.map((doc) => doc.data());
      setCategoryList(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      ToastAndroid.show("Failed to fetch categories", ToastAndroid.BOTTOM);
    } finally {
      setLoading(false);
    }
  };

  // Function to open the image picker and set the selected image URI
  const imagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      handleInputChange("image", result.assets[0].uri); // Add image URI to formData
    }
  };

  // Function to handle changes in form inputs
  const handleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  // Function to validate and submit form data
  const onSubmit = () => {
    const allFieldsFilled = Object.values(formData).every((value) => value);
    if (!allFieldsFilled || !image) {
      ToastAndroid.show("Please Enter All Details", ToastAndroid.BOTTOM);
      return;
    }

    console.log(formData);
    // Upload image and save form data to Firestore
    UploadImage();
  };

  // Function to upload image to Firebase Storage
  const UploadImage = async () => {
    setLoading(true);
    try {
      const resp = await fetch(image);
      const blobImage = await resp.blob();
      const storageRef = ref(storage, "/PetAdopt/" + Date.now() + ".jpg");
      await uploadBytes(storageRef, blobImage);
      console.log("File Uploaded");

      // Get download URL after successful upload
      const downloadUrl = await getDownloadURL(storageRef);
      console.log(downloadUrl);

      // Save form data with the uploaded image URL
      SaveFormData(downloadUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      ToastAndroid.show("Image upload failed", ToastAndroid.BOTTOM);
    } finally {
      setLoading(false);
    }
  };

  // Function to save form data to Firestore
  const SaveFormData = async (imageUrl) => {
    const docId = Date.now().toString();
    try {
      await setDoc(doc(db, "Pets", docId), {
        ...formData,
        imageUrl: imageUrl,
        userName:user.fullName,
        email: user.primaryEmailAddress?.emailAddress,
        userImage: user.imageUrl,
        id: docId,
      });
      ToastAndroid.show("Pet added successfully", ToastAndroid.BOTTOM);
      navigation.goBack();
    } catch (error) {
      console.error("Error saving pet data:", error);
      ToastAndroid.show("Failed to save pet data", ToastAndroid.BOTTOM);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add New Pet</Text>

      <TouchableOpacity onPress={imagePicker}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Image
            source={require("../../assets/images/pet.jpeg")}
            style={styles.image}
          />
        )}
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color={Colors.primary} />
      ) : (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Pet Name*</Text>
            <TextInput
              placeholder="Enter Name"
              style={styles.input}
              onChangeText={(value) => handleInputChange("name", value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Pet Category*</Text>
            <Picker
              selectedValue={formData.category}
              style={styles.input}
              onValueChange={(item) => handleInputChange("category", item)}
            >
              {categoryList.map((category, index) => (
                <Picker.Item
                  key={index}
                  label={category.name}
                  value={category.name}
                />
              ))}
            </Picker>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Pet Breed*</Text>
            <TextInput
              placeholder="Enter Breed"
              style={styles.input}
              onChangeText={(value) => handleInputChange("breed", value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Pet Age*</Text>
            <TextInput
              keyboardType="numeric"
              placeholder="Enter Age"
              style={styles.input}
              onChangeText={(value) => handleInputChange("age", value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Gender*</Text>
            <Picker
              selectedValue={formData.sex}
              style={styles.input}
              onValueChange={(item) => handleInputChange("sex", item)}
            >
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
            </Picker>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Pet Weight*</Text>
            <TextInput
              keyboardType="numeric"
              placeholder="Enter Weight"
              style={styles.input}
              onChangeText={(value) => handleInputChange("weight", value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Address*</Text>
            <TextInput
              placeholder="Enter Your Address"
              style={styles.input}
              onChangeText={(value) => handleInputChange("address", value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>About Pet*</Text>
            <TextInput
              numberOfLines={3}
              multiline={true}
              style={styles.input}
              onChangeText={(value) => handleInputChange("about", value)}
            />
          </View>

          <TouchableOpacity onPress={onSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

// Styles for the components
const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 20,
  },
  title: {
    fontFamily: "outfit-Medium",
    fontSize: 20,
    color: "#000",
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 20,
    borderRadius: 15,
    borderEndWidth: 1,
    borderColor: Colors.GRAY,
  },
  inputContainer: {
    marginVertical: 5,
  },
  input: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
  },
  label: {
    marginVertical: 5,
    fontFamily: "outfit-Regular",
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 7,
    marginVertical: 10,
    marginBottom: 50,
  },
  buttonText: {
    fontFamily: "outfit-Regular",
    fontSize: 18,
    color: Colors.black,
    textAlign: "center",
  },
});
