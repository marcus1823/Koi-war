import VarietiesScreen from '@/components/screens/admin/contest/varieties';
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

class VarietiesWrapper extends Component {
  render() {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <FlatList
          data={[]}
          renderItem={null}
          ListFooterComponent={() => (
            <View style={{ backgroundColor: "#f9f9f9" }}>
              <VarietiesScreen />
            </View>
          )}
        />
      </GestureHandlerRootView>
    );
  }
}

export default VarietiesWrapper;
