import { Image, Text, TextInput, View } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from '../../../constants/Colors';
import { LinearGradient } from "expo-linear-gradient";

export default function Header() {

    return (
        <LinearGradient
            colors={["#eb7452", "#5C98BB"]}
            style={{
                padding: 20,
                paddingTop: 40,
                backgroundColor: Colors.PRIMARY,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
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
                        fontFamily: 'outfit-medium',
                        color: 'black'
                    }}>Ngoc</Text>
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
                        fontFamily: 'outfit',
                        fontSize: 16
                    }}
                />
            </View>
        </LinearGradient>
    )
}
