import { View, Text, FlatList } from 'react-native'
import React from 'react'
import WaittingApproval from '../components/screens/profile/WaittingApproval'

export default function editprofile() {
  return (
    <FlatList
      data={[]}
      renderItem={null}
      ListFooterComponent={() => (
        <>
          <WaittingApproval />
        </>
      )}
    />
  )
}