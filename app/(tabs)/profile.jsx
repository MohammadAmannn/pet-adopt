import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import Colors from '../../constants/Colors';
import { Feather } from '@expo/vector-icons';

export default function Profile() {
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: user?.imageUrl }} style={styles.profileImage} />
        <Text style={styles.name}>{user?.fullName}</Text>
        <Text style={styles.email}>{user?.primaryEmailAddress?.emailAddress}</Text>
      </View>

      <View style={styles.details}>
        <TouchableOpacity style={styles.detailItem}>
          <Feather name="user" size={24} color={Colors.primary} />
          <Text style={styles.detailText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.detailItem}>
          <Feather name="settings" size={24} color={Colors.primary} />
          <Text style={styles.detailText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.detailItem}>
          <Feather name="lock" size={24} color={Colors.primary} />
          <Text style={styles.detailText}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.detailItem}>
          <Feather name="log-out" size={24} color={Colors.primary} />
          <Text style={styles.detailText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
  details: {
    marginTop: 30,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  detailText: {
    marginLeft: 10,
    fontSize: 18,
    color: Colors.text,
  },
});
