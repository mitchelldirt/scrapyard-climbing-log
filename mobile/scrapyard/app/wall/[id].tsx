import { Image, StyleSheet, Text, StatusBar, TouchableOpacity, Pressable, FlatList, View } from 'react-native';
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
        sent: true,
        attempts: 6
    },
    {
        id: 3,
        color: 'blue',
        grade: '5.10-',
        sent: false,
        attempts: 4
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
    },
]

type routeRowProps = { id: number, color: string, grade: string, sent: boolean, attempts: number };

const RouteRow = ({ id, color, grade, sent, attempts }: routeRowProps) => (
    <Link push={true} href={{
        pathname: `route/[id]`,
        params: { id: id }
    }} asChild>
        <Pressable style={styles.row}>
            <View style={styles.sent}>
                {sent ? <Ionicons size={32} name={'checkbox'} style={{ color: 'green', marginRight: 10 }} /> : <Ionicons size={32} name={'square-outline'} style={{ color: 'red', marginRight: 10 }} />}
                <Text style={styles.title}>{grade}</Text>
            </View>
            <View style={styles.attempts}>
                {attempts > 0 ? <Text style={styles.title}>attempts: {attempts}</Text> : ''}
            </View>
        </Pressable>
    </Link>
);

export default function Wall() {
    let currentWall = useLocalSearchParams().title;

    // make sure current wall isn't an array
    if (Array.isArray(currentWall)) {
        currentWall = currentWall[0];
    }

    return (
        // TODO: replace with scrapyard logo
        <View>
            <Stack.Screen options={{ title: currentWall }} />
            <ThemedView style={styles.wallsContainer}>
                <FlatList
                    data={routes}
                    renderItem={({ item }) => <RouteRow id={item.id} color={item.color} grade={item.grade} sent={item.sent} attempts={item.attempts} />}
                    keyExtractor={item => item.id.toString()}
                    style={styles.stepContainer}
                />
            </ThemedView>
        </View>
    );
}

const styles = StyleSheet.create({
    wallsContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        width: '100%'
    },
    stepContainer: {
        gap: 8,
        marginBottom: 40,
        width: '100%'
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
    row: {
        width: '100%',
        padding: 20,
        backgroundColor: 'lightgray',
        borderRadius: 10,
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 32,
        textAlign: 'center'
    },
    sent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '30%'
    },
    attempts: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '70%'
    }
});
