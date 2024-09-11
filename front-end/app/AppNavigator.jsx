// AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainPage from './pages/MainPage';
import TabNavigator from './contents/Navigator';
import { UserProvider } from './UserContext';  
 
import VideoPlayerScreen from './contents/VideoPlayerScreen';
import VideoPlayer from './contents/VideoPlayer ';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <UserProvider>
    
        <Stack.Navigator initialRouteName="MainPage">
          <Stack.Screen name="MainPage" component={MainPage} options={{ headerShown: false }} />
      
          <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
          <Stack.Screen name="VideoPlayerScreen" component={VideoPlayerScreen} />
          
        </Stack.Navigator>
    
    </UserProvider>
  );
};

export default AppNavigator;
