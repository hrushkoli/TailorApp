import * as React from 'react';
import {Pressable,View,StyleSheet,Text, ScrollView ,TextInput} from 'react-native';
import { useState } from 'react';
const {useRealm} = TaskRealmContext;
import {Customer, Order} from '../../models/Task';
import {TaskRealmContext} from '../../models';
// import {insertNewCustomer} from '../../../databases/allschemas';

export default function CreateNewOrder  ({route})  
{
  const {useObject,useQuery} = TaskRealmContext;
	const [name,setName] = useState("");
	const [age,setAge] = useState("");
	const [contact,setContact] = useState<number>();
	const [address,setAddress] = useState("");
	const [notification,setNotification] = useState("");

  const realm = useRealm();
  
  const handleCreate= () => {
      console.log("tried to call realm write")
      realm.write(() => {
        console.log("realm.write")
        setNotification("Customer Created ")
       realm.create(
        "Customer",
        new Customer(realm, name, age,contact,address,[])
        )
      });
  };
        console.log(useQuery(Customer))
        console.log("Orders",useQuery(Order))

	return(

  <ScrollView contentContainerStyle={{flexGrow: 1}}>
		<View style={styles.container}>
			<TextInput style={styles.textInput} placeholder="Name" autoComplete='name' onChangeText={value=>{setName(value)}} value={name}/>
			<TextInput style={styles.multilineTextInput} placeholder="Address" autoComplete='street-address' multiline onChangeText={value=>{setAddress(value)}} value={address}/>
			<TextInput style={styles.textInput} placeholder="Year of Birth" onChangeText={value=>{setAge(value)}} value={age}/>
			<TextInput style={styles.textInput} placeholder="Contact Number" autoComplete='tel'
      inputMode='tel' onChangeText={value=>{
        let tempVal = Number(value);
        setContact(tempVal)}} 
        />
		<Pressable style={styles.button} onPress={ev=>handleCreate}> 
		  <Text style={styles.text}>Create</Text>
		</Pressable>			
    <Text>
    {notification}
    </Text>
		</View>
		</ScrollView>

	)	

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    backgroundColor: 'black',
    marginTop:5,
    marginBottom:5,
    borderRadius:10,
    width:200
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  textInput: {
	  marginTop:5,
	  marginBottom:5,
	  width: 250,
	  height: 56,
	  borderRadius: 4,
	  padding:10,
	  backgroundColor: "#ababab",
	  opacity: 0.2,
	  color:"black",
  },
  multilineTextInput: {
	  marginTop:5,
	  marginBottom:5,
	  width: 250,
	  borderRadius: 4,
	  borderColor: "black",
	  padding:10,
	  backgroundColor: "#ababab",
	  color:"black",
	  opacity: 0.2,
  },
});

