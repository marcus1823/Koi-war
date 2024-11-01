import { getUserById } from '@/api/profile/profileApi';
import AntDesign from "@expo/vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Image, Text, TextInput, View } from "react-native";
import { Colors } from "../../../constants/Colors";

export default function Header() {
    const [userHome, setUserHome] = useState({ username: "loading..", role: "loading.." });

    useEffect(() => {
        const getuserHome = async () => {
            try {
                const userHome = await getUserById();
                setUserHome(userHome);
            } catch (error) {
                console.error("Error getting user information!",error)
            }
        }

        getuserHome();
    }, []);

  return (
    <View style={{ position: "relative" }}>
      <LinearGradient
        colors={["#eb7452", "#5C98BB"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          padding: 20,
          paddingTop: 45,
          backgroundColor: Colors.PRIMARY,
          marginBottom: 35,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginBottom: 20,
          }}
        >
          <Image
            source={require("../../../assets/images/avarta.jpg")}
            style={{
              width: 45,
              height: 45,
              borderRadius: 99,
            }}
          />

          <View style={{ flex: 1, flexDirection: "row" }}>
            <Text
              style={{
                color: "black",
                fontSize: 19,
              }}
            >
              Chào mừng
            </Text>
            <Text
              style={{
                marginLeft: 5,
                fontSize: 19,
                fontFamily: "outfit-medium",
                color: "black",
                fontWeight: "bold",
              }}
            >
                {userHome.username}
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Search Bar */}
      <View
        style={{
          position: "absolute", // Đặt vị trí thành absolute
          bottom: 10,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#fff",
          height: 50,
          paddingHorizontal: 15,
          marginHorizontal: 15,
          borderRadius: 100,
          elevation: 5, // Thêm bóng cho thanh tìm kiếm
          // transform: [{ translateY: 6 }],
        }}
      >
        <AntDesign name="search1" size={24} color={Colors.PRIMARY} />
        <TextInput
          placeholder="Tìm kiếm cuộc thi..."
          style={{
            fontFamily: "outfit",
            fontSize: 16,
            flex: 1,
            marginLeft: 10,
          }}
        />
      </View>
    </View>
  );
}
