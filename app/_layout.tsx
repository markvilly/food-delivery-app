import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import "./global.css";
import * as Sentry from '@sentry/react-native';
import useAuthStore from '@/store/auth.store';

Sentry.init({
  dsn: 'https://cd0125f4e8c300ee9294dcd86e13d541@o4509796853743616.ingest.de.sentry.io/4509796870651984',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});



export default Sentry.wrap(function RootLayout() {

  const {isLoading, fetchAuthenticatedUser} = useAuthStore()



  const [fontLoaded, error] = useFonts({
    
      "QuickSand-Bold": require('../assets/fonts/Quicksand-Bold.ttf'),
      "QuickSand-Medium": require('../assets/fonts/Quicksand-Medium.ttf'),
      "QuickSand-Regular": require('../assets/fonts/Quicksand-Regular.ttf'),
      "QuickSand-Semibold": require('../assets/fonts/Quicksand-Bold.ttf'),
      "QuickSand-Light": require('../assets/fonts/Quicksand-Light.ttf'),
  })
  useEffect(()=>{
    if(error) throw error
    if(fontLoaded) SplashScreen.hideAsync()
  },[fontLoaded, error])

  useEffect(()=>{
    fetchAuthenticatedUser()
  }, [])


  if(!fontLoaded || isLoading) return null 


  return <Stack screenOptions={{headerShown: false}}/>;
});