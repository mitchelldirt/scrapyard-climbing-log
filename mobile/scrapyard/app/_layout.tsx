import { DarkTheme, DefaultTheme, NavigationContainer, Route, ThemeProvider, useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useLocalSearchParams } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const params = useLocalSearchParams();
  let idParam = params.id;

  // if (typeof idParam !== 'string') {
  //   throw new Error('idParam must be a string');
  // }

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false, title: "Home" }} />
        <Stack.Screen name="+not-found" />
        {/* <Stack.Screen name="wall/[id]" options={{ title: 'wall' }} /> */}
      </Stack>
    </ThemeProvider>
  );
}
