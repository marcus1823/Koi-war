import { View, Text, FlatList } from 'react-native'
import React from 'react'
import EditProfile from '../components/screens/profile/EditProfile'

export default function editprofile() {
  return (
    <FlatList
      data={[]}
      renderItem={null}
      ListFooterComponent={() => (
        <>
          <EditProfile />
        </>
      )}
    />
  )
}