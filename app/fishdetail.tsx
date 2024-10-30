import { View, Text, FlatList } from 'react-native'
import React from 'react'
import FishDetail from '../components/screens/profile/FishDetail'

export default function editprofile() {
  return (
    <FlatList
      data={[]}
      renderItem={null}
      ListFooterComponent={() => (
        <>
          <FishDetail />
        </>
      )}
    />
  )
}