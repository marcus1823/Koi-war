import { View, Text, FlatList } from 'react-native'
import React from 'react'
import IsGoing from '../components/screens/profile/IsGoing'

export default function editprofile() {
  return (
    <FlatList
      data={[]}
      renderItem={null}
      ListFooterComponent={() => (
        <>
          <IsGoing />
        </>
      )}
    />
  )
}