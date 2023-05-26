import * as React from 'react';
import {TaskRealmContext} from '../models';
import {Pressable,View,ScrollView,StyleSheet,Text} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useState } from 'react';
import {Customer} from '../models/Task';
import { OrderItem2 } from '../components/OrderItem2';
import colors from "../styles/colors"
const {useRealm} = TaskRealmContext;
	

export default function CreateNewOrderScreen({navigation}) {
  const [search,setSearch] = useState("")	
  const {useQuery} = TaskRealmContext;
  const realm = useRealm();

  const existingCustomers = useQuery(Customer)
  const [filteredCustomers,setFilteredCustomers] = useState(existingCustomers)

  const handleSearch = (value : string)=>{
    setSearch(value)
    const tempResults= existingCustomers.filter(x=>{
      return x.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    })
    setFilteredCustomers(tempResults)
  }

  const navigateToOrder = (customers)=>{
      navigation.navigate("Orders",{customers})
    }

  const onToggleStatus = (order)=>{
    const orderId = new Realm.BSON.ObjectID(order._id)
    realm.write(
    ()=>{
        const selectedOrder = realm.objectForPrimaryKey("Order",orderId)
        selectedOrder.isComplete = !selectedOrder.isComplete
      }
    )
  }
  const onDeleteOrder= (order)=>{
    alert("onDeleteOrder")
    realm.write(()=>{
        realm.delete(order)
        alert("Order Deleted")
      })
   } 

  const navigateToLengths= (arr) =>{
    navigation.navigate("Measurements",arr)
  }

	return(
	
		<>
    <SearchBar
      lightTheme
      showCancel
      round
      inputContainerStyle={{backgroundColor:"white"}}
      placeholder="Search Customer Name"
      value={search}
      onChangeText={(value : string)=>{handleSearch(value)}}
      />
		<ScrollView contentContainerStyle={{flexGrow: 1}} style={styles.container} >

    { (search) && ( 
      filteredCustomers.map((item)=>(
        item.orders.map(arr=>(
          <OrderItem2
          onClick= {ev=>navigateToLengths(arr)}
          onToggleStatus={ev=>onToggleStatus(arr)}
          onDeleteOrder={ev=>onDeleteOrder(arr)}
          arr={arr}/>

        ))
      ))
    ) }
    { !search && (
      existingCustomers.map((item)=>(
        item.orders.map(arr=>(
          
          <OrderItem2 
          onClick= {ev=>navigateToLengths(arr)}
          onToggleStatus={ev=>onToggleStatus}
          onDeleteOrder={ev=>onDeleteOrder}
          arr={arr}/>

        ))
      ))
    )
    }
		</ScrollView>
    </>

	)	

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    maxWidth:"100%",
    background:colors.white
  },
}); 
