import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface FloatingCounterButtonProps {
  count: number;
  onPress: () => void;
}

const FloatingCounterButton: React.FC<FloatingCounterButtonProps> = ({
  count,
  onPress,
}) => {
  if (count === 0) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <View style={styles.buttonContent}>
          <Text style={styles.counterText}>
            {count} {count === 1 ? 'Hạng mục' : 'Hạng mục'}
          </Text>
          <Icon
            name="arrow-forward"
            size={24}
            color="#fff"
            style={styles.icon}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 20,
      width: '100%',
      alignItems: 'center',
    },
    floatingButton: {
      backgroundColor: '#4CAF50',
      paddingHorizontal: 24,
      height: 48,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      minWidth: 140,
      elevation: 6,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
    },
    buttonContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    counterText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      marginRight: 8,
    },
    icon: {
      marginLeft: 4,
    },
  });

export default FloatingCounterButton;