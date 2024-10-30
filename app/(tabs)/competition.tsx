import React from 'react'
import { FlatList } from 'react-native'
import CompetitionHomePage from '../competition'

export default function profile() {
  return (

    <FlatList
      data={[]}
      renderItem={null}
      ListFooterComponent={() => (
        <CompetitionHomePage />
      )}
    />
  )
}