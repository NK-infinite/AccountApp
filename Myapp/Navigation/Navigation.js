import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Text } from 'react-native';
import SplashScreen from '../screens/SplashScreen';
import MangeAccountScreen from '../screens/MangeAccountScreen';
import TransactionTableScreen from '../screens/TransactionTableScreen';
import Settings from '../screens/Settings';
import EditTransactionScreen from '../screens/EditTransactionScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import { Image } from 'react-native';
import AnalyticsDetailScreen from '../screens/AnalyticsDetailScreen'
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator (Tabs inside)
const MainTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="TransactionTableScreen"
        component={TransactionTableScreen}
        options={({ navigation }) => ({
          tabBarLabel: 'Transaction',
          tabBarShowLabel: false,
          title: 'Transaction Table',
          tabBarIcon: ({ }) => (
            <Image
              source={require('../assets/Financial_Transaction_Flow_Icon-Copy.png')}
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: 25, height: 26, }}
            />
          ),

          headerStyle: {
            backgroundColor: '#007bff',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          // headerRight: () => (
          //   <TouchableOpacity
          //     onPress={() => navigation.navigate('EditTransactionScreen', { transaction: {} })}
          //     style={{ marginRight: 10 }}
          //   >
          //     <Text style={{ color: '#fff', fontWeight: 'bold' }}>Edit Data</Text>
          //   </TouchableOpacity>
          // ),
        })}
      />

      <Tab.Screen
        name="MangeAccountScreen"
        component={MangeAccountScreen}
        options={{
          title: 'Manage Account',
          tabBarShowLabel: false,
          tabBarIcon: ({ }) => (
            <Image
              source={require('../assets/Income_and_Expense_Icon.png')}
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: 24, height: 25, }}
            />
          ),
          headerStyle: {
            backgroundColor: '#007bff',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name='Analytics'
        component={AnalyticsScreen}
        options={{
          headerShown: true,
          tabBarShowLabel: false,
          headerTitle:'Analytics',
          headerTitleAlign:'center',
         headerStyle:{
           backgroundColor:'#007bff',
          },
          headerTintColor:'#fff',
          tabBarIcon: ({ }) => (
            <Image
              source={require('../assets/pie_chart.png')}
              style={{ height: 24, width: 25 }}
            />
          )

        }}
      >
      </Tab.Screen>
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarShowLabel: false,
          title: 'Settings',
          tabBarIcon: ({ }) => (
            <Image
              source={require('../assets/Setting_icon.png')}
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: 24, height: 25, }}
            />
          ),
          headerStyle: {
            backgroundColor: '#007bff',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
        }} />


    </Tab.Navigator>

  );
};

// Root Navigation (Stack with Splash + Tabs + other stack screens)
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeTabs" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="EditTransactionScreen" component={EditTransactionScreen}
          options={{
            headerTintColor: '#fff',
            title: 'Edit Transaction',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#007bff',
            }
          }} />
          <Stack.Screen
          name='AnalyticsDetailScreen'
         component={AnalyticsDetailScreen}
          options={{
          headerStyle: {
            backgroundColor: '#007bff',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
        }} 
         />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
