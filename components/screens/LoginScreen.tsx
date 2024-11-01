import { loginUser } from "@/api/loginApi";
import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import logo from "../../assets/images/logo.png";
const { height } = Dimensions.get("window");

function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showUsernameError, setShowUsernameError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    setShowUsernameError(false);
    setShowPasswordError(false);

    if (!username) {
      setShowUsernameError(true);
      return;
    }
    if (!password) {
      setShowPasswordError(true);
      return;
    }

    setIsLoading(true);

    try {
      const user = await loginUser(username, password);

      setLoginMessage("Login successful!");
      setModalVisible(true);
      setUsername("");
      setPassword("");

      setTimeout(() => {
        setModalVisible(false);
        router.push("/(tabs)/home");
      }, 1500);
    } catch (error: any) {
      Alert.alert("Login error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <LinearGradient
      colors={["#eb7452", "#5C98BB"]}
      style={[styles.background, { height }]}
    >
      <Image source={logo} style={styles.logo} />
      <Text style={styles.header}>KOI WAR</Text>
      <Text style={styles.slogan}>Discover - Compete - Celebrate Koi</Text>

      <View style={styles.form}>
        {showUsernameError && (
          <View style={styles.errorContainer}>
            <MaterialIcons name="error-outline" size={20} color="white" />
            <Text style={styles.errorText}>Please enter Username</Text>
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
            placeholder="Username"
            placeholderTextColor="#fff"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>

        {showPasswordError && (
          <View style={styles.errorContainer}>
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
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Ionicons
              name={isPasswordVisible ? "eye-off" : "eye"}
              size={17}
              color="white"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.or}>_____ Create new account? _____</Text>

        <TouchableOpacity
          style={styles.button2}
          onPress={() => router.push("/signup")}
        >
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>

      {/* Success Modal */}
      <Modal transparent={true} visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <MaterialIcons name="check-circle" size={50} color="#eb7452" />
            <Text style={styles.modalText}>{loginMessage}</Text>
          </View>
        </View>
      </Modal>
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
    marginBottom: 75,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  info: { flexDirection: "row", marginBottom: 10 },
  button: {
    width: "100%",
    backgroundColor: "black",
    borderRadius: 40,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 25,
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
  errorContainer: {
    flexDirection: "row",
    marginLeft: 20,
    marginTop: 15,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
  },
  modalText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
});
