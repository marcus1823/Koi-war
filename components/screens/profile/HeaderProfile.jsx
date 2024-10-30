import { getUserById } from '@/api/profile/profileApi';
import Feather from '@expo/vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native';

export default function HeaderProfile() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState({ username: "loading..", role: "loading.." });
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const userProfile = await getUserById();
        setUserProfile(userProfile);
      } catch (error) {
        console.error("Error getting user information: ", error);
      }
    };

    getUserProfile();
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
    Animated.timing(dropdownAnimation, {
      toValue: dropdownVisible ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleEditProfile = () => {
    router.push("/editprofile");
    setDropdownVisible(false); // Close dropdown after navigating
  };

  const handleLogout = () => {
    console.log("Logged out");
    router.replace("/login"); // Navigate to login screen after logout
  };

  const dropdownHeight = dropdownAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 80], // Adjust the output range based on your desired dropdown height
  });

  return (
    <View>
      <LinearGradient
        colors={['#F5B16D', '#CC0000']}
        style={styles.container}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleDropdown} style={styles.menuIcon}>
            <Feather name="menu" size={24} color="black" />
          </TouchableOpacity>

          <Image
            source={require('../../../assets/images/koi-fish.png')}
            style={styles.avatar}
          />
          <Text style={styles.username}>{userProfile.username}</Text>
          <Text style={styles.role}>{userProfile.role}</Text>
        </View>

        {/* Dropdown positioned directly below the menu icon */}
        {dropdownVisible && (
                        <View style={styles.dropdownWrapper}>
                            <View style={styles.arrow} />
                            <View style={styles.dropdownMenu}>
                                <TouchableOpacity style={styles.menuItem} onPress={handleEditProfile}>
                                    <Text style={styles.menuText}>Edit Profile</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                                    <Text style={styles.menuText}>Log out</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
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
  menuIcon: {
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
  role: {
    color: '#fff',
    fontSize: 14,
    marginVertical: 5,
  },
  dropdown: {
    overflow: 'hidden', // Prevents content overflow during animation
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 10, // Adjust margin to create space below the menu icon
    alignSelf: 'flex-end', // Aligns dropdown to the right
    width: 120, // Adjust width as necessary
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // For Android shadow
  },
  dropdownItem: {
    padding: 10,
    alignItems: 'flex-start',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownWrapper: {
    position: 'absolute',
    right: 0,
    top: 35, // Adjust this to control dropdown distance from the icon
    marginRight: 120
},
dropdownMenu: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'absolute',
    marginTop: 60
},
menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
},
menuText: {
    fontSize: 16,
    color: '#000',
},
});
