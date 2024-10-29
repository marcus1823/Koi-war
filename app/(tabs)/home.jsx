import { useRouter } from "expo-router";
import React from "react";
import { Button, FlatList, Text, View } from "react-native";
import HeaderHome from "../../components/screens/home/HeaderHome";
import IntroHome from "../../components/screens/home/IntroHome";
import Menu from "../../components/screens/home/MenuHome";
import NewContests from "../../components/screens/home/NewContests";
export default function Home() {
  const router = useRouter();

  return (
    <FlatList
      data={[]}
      renderItem={null}
      ListFooterComponent={() => (
        <>
          <View style={{ backgroundColor: "#f9f9f9" }}>
            <HeaderHome />
            <IntroHome />
          </View>

          <View>
            <Menu />
            <NewContests />

            {/* <Text>Home</Text>
            <Button
              title="Go to Competitions"
              onPress={() => router.push(`/competition`)}
            /> */}
          </View>
        </>
      )}
    />
  );
}
