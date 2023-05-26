import React, {useMemo} from 'react';

import { Ionicons } from "@expo/vector-icons";
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import {Task} from './models/Task';
import {TaskRealmContext} from './models';
import HomeScreen from "./screens/HomeScreen"
import HistoryScreen from "./screens/HistoryScreen"
import CreateNewUser from "./screens/activities/CreateNewUser"
import CreateNewOrderScreen from "./screens/CreateNewOrderScreen"
import ExistingUser from "./screens/activities/ExistingUser"
import AddLengths from "./screens/activities/AddLengths"

const {useQuery} = TaskRealmContext;
const Tab = createBottomTabNavigator();

export const AppNonSync = () => {
  const result = useQuery(Task);
  const Stack =  createStackNavigator() ;
  const homeName = "Home "
  const searchName = "Order History"
  const historyName = "Customers   "
  const createNewUserName= "Create New User"
  const existingUserName = "Orders"
  const addLengthsName = "Measurements"

  const HomeNavigation = () => {
      return(
          <Stack.Navigator initialRouteName={homeName}>    
               <Stack.Screen name={homeName} component={HomeScreen}/>
               <Stack.Screen name={createNewUserName} component={CreateNewUser}/>
          </Stack.Navigator>
      )
    }


    const HistoryNavigation = () => {
      return(
          <Stack.Navigator initialRouteName={historyName}>    
               <Stack.Screen name={historyName} component={HistoryScreen}/>
               <Stack.Screen name={existingUserName} component={ExistingUser}/>
               <Stack.Screen name={addLengthsName} component={AddLengths}/>
          </Stack.Navigator>
      )
    }

    const SearchNavigation = () => {
      return(
          <Stack.Navigator initialRouteName={searchName}>    
               <Stack.Screen name={searchName} component={CreateNewOrderScreen}/>
               <Stack.Screen name={addLengthsName} component={AddLengths}/>
          </Stack.Navigator>
      )
    }


  return(
    <>
    <NavigationContainer>
    <Tab.Navigator 
    initialRouteName="TaskManager"
			screenOptions= {({route}) => ({
				headerShown:false,	
				tabBarIcon: ({focused,size}) => {
					let iconName;
					let rn = route.name;

					if(rn === homeName){
						iconName = focused ? 'home' : 'home-outline';
					} else if (rn === searchName){
						iconName = focused ? 'list' : 'list-outline';
					} else if (rn === historyName){
						iconName = focused ? 'person' : 'person-outline';
					}
					return <Ionicons name={iconName} size={size} />
				},
				tabBarStyle: {
					padding:10,
					margin:10,
					height:70,
					borderRadius:10,
				},
				tabBarActiveTintColor:"black",
				tabBarItemStyle:{
					margin:10,
					padding:0
				},
			})}
    >
      <Tab.Screen name={homeName} 
        children={()=><HomeNavigation/>}
        />
      <Tab.Screen name={historyName} 
        children={()=><HistoryNavigation/>}
        />
      <Tab.Screen name={searchName}
        component={SearchNavigation}
        />
    </Tab.Navigator>
    </NavigationContainer>
    </>
  );
};
