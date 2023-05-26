import React from 'react';
import Realm from 'realm';
import {View, Text, Pressable, StyleSheet} from 'react-native';

import {shadows} from '../styles/shadows';
import colors from '../styles/colors';
import {Task} from '../models/Task';
import {Customer} from '../models/Task';
import {Order} from '../models/Task';
import {TaskRealmContext} from '../models';

type MeasurementHeaderProps = {
  routeParam: Order & Realm.Object
  onToggleStatus: (order: Order & Realm.Object) => void
};

const {useRealm,useObject} = TaskRealmContext;

export const MeasurementHeader = React.memo<MeasurementHeaderProps>(
  ({routeParam,onToggleStatus}) => {
    
    return (
    <View style={{flexDirection: 'row',marginBottom:20}}>
      <View>
      <Text style={styles.orderName}>
       {routeParam.name}
      </Text>
      <Text style={styles.text}>
       Created At : {routeParam.createdAt.toDateString()}
      </Text >
      <Text style={styles.text}>
       Address: {routeParam.estimatedDate.toDateString()}
      </Text>
      <Text style={styles.text}>
       Ordered by: {routeParam.linkingObjects("Customer","orders")[0].name}
      </Text>
      <Text style={styles.text}>
       Contact : {routeParam.linkingObjects("Customer","orders")[0].contact}
      </Text>
      <Text style={styles.text}>
       Customer ID: {routeParam.linkingObjects("Customer","orders")[0].customerId}
      </Text>
      </View>
      <Pressable
        onPress={ev=>onToggleStatus(routeParam)}
        style={[styles.status, routeParam.isComplete  && styles.completed]}>
      <Text style={styles.icon}>{routeParam.isComplete  ? '✓' : '○'}</Text>
      </Pressable>
    </View>

    );
  },
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection:'column',
    maxWidth:"100%",
    paddingHorizontal:10
  },
  orderName:{
    paddingHorizontal: 10,
    color: colors.black,
    fontWeight:"bold",
    fontSize: 26,
  },
  text: {
    paddingLeft: 10,
    fontSize:16,
  },
  icon: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  status: {
    width:50,
    paddingVertical: 8,
    justifyContent: 'center',
    borderRadius:5,
    backgroundColor: colors.gray,
  },
  completed: {
    backgroundColor: colors.purpleDark,
  },

}); 
