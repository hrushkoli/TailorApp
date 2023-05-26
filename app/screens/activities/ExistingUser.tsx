import * as React from 'react';
import {TaskRealmContext} from '../../models';
import {Pressable,View,ScrollView,StyleSheet,Text,Image} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useState } from 'react';
import {Customer} from '../../models/Task';
import {Order} from '../../models/Task';
import {CustomerItem} from '../../components/CustomerItem';
import {OrderItem} from '../../components/OrderItem';
import { AddOrderForm } from '../../components/AddOrderForm';
import { UpdateMode } from 'realm';
import colors from "../../styles/colors"
import {shadows} from '../../styles/shadows';
import { NavigationRouteContext } from '@react-navigation/native';

const {useRealm,useObject} = TaskRealmContext;

export default function ExistingUser ({route,navigation}) {
  const realm = useRealm();
  const routeParam = route.params.customers
  const customer = useObject(Customer,routeParam._id)
  console.log("customer : ",customer)
  const [orderArr,setOrderArr] = useState([])

  const onAddOrder = (order:string,date:Date)=>{
    if (order){
      let realmOrder;
      const customerId = new Realm.BSON.ObjectID(customer._id)
      console.log("onAddOrder : ",order,date)
      try{
        realm.write(()=>{
          const q = `_id == ${customerId}`;
          let customerResults = realm.objectForPrimaryKey("Customer",customerId);
          realmOrder = realm.create("Order",new Order(realm, order, date),"modified");
          if(customer.orders){
            customerResults.orders.push(realmOrder)
            realm.create("Customer",customerResults,"modified")
          }
          else if(!customer.orders){
            let tempRealmOrder= [];
            tempRealmOrder.push(realmOrder)
            customerResults.orders = tempRealmOrder
            realm.create("Customer",customerResults,"modified")
          }
        })
        console.log("realmOrder: ",realmOrder)
        console.log("customer: ",customer)
        console.log("customer.orders : ",customer.orders)
        alert("Order Created")

      }catch(e){
          console.log(e)
        }

      }
  }

  
  const onToggleStatus = (order)=>{
    console.log("order : ",order)
    const orderId = new Realm.BSON.ObjectID(order._id)
    realm.write(
    ()=>{
        const selectedOrder = realm.objectForPrimaryKey("Order",orderId)
        selectedOrder.isComplete = !selectedOrder.isComplete
      }
    )
  }

  const onDeleteOrder= (order)=>{
    realm.write(()=>{
        console.log("thisss is arrr",order)
        realm.delete(order)
        alert("Order Deleted")
      })
   } 


  const navigateToLengths= (arr) =>{
    console.log("route : ",route)
    console.log("NavigationRouteContext : ",NavigationRouteContext)
    console.log("Navigation: ",navigation)
    console.log("Inside ExistingUser arr is : ",arr)
    navigation.navigate("Measurements",arr)
  }

  console.log("customer.orders",customer.orders)
  console.log("customer.keys",customer.orders.keys())

	return(
		<ScrollView style={styles.container}>
      <Image
        source={{uri: customer.userImage}}
        style={{ borderRadius:5,marginLeft:8, width: 200, height: 200, justifyContent:"center"}}
      />
      <Text style={styles.customerName}>
       {customer.name}
      </Text>

      <Text style={styles.text}>
       Customer ID : {customer.customerId}
      </Text>
      <Text style={styles.text}>
       Total Orders : {customer.orders.length}
      </Text>
      <Text style={styles.text}>
       Date of Birth: {customer.age}
      </Text >
      <Text style={styles.text}>
       Address: {customer.address}
      </Text>
      <Text style={styles.text}>
       Contact: {customer.contact}
      </Text>
      <View style={{paddingTop:12}}>
      <AddOrderForm 
      onSubmit={onAddOrder}/>

      {customer.orders.map((arr)=>(
          <OrderItem 
          onClick= {ev=>navigateToLengths(arr)}
          onToggleStatus={ev=>onToggleStatus(arr)}
          onDeleteOrder= {ev=>onDeleteOrder(arr)}
          arr={arr}/>
       ) 

      )}

      </View>
		</ScrollView>

	)	

}

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
