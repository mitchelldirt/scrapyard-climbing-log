import { Image, StyleSheet, Text, StatusBar, TouchableOpacity, Pressable, FlatList } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link, useLocalSearchParams } from 'expo-router';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const routes = [
    {
        id: 1,
        color: 'green',
        grade: 'V0',
        sent: true,
        attempts: 3
    },
    {
        id: 2,
        color: 'red',
        grade: 'V1',
        sent: false,
        attempts: 0
    },
    {
        id: 3,
        color: 'blue',
        grade: 'V2',
        sent: false,
        attempts: 0
    },
    {
        id: 4,
        color: 'yellow',
        grade: 'V3',
        sent: false,
        attempts: 0
    },
    {
        id: 5,
        color: 'black',
        grade: 'V4',
        sent: false,
        attempts: 0
    },
    {
        id: 6,
        color: 'white',
        grade: 'V5',
        sent: false,
        attempts: 0
    },
    {
        id: 7,
        color: 'purple',
        grade: 'V6',
        sent: false,
        attempts: 0
    },
    {
        id: 8,
        color: 'orange',
        grade: 'V7',
        sent: false,
        attempts: 0
    },
    {
        id: 9,
        color: 'pink',
        grade: 'V8',
        sent: false,
        attempts: 0
    },
    {
        id: 10,
        color: 'seafoam',
        grade: 'V9',
        sent: false,
        attempts: 0
    }
]

type routeRowProps = { id: number, color: string, grade: string };

const RouteRow = ({ id, color, grade }: routeRowProps) => (
    <Link href={{
        pathname: `route/[id]`,
        params: { id: id }
    }} asChild>
        <Pressable style={styles.item}>
            <div>
                <Ionicons size={28} name={'checkbox'} />;
            </div>
            <div>
                <Text style={styles.title}>{grade}</Text>
            </div>
            <div>

            </div>
        </Pressable>
    </Link>
);

export default function HomeScreen() {
    let currentWall = useLocalSearchParams().title;

    // make sure current wall isn't an array
    if (Array.isArray(currentWall)) {
        currentWall = currentWall[0];
    }

    return (
        // TODO: replace with scrapyard logo
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                <Image
                    source={require('@/assets/images/partial-react-logo.png')}
                    style={styles.reactLogo}
                />
            }>

            <Stack.Screen options={{ title: 'V0 Slab' }} />
            <ThemedView style={styles.wallsContainer}>
                <FlatList
                    data={routes}
                    renderItem={({ item }) => <RouteRow id={item.id} color={item.color} grade={item.grade} />}
                    keyExtractor={item => item.id.toString()}
                    style={styles.stepContainer}
                />
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    wallsContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 40,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
    wallContainer: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        minHeight: 150,
        width: '40%',
        display: 'flex',
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        textAlign: 'center'
    },
});
