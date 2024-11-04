import HeaderCompetition from '@/components/screens/Staff/HeaderCompetition'
import React from 'react'
import { FlatList } from 'react-native'

export default function profile() {
  return (

    <FlatList
      data={[]}
      renderItem={null}
      ListFooterComponent={() => (
        <HeaderCompetition />
      )}
    />
  )
}