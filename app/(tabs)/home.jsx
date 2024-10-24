import { useRouter } from 'expo-router';
import React from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import HeaderHome from '../../components/screens/home/HeaderHome';
import IntroHome from '../../components/screens/home/IntroHome';

export default function Home() {
  const router = useRouter();

  return (
    <FlatList
      data={[]}
      renderItem={null}
      ListFooterComponent={() => (
        <>
          <HeaderHome />
          <IntroHome />
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
            <Text>Home</Text>
            <Button
              title="Go to Competitions"
              onPress={() => router.push(`/competition`)}
            />
          </View>
        </>
      )}
    />
  );
}
