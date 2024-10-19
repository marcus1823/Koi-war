import { View, Text, FlatList } from 'react-native'
import React from 'react'
import FishProfile from '../components/screens/profile/FishProfile'

export default function fishprofile() {
  return (
    <FlatList
      data={[]}
      renderItem={null}
      ListFooterComponent={() => (
        <>
          <FishProfile />
        </>
      )}
    />
  )
}