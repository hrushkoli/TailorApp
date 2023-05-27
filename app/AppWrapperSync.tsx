import React from 'react';
import {AppProvider, UserProvider} from '@realm/react';
import {SafeAreaView, StyleSheet} from 'react-native';

import {TaskRealmContext} from './models';
import {LoginScreen} from './components/LoginScreen';
import colors from './styles/colors';
import {AppSync} from './AppSync';
import {AppNonSync} from './AppNonSync';

export const AppWrapperSync: React.FC<{
  appId: string;
}> = ({appId}) => {
  const {RealmProvider} = TaskRealmContext;

  // If we are logged in, add the sync configuration the the RealmProvider and render the app
  return (
    <SafeAreaView style={styles.screen}>
      <AppProvider id={appId}>
        <UserProvider fallback={LoginScreen}>
          <RealmProvider
            sync={{
              flexible: true,
              onError: error => console.error(error)
              }}>
            <AppNonSync />
          </RealmProvider>
        </UserProvider>
      </AppProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default AppWrapperSync;
