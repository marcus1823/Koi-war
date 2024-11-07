import ScoreScreen from '@/components/screens/referee/score'
import React, { Component } from 'react'
import { FlatList, View } from 'react-native'

export class score extends Component {
  render() {
    return (
        <FlatList
        data={[]}
        renderItem={null}
        ListFooterComponent={() => (
          <>
            <View style={{ backgroundColor: "#f9f9f9" }}>
                <ScoreScreen />
            </View>
          </>
        )}
      />
    )
  }
}

export default score
