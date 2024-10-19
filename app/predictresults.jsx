import { View, FlatList } from 'react-native'
import React from 'react'
import PredictResults from '../components/screens/profile/PredictResults'

export default function predictresults() {
  return (
    <FlatList
      data={[]}
      renderItem={null}
      ListFooterComponent={() => (
        <>
          <PredictResults />
        </>
      )}
    />
  )
}