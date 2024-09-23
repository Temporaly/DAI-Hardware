/*import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import EmergencyNumberScreen from './EmergencyNumberScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="EmergencyNumber" component={EmergencyNumberScreen} />
  </Stack.Navigator>
);

const App = () => (
  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="index" component={HomeNavigator} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default App
*/
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import EmergencyNumberScreen from './EmergencyNumberScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import * as React from 'react';

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
      <Tab.Screen name="index" component={HomeScreen} />
    </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;