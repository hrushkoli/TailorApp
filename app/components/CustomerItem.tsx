import React from 'react';
import Realm from 'realm';
import {View, Image, Text, Pressable, StyleSheet} from 'react-native';

import {shadows} from '../styles/shadows';
import colors from '../styles/colors';
import {Task} from '../models/Task';
import {Customer} from '../models/Task';

type CustomerItemProps = {
  customers: Customer & Realm.Object
  onClick: (customers : Customer & Realm.Object) => void
  onDeleteClick: (customer: Customer & Realm.Object) => void
};

export const CustomerItem = React.memo<CustomerItemProps>(
  ({customers,onClick,onDeleteClick}) => {
    return (
      <View style={styles.customer}>
        <Pressable 
        style={styles.descriptionContainer}
        onPress= {ev=>onClick(customers)}
        >
        <View>
          <Text style={styles.customerName}>
            {customers.name}
          </Text>
          <Text style={styles.description}>
            ({customers.address})
            {"\n"}
            ({customers.contact})
          </Text>
        </View>
        </Pressable>
          <Image
            source={{uri: customers.userImage}}
            style={{ width: 100, height: 100, justifyContent:"center",marginRight:8,borderRadius:5}}
          />
          <Pressable
            onPress={ev=>onDeleteClick(customers)}
            style={[styles.status,styles.delete]}>
            <Text style={styles.icon}>x</Text>
          </Pressable>
        
      </View>
    );
  },
);

const styles = StyleSheet.create({
  customer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    marginVertical: 8,
    marginHorizontal:8,
    paddingVertical: 8,
    backgroundColor: colors.white,
    borderRadius: 5,
    ...shadows,
  },
  delete: {
    backgroundColor: colors.darkRed,
  },
  customerName:{
    paddingHorizontal: 10,
    color: colors.black,
    fontSize: 22,
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  description: {
    paddingHorizontal: 10,
    color: colors.black,
    fontSize: 14,
  },
  status: {
    width: 30,
    height: 25,
    zIndex:100,
    justifyContent: 'center',
    paddingVertical:2,
    borderRadius: 5,
    backgroundColor: colors.gray,
  },
  completed: {
    backgroundColor: colors.purple,
  },
  deleteButton: {
    justifyContent: 'center',
  },
  deleteText: {
    marginHorizontal: 10,
    color: colors.gray,
    fontSize: 17,
  },
  icon: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
