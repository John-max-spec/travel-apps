
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import { syncQueue } from './utils/offlineQueue';
import { BASE_URL } from './utils/config';

import Home from './pages/Home';
import TravelForm from './components/TravelForm';
import TravelList from './components/TravelList';
import EditTripPage from './pages/EditTripPage';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    const sync = async () => {
      await syncQueue(BASE_URL, axios);
    };
    sync();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="TravelForm" component={TravelForm} />
        <Stack.Screen name="TravelList" component={TravelList} />
        <Stack.Screen name="EditTripPage" component={EditTripPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}