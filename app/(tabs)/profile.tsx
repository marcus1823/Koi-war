import { FlatList } from 'react-native'
import React from 'react'
import HeaderProfile from '../../components/screens/profile/HeaderProfile'
import BodyProfile from '../profile'

export default function profile() {
  return (

    <FlatList
      data={[]}
      renderItem={null}
      ListFooterComponent={() => (
        <>
        <HeaderProfile />

          <BodyProfile />
        </>
      )}
    />
  )
}