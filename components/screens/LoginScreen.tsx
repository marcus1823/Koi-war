import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import logo from "../../assets/images/logo.png";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
const { height } = Dimensions.get("window");

function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showUsernameError, setShowUsernameError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);

  const router = useRouter();
  const handleLogin = () => {
    setShowUsernameError(false);
    setShowPasswordError(false);

    if (!username) {
      setShowUsernameError(true);
    }
    if (!password) {
      setShowPasswordError(true);
    }

    if (username && password) {
      if (username === "user" && password === "123") {
        router.push("/(tabs)/home");
      } else {
        alert("wrong username and password!");
      }
    }
  };
  const handleSignUp = () => {};
  return (
    <LinearGradient
      colors={["#eb7452", "#0c446e"]}
      style={[styles.background, { height }]}
    >
      <Image source={logo} style={styles.logo} />
      <Text style={styles.header}>KOI-WAR</Text>
      <Text style={styles.slogan}>Discover - Compete - Celebrate Koi</Text>
      <View style={styles.form}>
        {showUsernameError && (
          <View style={{ flexDirection: "row", marginLeft: 20, marginTop: 15 }}>
            <MaterialIcons name="error-outline" size={20} color="white" />
            <Text style={styles.errorText}>Please enter User Name</Text>
          </View>
        )}
        <View style={styles.inputContainer}>
          <FontAwesome6
            name="user"
            size={20}
            color="#fff"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="User Name"
            placeholderTextColor="#fff"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        {showPasswordError && (
          <View style={{ flexDirection: "row", marginTop: 15, marginLeft: 20 }}>
            <MaterialIcons name="error-outline" size={20} color="white" />
            <Text style={styles.errorText}>Please enter Password</Text>
          </View>
        )}

        <View style={styles.inputContainer}>
          <Feather name="lock" size={20} color="white" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#fff"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.or}>_____ Create new an account? _____</Text>
        <TouchableOpacity style={styles.button2} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    color: "white",
    fontSize: 30,
    textAlign: "center",
    fontWeight: "600",
  },
  slogan: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "400",
    marginBottom: 25,
  },
  background: {
    flex: 1,
    justifyContent: "center", // Căn giữa nội dung
    alignItems: "center", // Căn giữa nội dung
  },

  info: { flexDirection: "row", marginBottom: 10 },
  button: {
    width: "100%",
    backgroundColor: "black",
    borderRadius: 40,
    paddingVertical: 15,
    alignItems: "center",
  },
  button2: {
    width: "100%",
    borderColor: " rgba(255, 255, 255, 0.4)",
    borderWidth: 2,
    borderRadius: 40,
    paddingVertical: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  form: {
    width: "85%",
    paddingBottom: 20,
  },
  or: {
    color: "rgba(255, 255, 255, 0.8)",
    marginVertical: 25,
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 40,
    paddingHorizontal: 10,
    marginBottom: 20,
    paddingVertical: 12,
  },
  icon: {
    marginHorizontal: 10,
  },
  input: {
    flex: 1,

    color: "#fff",
  },
  logo: {
    width: 80,
    height: 80,
  },
  errorText: {
    color: "white",
    fontSize: 14,
    marginBottom: 10,
    marginLeft: 10,
  },
});
