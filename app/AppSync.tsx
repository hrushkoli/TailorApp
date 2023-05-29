import React, {useCallback, useEffect, useMemo} from 'react';
import {useApp, useUser} from '@realm/react';
import {Pressable, StyleSheet, Text} from 'react-native';

import { Ionicons } from "@expo/vector-icons";
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";

import {Task} from './models/Task';
import {TaskRealmContext} from './models';
import {TaskManager} from './components/TaskManager';
import {buttonStyles} from './styles/button';
import {shadows} from './styles/shadows';
import colors from './styles/colors';
import {OfflineModeButton} from './components/OfflineModeButton';

import HomeScreen from "./screens/HomeScreen"
import SearchScreen from "./screens/SearchScreen"
import HistoryScreen from "./screens/HistoryScreen"
import CreateNewUser from "./screens/activities/CreateNewUser"
import ExistingUser from "./screens/activities/ExistingUser"


import {Customer,Note,Order,Sayya,Pyjama,Kurta} from './models/Task'


const {useRealm, useQuery} = TaskRealmContext;

export const AppSync: React.FC = () => {
  const realm = useRealm();
  const user = useUser();
  const app = useApp();
  const result = useQuery(Task);

  const tasks = useMemo(() => result.sorted('createdAt'), [result]);
  const Stack =  createStackNavigator() ;
  const homeName = "Home"
  const searchName = "Search"
  const historyName = "History"
  const createNewUserName= "Create New User"
  const existingUserName = "Existing User"
  const Tab = createBottomTabNavigator();

  const {useRealm} = TaskRealmContext;
  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.add(realm.objects(Customer));
      mutableSubs.add(realm.objects(Note));
      mutableSubs.add(realm.objects(Order));
      mutableSubs.add(realm.objects(Sayya));
      mutableSubs.add(realm.objects(Pyjama));
      mutableSubs.add(realm.objects(Kurta));
    });
  }, []);

  const HomeNavigation = () => {
      return(
          <Stack.Navigator initialRouteName={homeName}>    
               <Stack.Screen name={homeName} component={HomeScreen}/>
               <Stack.Screen name={createNewUserName} component={CreateNewUser}/>
               <Stack.Screen name={existingUserName} component={ExistingUser}/>
          </Stack.Navigator>
      )
    }

    const SearchNavigation = () => {
      return(
          <Stack.Navigator initialRouteName={searchName}>    
               <Stack.Screen name={searchName} component={SearchScreen}/>
          </Stack.Navigator>
      )
    }

    const HistoryNavigation = () => {
      return(
          <Stack.Navigator initialRouteName={historyName}>    
               <Stack.Screen name={historyName} component={HistoryScreen}/>
          </Stack.Navigator>
      )
    }


  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.add(realm.objects(Task));
    });
  }, [realm, result]);

  const handleLogout = useCallback(() => {
    user?.logOut();
  }, [user]);

  console.log("user?.id is : ",user?.id)

  return (
    <>
      <Text style={styles.idText}>Syncing with app id: {app.id}</Text>
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
					} else if (rn === "Taskmg2"){
						iconName = focused ? 'search' : 'search-outline';
					} else if (rn === historyName){
						iconName = focused ? 'list' : 'list-outline';
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
      <Tab.Screen name="Taskmg2" 
        children={()=><TaskManager tasks={tasks} userId={user?.id}/>}
        />
      <Tab.Screen name={historyName} 
        children={()=><HistoryNavigation/>}
        />
    </Tab.Navigator>
    </NavigationContainer>

      <Pressable style={styles.authButton} onPress={handleLogout}>
        <Text
          style={styles.authButtonText}>{`Logout ${user?.profile.email}`}</Text>
      </Pressable>
      <OfflineModeButton />
    </>
  );
};

const styles = StyleSheet.create({
  idText: {
    color: '#999',
    paddingHorizontal: 20,
  },
  authButton: {
    ...buttonStyles.button,
    ...shadows,
    backgroundColor: colors.purpleDark,
  },
  authButtonText: {
    ...buttonStyles.text,
  },
});
