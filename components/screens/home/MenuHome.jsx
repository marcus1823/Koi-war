import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from 'expo-router';

const MenuHome = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.icons}>
        <TouchableOpacity 
          style={styles.itemMenu}
          onPress={() => router.push('/competition')}
        >
          <View style={styles.icon}>
            <FontAwesome6 name="newspaper" size={25} color="#f45124" />
          </View>
          <Text
            style={{
              color: "#f45124",
              fontWeight: "600",
              flex: 1,
              justifyContent: "center",
              marginTop: 5,
              textAlign: "center",
            }}
          >
            Cuộc thi cá Koi
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.itemMenu}
          onPress={() => router.push('/competition')}
        >
          <View style={styles.icon}>
            <FontAwesome6 name="fish-fins" size={25} color="#f45124" />
          </View>
          <Text
            style={{
              color: "#f45124",
              fontWeight: "600",
              flex: 1,
              justifyContent: "center",
              marginTop: 5,
              textAlign: "center",
            }}
          >
            Các loại cá Koi
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemMenu}>
          <View style={styles.icon}>
            <FontAwesome5 name="award" size={25} color="#f45124" />
          </View>
          <Text
            style={{
              color: "#f45124",
              fontWeight: "600",
              flex: 1,
              justifyContent: "center",
              marginTop: 5,
              textAlign: "center",
            }}
          >
            Cuộc thi của bạn
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemMenu}>
          <View style={styles.icon}>
            <MaterialCommunityIcons
              name="fishbowl"
              size={25}
              color="#f45124"
            />
          </View>
          <Text
            style={{
              color: "#f45124",
              fontWeight: "600",
              flex: 1,
              justifyContent: "center",
              marginTop: 5,
              textAlign: "center",
            }}
          >
            Cá Koi của bạn
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MenuHome;

const styles = StyleSheet.create({
  container: { backgroundColor: "#f9f9f9", width: "100%" },
  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    paddingVertical: 20,
  },
  icon: {
    width: 70,
    padding: 10,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 10,
  },
  itemMenu: {
    width: 70,
    alignItems: "center",
  },
});
