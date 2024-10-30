import { View, Text, FlatList } from 'react-native'
import React from 'react'
import Approve from '../components/screens/profile/Approve'

export default function editprofile() {
  return (
    <FlatList
      data={[]}
      renderItem={null}
      ListFooterComponent={() => (
        <>
          <Approve />
        </>
      )}
    />
  )
}