import { Button, View, Image, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

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
    }, {
        id: 'v1128n008',
        name: 'Hi Bekko',
        beforeImage: require('../../../assets/images/koiBefore1.png'),
        afterImage: require('../../../assets/images/koiAfter1.png'),
        beforeSize: 22.00,
        afterSize: 32.00
    }, {
        id: 'v1128n009',
        name: 'Hi Bekko',
        beforeImage: require('../../../assets/images/koiBefore1.png'),
        afterImage: require('../../../assets/images/koiAfter1.png'),
        beforeSize: 22.00,
        afterSize: 32.00
    },
];

export default function IntroHome() {

    const router = useRouter();

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
                <Text style={styles.mainTitle}>6th Annual Taniguchi{'\n'}Grow Out Contest</Text>
                
                <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>CONTEST HAS ENDED</Text>
                    <Text style={styles.nextContestText}>CHALLENGE AGAIN THIS WINTER!</Text>
                </View>

                <TouchableOpacity 
                    style={styles.competitionButton}
                    onPress={() => router.push(`/competition`)}
                >
                    <Text style={styles.buttonText}>Go to Competitions</Text>
                </TouchableOpacity>

                <View style={styles.winnerSection}>
                    <Text style={styles.winnerTitle}>Top 6 Contestants</Text>
                    <Text style={styles.winnerSubtitle}>Selected by Mr. Taniguchi himself:</Text>
                    
                    {/* Winners List */}
                    <View style={styles.winnersContainer}>
                        {[
                            { place: '1st', name: 'Mr. Craig Larson' },
                            { place: '2nd', name: 'Mr. An Lam' },
                            { place: '3rd', name: 'Mr. Steven Bellezza' },
                            { place: '4th', name: 'Anthony Malone' },
                            { place: '5th', name: 'Dan Files' },
                            { place: '6th', name: 'Erwin Santos' },
                        ].map((winner, index) => (
                            <View key={index} style={styles.winnerCard}>
                                <Text style={styles.winnerPlace}>{winner.place}</Text>
                                <Text style={styles.winnerName}>{winner.name}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>

            {/* Before and After Section */}
            <Text style={styles.mainTitle}>All Taniguchi Grow Out Koi!</Text>
            <FlatList
                data={koiData}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <View style={[
                        styles.koiCard,
                        index === koiData.length - 1 && koiData.length % 2 !== 0 && { marginRight: '50%' }
                    ]}>
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
                columnWrapperStyle={styles.columnWrapper}
                contentContainerStyle={styles.flatListContainer}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    imageContainer: {
        width: '100%',
        height: 260,
        overflow: 'hidden',
        position: 'relative',
        marginBottom: 20,
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
        backgroundColor: 'rgba(235, 116, 82, 0.8)',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 12,
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    mainTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#1a237e',
        textAlign: 'center',
        lineHeight: 40,
    },
    statusBadge: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    statusText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#d32f2f',
        marginBottom: 5,
    },
    nextContestText: {
        fontSize: 14,
        color: '#5C98BB',
        fontWeight: '600',
    },
    competitionButton: {
        backgroundColor: '#eb7452',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        marginVertical: 20,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    winnerSection: {
        backgroundColor: '#f8f9fa',
        borderRadius: 15,
        padding: 20,
        marginTop: 10,
    },
    winnerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a237e',
        textAlign: 'center',
        marginBottom: 5,
    },
    winnerSubtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    winnersContainer: {
        gap: 10,
    },
    winnerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    winnerPlace: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#eb7452',
        width: 50,
    },
    winnerName: {
        fontSize: 16,
        color: '#333',
        flex: 1,
        fontWeight: '500',
    },
    koiCard: {
        width: '47%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        margin: 8,
        borderRadius: 12,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    koiImages: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 10,
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
        marginBottom: 8,
        color: '#1a237e',
        fontSize: 16,
    },
    koiName: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 10,
        textAlign: 'center',
        color: '#1a237e',
    },
    koiDetail: {
        fontSize: 14,
        color: '#424242',
        textAlign: 'center',
        marginTop: 4,
    },
    flatListContainer: {
        paddingBottom: 20,
        paddingHorizontal: 10,
    },
    columnWrapper: {
        justifyContent: 'flex-start',
    },
});
