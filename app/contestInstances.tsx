
import ContestInstancesScreen from '@/components/screens/admin/contest/instances/index'
import React, { Component } from 'react'
import { FlatList, View } from 'react-native'

export default class dashboard extends Component {
  render() {
    return (
        <FlatList
        data={[]}
        renderItem={null}
        ListFooterComponent={() => (
          <>
            <View style={{ backgroundColor: "#f9f9f9" }}>
                <ContestInstancesScreen />
            </View>
          </>
        )}
      />
    )
  }
}
