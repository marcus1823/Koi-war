import { AntDesign } from '@expo/vector-icons'; // Icon library
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function EditProfile() {

  const router = useRouter();

  const handleUpdate = () => {
    console.log("Profile Updated");
  };

  const handleDeleteAccount = () => {
    console.log("Account Deleted");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <AntDesign name="arrowleft" size={24} color="black" style={styles.backIcon} onPress={() => router.back()}/>
        <Text style={styles.headerText}>Edit Profile</Text>
      </View>

      {/* Avatar Section */}
      <View style={styles.avatarContainer}>
        <Image
          source={require('../../../assets/images/nuochoa1.png')} // Example image source
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.cameraIcon}>
          <AntDesign name="camerao" size={16} color="white" />
        </TouchableOpacity>
      </View>

      {/* Form Fields */}
      <View style={styles.form}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput style={styles.input} placeholder="your full name here" />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} placeholder="youremail@gmail.com" />
        <Text style={styles.resendEmail}>Request to resend confirmation email !</Text>

        <Text style={styles.label}>Phone Number</Text>
        <TextInput style={styles.input} placeholder="+84 912345678" />

        <Text style={styles.label}>Date of birth</Text>
        <TextInput style={styles.input} placeholder="Enter date of birth" />
      </View>

      {/* Delete and Update buttons */}
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
        <Text style={styles.deleteText}>Delete account</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.updateText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
  },
  backIcon: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 20,
    padding: 20
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 70,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    backgroundColor: '#007bff',
    borderRadius: 15,
    padding: 4,
  },
  form: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  resendEmail: {
    fontSize: 14,
    color: '#007bff',
    marginBottom: 15,
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: '#ff4d4d',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  deleteText: {
    color: '#ff4d4d',
    fontSize: 16,
    fontWeight: 'bold',
  },
  updateButton: {
    backgroundColor: '#CC0000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  updateText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
