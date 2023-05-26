import React from 'react';
import Realm from 'realm';
import {View, Text, Pressable, StyleSheet} from 'react-native';

import {shadows} from '../styles/shadows';
import colors from '../styles/colors';
import {Item, Task} from '../models/Task';
import {Customer} from '../models/Task';
import {Order} from '../models/Task';

type KurtaItemProps = {
  arr: Item & Realm.Object
  onDelete: (order: Item & Realm.Object) => void
};

export const KurtaItem = React.memo<KurtaItemProps>(
  ({arr,onDelete}) => {
    console.log("Inside LengthItem : arr is ",arr)
    return (
    <View style={styles.orders }>
      <Pressable style={styles.descriptionContainer} >
            <Text style={styles.text}>
            Kurta Type : {arr.type} 
            {"\n"}
            Length : 
            {arr.length}
            {"\n"}
            Shoulders : 
            {arr.shoulders}
            {"\n"}
            Sleeve : 
            {arr.sleeve}
            {"\n"}
            Chest : 
            {arr.chest}
            {"\n"}
            Waist : 
            {arr.waist}
            {"\n"}
            Hip : 
            {arr.hip}
            {"\n"}
            Collar : 
            {arr.collar}
            {"\n"}
            Cost : 
            {arr.cost}
            {"\n"}
            </Text>
      </Pressable>
      <Pressable
        onPress={ev=>onDelete(arr)}
        style={[styles.status,styles.delete]}>
        <Text style={styles.icon}>x</Text>
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
  delete: {
    backgroundColor: colors.darkRed,
  },
  icon: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
}); 

