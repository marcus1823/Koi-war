import React from 'react';
import { FlatList } from 'react-native';
import HeaderHome from '../../components/screens/home/HeaderHome';
import IntroHome from '../../components/screens/home/IntroHome';

export default function Home() {

  return (
    <FlatList
      data={[]}
      renderItem={null}
      ListFooterComponent={() => (
        <>
          <HeaderHome />
          <IntroHome />
        </>
      )}
    />
  );
}
