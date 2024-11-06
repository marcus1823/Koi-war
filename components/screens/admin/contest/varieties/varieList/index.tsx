import { Variety } from "@/models/types";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import VarietyCard from "../varieCard";

const VarietyList: React.FC<{ varieties: Variety[] }> = ({ varieties }) => {
  const [selectedVarieties, setSelectedVarieties] = useState<Variety[]>([]);
  const router = useRouter();

  const handleSelect = (variety: Variety) => {
    setSelectedVarieties((prevSelected) => {
      if (prevSelected.find((item) => item._id === variety._id)) {
        return prevSelected.filter((item) => item._id !== variety._id);
      } else {
        return [...prevSelected, variety];
      }
    });
  };

  const handlePress = () => {
    const selectedData = selectedVarieties.map((variety) => ({
      id: variety._id,
      name: variety.name,
      description: variety.description,
    }));

    router.push({
      pathname: "/subCategories",
      params: { selectedVarieties: JSON.stringify(selectedData) },
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={varieties}
        renderItem={({ item }) => (
          <VarietyCard
            variety={item}
            isSelected={selectedVarieties.some((v) => v._id === item._id)}
            onSelect={handleSelect}
            onEdit={(variety) => console.log("Edit", variety)}
            onDelete={(id) => console.log("Delete", id)}
          />
        )}
        keyExtractor={(item) => item._id}
        numColumns={2}
      />

      {selectedVarieties.length > 0 && (
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>
            Selected ({selectedVarieties.length})
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 20,
    left: "50%",
    transform: [{ translateX: -50 }],
    backgroundColor: "#4CAF50",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default VarietyList;
