import React from 'react';
import Realm from 'realm';
import {View, Text, Pressable, StyleSheet} from 'react-native';

import {shadows} from '../styles/shadows';
import colors from '../styles/colors';
import {Task} from '../models/Task';
import {Customer} from '../models/Task';
import {Order} from '../models/Task';

type OrderItemProps = {
  arr: Order & Realm.Object
  onClick: (arr : Order & Realm.Object) => void
  onToggleStatus: (order: Order & Realm.Object) => void
  onDeleteOrder : (order: Order & Realm.Object) => void
};

export const OrderItem = React.memo<OrderItemProps>(
  ({arr,onClick,onToggleStatus,onDeleteOrder}) => {

    return (
    <View style={styles.orders }>
      <Pressable style={styles.descriptionContainer} onPress={ev=>onClick(arr)} >
            <Text style={styles.text}>
            Name : {arr.name} 
            {"\n"}
            Order Placed on : 
            {"\n"}
            {arr.createdAt.toDateString()}
            {"\n"}
            Estimated Date :
            {"\n"}
            {arr.estimatedDate.toDateString()}
            </Text>
            <Pressable
              onPress={ev=>onDeleteOrder(arr)}
              >
            <Text style={[styles.delete]}>Delete Order</Text>
      </Pressable>
      </Pressable>
      <Pressable
        onPress={ev=>onToggleStatus(arr)}
        style={[styles.status, arr.isComplete  && styles.completed]}>
        <Text style={styles.icon}>{arr.isComplete  ? '✓' : '○'}</Text>
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
  customerName:{
    paddingHorizontal: 10,
    color: colors.black,
    fontWeight:"bold",
    fontSize: 26,
  },
  delete: {
    width:100,
    backgroundColor: colors.darkRed,
    borderRadius:5,
    paddingVertical:10,
    paddingHorizontal:5,
    marginLeft:8,
    color:colors.gray,
    justifyContent:"center",
    textAlign:"center"
  },
  orders: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    marginVertical: 8,
    marginHorizontal:8,
    paddingVertical: 8,
    backgroundColor: colors.white,
    borderRadius: 5,
    ...shadows,
  },
  text: {
    paddingLeft: 10,
    fontSize:16,
  },
  descriptionContainer: {
  flex: 1,
  justifyContent: 'center',
  },
  description: {
    color: colors.black,
    fontSize: 14,
  },
  status: {
    width:50,
    marginRight:8,
    paddingVertical: 8,
    justifyContent: 'center',
    borderRadius:5,
    backgroundColor: colors.gray,
  },
  completed: {
    backgroundColor: colors.purpleDark,
  },
  icon: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
}); 

