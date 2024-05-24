import { Image, StyleSheet, Text, StatusBar, TouchableOpacity, Pressable } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';

const walls = [
  [
    {
      title: 'slab',
      id: 'slab'
    },
    {
      title: 'cone',
      id: 'cone'
    },
  ],
  [
    {
      title: '35',
      id: '35&deg;'
    },
    {
      title: 'cave',
      id: 'cave'
    }
  ],
  [
    {
      title: 'top rope',
      id: 'top-rope'
    },
    {
      title: 'route of the week',
      id: 'rotw'
    }
  ],
  [
    {
      title: 'cove',
      id: 'cove'
    }
  ]
]

type ItemProps = { title: string, id: string };

const handlePress = (id: string) => {

}

const Item = ({ title, id }: ItemProps) => (
  <Link push={true} href={{
    pathname: `wall/[id]`,
    params: { id: id, title: title }
  }} asChild>
    <TouchableOpacity style={styles.item} onPress={() => handlePress(id)}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  </Link>
);

export default function HomeScreen() {
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
      <ThemedView style={styles.wallsContainer}>

        {walls.map((wall, key) => {
          return (
            <ThemedView key={key} style={styles.wallContainer}>
              <Item title={wall[0].title} id={wall[0].id} />

              {wall[1] && <Item title={wall[1].title} id={wall[1].id} />}
            </ThemedView>
          )
        })}
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
