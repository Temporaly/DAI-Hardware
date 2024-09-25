import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import index from './index';
import NumberSetup from './NumberSetup';

export default function RootLayout() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="index" component={index} />
      <Tab.Screen name="NumberSetup" component={NumberSetup} />
    </Tab.Navigator>
  );
}
