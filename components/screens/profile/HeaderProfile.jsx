import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';

export default function HeaderProfile() {
  const router = useRouter();

  const navigateToEditProfile = () => {
    router.push("/editprofile"); 
  };

  return (
    <View>
      <LinearGradient
        colors={['#F5B16D', '#CC0000']}
        style={styles.container}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={navigateToEditProfile} style={styles.editIcon}>
            <Feather name="edit" size={24} color="black" />
          </TouchableOpacity>

          <Image
            source={require('../../../assets/images/koi-fish.png')}
            style={styles.avatar}
          />
          <Text style={styles.username}>Lucasta</Text>
          <Text style={styles.Role}>User</Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    marginTop: 50,
  },
  editIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  Role: {
    color: '#fff',
    fontSize: 14,
    marginVertical: 5,
  },
});
