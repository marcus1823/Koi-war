import { FlatList } from 'react-native'
import React from 'react'
import HeaderProfile from '../../components/screens/profile/HeaderProfile'
import BodyProfile from '../../components/screens/profile/BodyProfile'
import FooterProfile from '../../components/screens/profile/FooterProfile'

export default function profile() {
  return (

    <FlatList
      ListHeaderComponent={() => (
        <>
          <HeaderProfile />
          <BodyProfile />
        </>
      )}
      data={[]}
      renderItem={null}
      ListFooterComponent={() => (
        <>
          <FooterProfile />
        </>
      )}
    />
  )
}