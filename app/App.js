import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Icons from https://icons.expo.fyi/ 

import { Camera } from './components/camera';
import { Portfolio } from './components/portfolio';
import { Post } from './components/post';
import { Settings } from './components/settings';
import { Upload } from './components/upload';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Navigator for camera and upload
const PostNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Post" component={Post} options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen name="Camera" component={Camera}></Stack.Screen>
      <Stack.Screen name="Upload" component={Upload}></Stack.Screen>
    </Stack.Navigator>
  );
}

// Tabnavigator for app
const AppNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{tabBarShowLabel: false, tabBarActiveTintColor: 'rgb(35, 166, 218)' }}>
      <Tab.Screen 
        name="Portfolio" 
        component={Portfolio} 
        options={{
          tabBarIcon: ({color}) => {return( <Ionicons name="briefcase" color={color} size={24}></Ionicons>) }
        }}
      ></Tab.Screen>
      <Tab.Screen 
        name="Add to portfolio" 
        component={PostNavigator} 
        options={{ 
          tabBarIcon: ({color}) => {return( <Ionicons name="add-circle" color={color} size={36}></Ionicons>) },
          headerShown: false
        }}
      ></Tab.Screen>
      <Tab.Screen 
        name="Settings" 
        component={Settings} 
        options={{
          tabBarIcon: ({color}) => {return( <Ionicons name="settings-sharp" color={color} size={24}></Ionicons>) }
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
