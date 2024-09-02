import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Dashboard from './Dashboard';
import Journey from './Journey';
import Courses from './Courses';
 
import { useUser } from '../UserContext'; // Import useUser
import Profile from './Profile';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { userId } = useUser();  

  console.log('User ID in TabNavigator:', userId);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Journey') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Courses') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline'; // Use profile icon
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          backgroundColor: '#e5f6e0',
          borderTopColor: '#004d00',
          borderTopWidth: 1,
        },
      })}
      tabBarOptions={{
        activeTintColor: '#004d00',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Dashboard">
        {(props) => <Dashboard {...props} userId={userId} />}
      </Tab.Screen>
      <Tab.Screen name="Journey">
        {(props) => <Journey {...props} userId={userId} />}
      </Tab.Screen>
      <Tab.Screen name="Courses">
        {(props) => <Courses {...props} userId={userId} />}
      </Tab.Screen>
      <Tab.Screen name="Profile">
        {(props) => <Profile {...props} userId={userId} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabNavigator;
