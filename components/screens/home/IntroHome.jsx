import { View, Image, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import React from 'react';

const koiData = [
    {
        id: 'v1128n004',
        name: 'Hi Bekko',
        beforeImage: require('../../../assets/images/koiBefore1.png'), 
        afterImage: require('../../../assets/images/koiAfter1.png'),  
        beforeSize: 22.00,
        afterSize: 32.00
    },
    {
        id: 'v1128n005',
        name: 'Golden Corn',
        beforeImage: require('../../../assets/images/koiBefore2.png'),  
        afterImage: require('../../../assets/images/koiAfter2.png'),   
        beforeSize: 15.00,
        afterSize: 24.00
    },
    {
        id: 'v1128n007',
        name: 'Hi Bekko',
        beforeImage: require('../../../assets/images/koiBefore1.png'), 
        afterImage: require('../../../assets/images/koiAfter1.png'),  
        beforeSize: 22.00,
        afterSize: 32.00
    },{
        id: 'v1128n008',
        name: 'Hi Bekko',
        beforeImage: require('../../../assets/images/koiBefore1.png'), 
        afterImage: require('../../../assets/images/koiAfter1.png'),  
        beforeSize: 22.00,
        afterSize: 32.00
    },{
        id: 'v1128n009',
        name: 'Hi Bekko',
        beforeImage: require('../../../assets/images/koiBefore1.png'), 
        afterImage: require('../../../assets/images/koiAfter1.png'),  
        beforeSize: 22.00,
        afterSize: 32.00
    },
];

export default function IntroHome() {
    return (
        <ScrollView style={styles.container}>
            {/* Header Image with Overlay Text */}
            <View style={styles.imageContainer}>
                <Image
                    source={require('../../../assets/images/koi2.png')}
                    style={styles.image}
                />
                <View style={styles.textOverlay}>
                    <Text style={styles.text}>WAR KOI</Text>
                </View>
            </View>

            {/* Contest Title and Details */}
            <View style={styles.contentContainer}>
                <Text style={styles.mainTitle}>6th Annual Taniguchi Grow Out Contest</Text>
                <Text style={styles.subTitle}>CONTEST HAS ENDED - CHALLENGE AGAIN THIS WINTER!</Text>
                <Text style={styles.description}>At the ceremonies end top 6 contestants were selected by Mr. Taniguchi himself:</Text>

                {/* Contestants List */}
                <Text style={styles.contestantList}>1st Place - Mr. Craig Larson</Text>
                <Text style={styles.contestantList}>2nd Place - Mr. An Lam</Text>
                <Text style={styles.contestantList}>3rd Place - Mr. Steven Bellezza</Text>
                <Text style={styles.contestantList}>4th Place - Anthony Malone</Text>
                <Text style={styles.contestantList}>5th Place - Dan Files</Text>
                <Text style={styles.contestantList}>6th Place - Erwin Santos</Text>

                {/* Additional Info */}
                <Text style={styles.subTitle}>About the Grow out Contest</Text>

                <Text style={styles.description}>{'\u2022'} Win amazing prizes and watch your Tategoi grow!</Text>
                <Text style={styles.description}>{'\u2022'} Mr. Taniguchi raised them at his facility during the winter</Text>
                <Text style={styles.description}>{'\u2022'} The price included free boarding, free shipping from Japan to Hawaii, and free quarantine with KHV test</Text>
                <Text style={styles.description}>{'\u2022'} Mr. Taniguchi will judge the best Grow out koi</Text>
                <Text style={styles.description}>{'\u2022'} Kodama Koi Farm will host a ZOOM call to announce the winners and have a conversation with Mr. Taniguchi.</Text>

                {/* Before and After Section */}
                <Text style={styles.mainTitle}>All Taniguchi Grow Out Koi!</Text>
                <FlatList
                    data={koiData}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.koiCard}>
                            <View style={styles.koiImages}>
                                {/* Before Image */}
                                <View style={styles.koiSection}>
                                    <Text style={styles.koiLabel}>Before</Text>
                                    <Image source={item.beforeImage} style={styles.koiImage} />
                                </View>

                                {/* After Image */}
                                <View style={styles.koiSection}>
                                    <Text style={styles.koiLabel}>After</Text>
                                    <Image source={item.afterImage} style={styles.koiImage} />
                                </View>
                            </View>

                            {/* Koi Details */}
                            <Text style={styles.koiName}>{item.name} - koi #{item.id}</Text>
                            <Text style={styles.koiDetail}>Koi ID: {item.id}</Text>
                            <Text style={styles.koiDetail}>Before Size: {item.beforeSize}</Text>
                            <Text style={styles.koiDetail}>After Size: {item.afterSize}</Text>
                        </View>
                    )}
                    horizontal={false}
                    numColumns={2}    
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    imageContainer: {
        width: 430,
        height: 260,
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
        alignSelf: 'center',
        marginBottom: 20,
        marginTop: 20,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    textOverlay: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 12,
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    mainTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    subTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#cc0000',
    },
    description: {
        fontSize: 16,
        marginBottom: 15,
        color: '#555',
    },
    contestantList: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
        color: '#444',
    },
    koiCard: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        margin: 10,
    },
    koiImages: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    koiSection: {
        alignItems: 'center',
        flex: 1,
    },
    koiImage: {
        width: 70,
        height: 150,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    koiLabel: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    koiName: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 5,
        textAlign: 'center',
    },
    koiDetail: {
        fontSize: 14,
        color: '#555',
    },
});
