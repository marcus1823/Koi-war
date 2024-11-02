import DashboardScreen from '@/components/screens/admin/dashboard/index'
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
                <DashboardScreen />
            </View>
          </>
        )}
      />
    )
  }
}
