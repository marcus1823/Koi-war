import { Ionicons } from '@expo/vector-icons';
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Dimensions, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import logo from "../../assets/images/logo.png";

const { height } = Dimensions.get("window");

function SignUpScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const [showUsernameError, setShowUsernameError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPasswordError, setShowConfirmPasswordError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // Trạng thái modal
  const [successMessage, setSuccessMessage] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const router = useRouter();

  const handleSignUp = () => {
    setShowUsernameError(false);
    setShowPasswordError(false);
    setShowConfirmPasswordError(false); // Reset trạng thái lỗi
    setSuccessMessage("");

    // Validation
    if (!username) {
      setShowUsernameError(true);
    }
    if (!password || password.length < 6) {
      setShowPasswordError(true);
    }
    if (password !== confirmPassword) {
      setShowConfirmPasswordError(true);
    }

    // Simulated success response
    if (username && password && password.length >= 6 && password === confirmPassword) {
      setModalVisible(true); // Hiển thị modal
      // Reset form fields
      setSuccessMessage("Sign up successful! Welcome!");
      setUsername("");
      setPassword("");
      setConfirmPassword(""); // Reset confirmPassword
      setRole("User");
    } else {
      Alert.alert("Error", "Please fill out all fields correctly!");
    }
  };

    const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    };

  const handleModalClose = () => {
    setModalVisible(false);
    router.push("/login"); // Chuyển hướng đến trang đăng nhập
  };

  return (
    <LinearGradient colors={["#eb7452", "#5C98BB"]} style={[styles.background, { height }]}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.header}>KOI-WAR</Text>
      <Text style={styles.slogan}>Join the battle with Koi!</Text>
      <View style={styles.form}>
        {showUsernameError && (
          <View style={{ flexDirection: "row", marginLeft: 20, marginTop: 15 }}>
            <MaterialIcons name="error-outline" size={20} color="white" />
            <Text style={styles.errorText}>Please enter User Name</Text>
          </View>
        )}
        <View style={styles.inputContainer}>
          <FontAwesome6 name="user" size={20} color="#fff" style={styles.icon} />
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
            <Text style={styles.errorText}>Please enter a strong Password (at least 6 characters)</Text>
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
                <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={17} color={"white"} />
            </TouchableOpacity>
        </View>
        {showConfirmPasswordError && (
          <View style={{ flexDirection: "row", marginTop: 15, marginLeft: 20 }}>
            <MaterialIcons name="error-outline" size={20} color="white" />
            <Text style={styles.errorText}>Passwords do not match</Text>
          </View>
        )}
        <View style={styles.inputContainer}>
          <Feather name="lock" size={20} color="white" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#fff"
            secureTextEntry={!isConfirmPasswordVisible}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
            <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
                <Ionicons name={isConfirmPasswordVisible ? 'eye-off' : 'eye'} size={17} color={"white"} />
            </TouchableOpacity>
        </View>

        <View style={styles.roleContainer}>
          <Text style={styles.roleText}>Role:</Text>
          <TouchableOpacity
            style={[styles.roleButton, role === "User" && styles.selectedRole]}
            onPress={() => setRole("User")}
          >
            <Text style={styles.roleButtonText}>User</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.roleButton, role === "Staff" && styles.selectedRole]}
            onPress={() => setRole("Staff")}
          >
            <Text style={styles.roleButtonText}>Staff</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.roleButton, role === "Referee" && styles.selectedRole]}
            onPress={() => setRole("Referee")}
          >
            <Text style={styles.roleButtonText}>Referee</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.or}>_____ Already have an account? _____</Text>
        <TouchableOpacity style={styles.button2} onPress={() => router.push("/login")}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

    {/* Modal for success message */}
        <Modal
                transparent={true}
                visible={modalVisible}
                animationType="slide"
            >
                <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>{successMessage}</Text>
                    {/* <Text style={styles.modalText}>Login Now</Text> */}
                    <TouchableOpacity onPress={handleModalClose} style={styles.modalButton}>
                    <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </Modal>
    </LinearGradient>
  );
}

export default SignUpScreen;

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
    fontFamily: 'outfit-regular'
  },
  slogan: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "400",
    marginBottom: 69,
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
    marginTop: 20
  },
  button2: {
    width: "100%",
    borderColor: "rgba(255, 255, 255, 0.4)",
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
  successText: {
    color: "green",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  roleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    alignItems: "center"
  },
  roleText: {
    color: "white",
    fontSize: 16,
  },
  roleButton: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  selectedRole: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  roleButtonText: {
    color: "white",
    fontSize: 11
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  modalText: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#eb7452",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});
