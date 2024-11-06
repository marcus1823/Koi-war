
import SubCategories from '@/components/screens/admin/contest/subCategories'
import React, { Component } from 'react'
import { FlatList, View } from 'react-native'

export default class subCategories extends Component {
  render() {
    return (
        <FlatList
        data={[]}
        renderItem={null}
        ListFooterComponent={() => (
          <>
            <View style={{ backgroundColor: "#f9f9f9" }}>
                <SubCategories />
            </View>
          </>
        )}
      />
    )
  }
}
