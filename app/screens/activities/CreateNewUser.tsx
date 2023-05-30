import * as React from 'react';
import { Button, Image,Pressable,View,StyleSheet,Text, ScrollView ,TextInput} from 'react-native';
import { useState, useEffect } from 'react';
const {useRealm} = TaskRealmContext;
import {Customer} from '../../models/Task';
import {TaskRealmContext} from '../../models';
import colors from "../../styles/colors"
import * as ImagePicker from 'expo-image-picker';

export default function CreateNewUser  ({route})  
{
  const {useQuery} = TaskRealmContext;
	const [name,setName] = useState("");
	const [age,setAge] = useState("");
	const [contact,setContact] = useState<number>();
	const [address,setAddress] = useState("");
  const [notification,setNotification] = useState("");
  const [pickerResult, setPickerResult] = useState<ImagePickerResult>();

  const _pickImg = async () => {
    await ImagePicker.requestCameraPermissionsAsync()
    await ImagePicker.getCameraPermissionsAsync()
    setPickerResult(await ImagePicker.launchCameraAsync({
      base64: true,
      allowsEditing: false,
      aspect: [4, 3],
    })).then((data)=>console.log("pickerResult",pickerResult,"data",data))
  };
  const _pickImgLibrary = async () => {
    await ImagePicker.requestMediaLibraryPermissionsAsync()
    await ImagePicker.getMediaLibraryPermissionsAsync()
    setPickerResult(await ImagePicker.launchImageLibraryAsync({
      base64: true,
      allowsEditing: false,
      aspect: [4, 3],
    })).then((data)=>console.log("pickerResult",pickerResult,"data",data))
  };

  let imageUri = pickerResult ? `data:image/jpg;base64,${pickerResult.base64}` : null;
  imageUri && console.log({uri: imageUri.slice(0, 100)});

  const realm = useRealm();
  console.log("list of subscriptions:",realm.subscriptions)
  
  const handleCreate= () => {
      console.log("tried to call realm subs")
      try{
        realm.write(() => {
          realm.create(
            "Customer",
            new Customer(realm, name, age,contact,address,imageUri),
            "modified"
          )
          setNotification("Customer Created ")
          alert("Customer Created")
        })

      }
      catch(e){
          alert(e)
        }


  };


  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.add(realm.objects(Customer));
    });
  }, [realm, Customer]);



  console.log(useQuery(Customer))

	return(

  <ScrollView contentContainerStyle={{flexGrow: 1}}>
		<View style={styles.container}>
      <Pressable style={styles.button} onPress={_pickImg} title="Camera Upload  " ><Text style={{color:colors.white}}>Camera Upload</Text></Pressable>
      <Pressable style={styles.button} onPress={_pickImgLibrary} title="Upload Image " ><Text style={{color:colors.white}}>Select Image</Text></Pressable>
			<TextInput style={styles.textInput} placeholder="Name" autoComplete='name' onChangeText={value=>{setName(value)}} value={name}/>
			<TextInput style={styles.multilineTextInput} placeholder="Address" autoComplete='street-address' multiline onChangeText={value=>{setAddress(value)}} value={address}/>
			<TextInput style={styles.textInput} placeholder="Year of Birth" onChangeText={value=>{setAge(value)}} value={age}/>
			<TextInput style={styles.textInput} placeholder="Contact Number" autoComplete='tel'
      inputMode='tel' onChangeText={value=>{
        let tempVal = Number(value);
        setContact(tempVal)}} 
        />
		<Pressable style={styles.button} onPress={handleCreate}> 
		  <Text style={styles.text}>Create</Text>
		</Pressable>			
    <Text>
    {notification}
    </Text>
        {pickerResult
          && <Image
              source={{uri: imageUri}}
              style={{ width: 200, height: 200 }}
            />
          }
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
	  backgroundColor: colors.gray,
	  color:"black",
  },
  multilineTextInput: {
	  marginTop:5,
	  marginBottom:5,
	  width: 250,
	  borderRadius: 4,
	  borderColor: "black",
	  padding:10,
	  backgroundColor: colors.gray,
	  color:"black",
  },
});

