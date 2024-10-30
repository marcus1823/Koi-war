import { getUserById } from '@/api/profile/profileApi';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from 'react';
import { Image, Text, TextInput, View } from 'react-native';
import { Colors } from '../../../constants/Colors';

export default function Header() {
    const [userHome, setUserHome] = useState({ username: "loading..", role: "loading.." });

    useEffect(() => {
        const getUserHome = async () => {
          try {
            const userHome = await getUserById();
            setUserHome(userHome);
          } catch (error) {
            console.error("Error getting user information: ", error);
          }
        };
    
        getUserHome();
      }, []);

    return (
        <LinearGradient
            colors={['rgb(245, 177, 109)', 'rgb(204, 0, 0)']}
            style={{
                padding: 20,
                paddingTop: 40,
                backgroundColor: Colors.PRIMARY,
                // borderBottomLeftRadius: 20,
                // borderBottomRightRadius: 20,
            }}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10
            }}>
                <Image source={require('../../../assets/images/avarta.jpg')}
                    style={{
                        width: 45,
                        height: 45,
                        borderRadius: 99,
                    }}
                />

                <View>
                    <Text style={{
                        color: 'black'
                    }}>Welcome,</Text>
                    <Text style={{
                        fontSize: 19,
                        color: 'black'
                    }}>{userHome.username}</Text>
                </View>
            </View>
            {/* Search Bar */}
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
                backgroundColor: '#fff',
                padding: 10,
                marginVertical: 10,
                marginTop: 15,
                borderRadius: 8
            }}>
                <AntDesign name="search1" size={24} color={Colors.PRIMARY} />
                <TextInput placeholder='Search...'
                    style={{
                        fontSize: 16
                    }}
                />
            </View>
        </LinearGradient>
    )
}
