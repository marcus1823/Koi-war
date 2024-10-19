import { View, FlatList } from 'react-native'
import React from 'react'
import Progress from '../components/screens/profile/Progress'

export default function progress() {
  return (
    <FlatList
      data={[]}
      renderItem={null}
      ListFooterComponent={() => (
        <>
          <Progress />
        </>
      )}
    />
  )
}