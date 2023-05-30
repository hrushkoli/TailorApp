import * as React from 'react';
import {TaskRealmContext} from '../models';
import {Pressable,View,ScrollView,StyleSheet,Text} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useState } from 'react';
import {Customer} from '../models/Task';
import {CustomerItem} from '../components/CustomerItem';

const {useRealm} = TaskRealmContext;
	

export default function HistoryScreen ({navigation}) {
  const [search,setSearch] = useState("")	
  const {useQuery} = TaskRealmContext;
  const realm = useRealm();

  const existingCustomers= useQuery(Customer)
  const [filteredCustomers,setFilteredCustomers] = useState(existingCustomers)

  const handleSearch = (value : string)=>{
    setSearch(value)
    const tempResults= existingCustomers.filter(x=>{
      return x.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    })
    setFilteredCustomers(tempResults)
  }

  const navigateToOrder = (customers)=>{
      try{
        navigation.navigate("Orders",{customers})
      }catch(e){alert(e)}
    }
  
  const onDeleteClick= (customers)=>{
      try{
        realm.write(()=>{
            realm.delete(customers)
            alert("Customer Deleted")
          })
      }catch(e){alert(e)}
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
		<ScrollView style={styles.container}>

    { (search) && ( 
      filteredCustomers.map((item)=>(
        <CustomerItem 
        onClick= {navigateToOrder}
        onDeleteClick = {onDeleteClick}
        customers={item}/>
      ))
    ) }
    { !search && (
      existingCustomers.map((item)=>(
        <CustomerItem 
        onClick= {navigateToOrder}
        onDeleteClick = {onDeleteClick}
        customers={item}/>
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
    backgroundColor: '#fff',
    flexDirection:'column',
    maxWidth:"100%"
  },
}); 
