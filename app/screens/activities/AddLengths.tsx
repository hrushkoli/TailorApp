import * as React from 'react';
import {TaskRealmContext} from '../../models';
import {Pressable,View,ScrollView,StyleSheet,Text} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useState } from 'react';
import {Customer, Sayya, Order, Kurta, Pyjama,Note} from '../../models/Task';
import {CustomerItem} from '../../components/CustomerItem';
import {MeasurementHeader} from '../../components/MeasurementHeader';
import { AddOrderForm } from '../../components/AddOrderForm';
import { UpdateMode } from 'realm';
import colors from "../../styles/colors"
import {shadows} from '../../styles/shadows';
import { AddLengthForm } from '../../components/AddLengthForm';
import { SayyaItem } from '../../components/SayyaItem';
import { KurtaItem } from '../../components/KurtaItem';
import { PyjamaItem } from '../../components/PyjamaItem';
import { NoteItem } from '../../components/NoteItem';

const {useRealm,useObject} = TaskRealmContext;

export default function AddLengths ({route,navigation}) {
  const [lengthsConcat,setLengthsConcat] = useState(false)
  const realm = useRealm();
  const _routeParam = route.params
  const routeParam =  useObject("Order",_routeParam._id)

  const onToggleStatus = (order)=>{
    const orderId = new Realm.BSON.ObjectID(order._id)
    realm.write(
    ()=>{
        const selectedOrder = realm.objectForPrimaryKey("Order",orderId)
        selectedOrder.isComplete = !selectedOrder.isComplete
      }
    )
  }
  let sayyaItems=[]
  if(routeParam.sayyas){
    sayyaItems= routeParam.sayyas
  }
  let kurtaItems=[]
  if(routeParam.kurtas){
    kurtaItems= routeParam.kurtas
  }
  let pyjamaItems=[]
  if(routeParam.pyjamas){
    pyjamaItems= routeParam.pyjamas
  }
  let noteItems=[]
  if(routeParam.note){
    noteItems= routeParam.note
  }

  const renderHeader= ()=>{
      return <MeasurementHeader
        routeParam={routeParam}
        onDeleteOrder={onDeleteOrder}
        onToggleStatus={onToggleStatus}
      />
    }

    const renderForm=()=>{
        return <AddLengthForm 
        onSayyaSubmit={onSayyaSubmit}
        onKurtaSubmit={onKurtaSubmit}
        onPyjamaSubmit={onPyjamaSubmit}
        onNoteSubmit={onNoteSubmit}
        />
      }

  const onSayyaSubmit= (type:string,length:string,cost:number)=>{
    alert("values = :"+ cost)
    realm.write(()=>{
      const newSayya = new Sayya(realm,type,length,cost);
      routeParam.sayyas.push(newSayya)
      realm.create("Order",routeParam,"modified")
      alert("Sayya Lengths Added")
    })
  }
  const onKurtaSubmit= (type:string,length:string,shoulders:string,sleeve:string,chest:string,waist:string,hip:string,collar:string,cost:number)=>{
    realm.write(()=>{
      const newKurta= new Kurta(realm,type,length,shoulders,sleeve,chest,waist,hip,collar,cost);
      routeParam.kurtas.push(newKurta)
      realm.create("Order",routeParam,"modified")
      alert("Kurta Lengths Added")
    })
  }
  const onPyjamaSubmit= (type:string,length:string,waist:string,bottom:string,cost:number)=>{
    realm.write(()=>{
      const newPyjama= new Pyjama(realm,type,length,waist,bottom,cost);
      routeParam.pyjamas.push(newPyjama)
      realm.create("Order",routeParam,"modified")
      alert("Pyjama Lengths Added")
    })
  }
  const onNoteSubmit= (value:string)=>{
    realm.write(()=>{
      const newNote = new Note(realm,value);
      routeParam.note.push(newNote)
      realm.create("Order",routeParam,"modified")
      alert("Note Created")
    })
  }

  const onObjectDelete= (arr)=>{
    realm.write(()=>{
        realm.delete(arr)
        alert("Successfully Deleted")
      })
  }


  const onDeleteOrder= (arr)=>{
    realm.write(()=>{
        realm.delete(arr)
        alert("Order Deleted")
        navigation.navigate("Orders")
      })
   } 


    React.useEffect(()=>{
        renderHeader
      },[onToggleStatus])

  const renderSayyas=()=>{
    return(
      sayyaItems && 
        sayyaItems.map(item=>(
          <SayyaItem arr={item} onDelete={onObjectDelete}/>
      ))
    ) 
  }
  const renderKurtas=()=>{
    return(
      kurtaItems && 
        kurtaItems.map(item=>(
          <KurtaItem arr={item} onDelete={onObjectDelete}/>
      ))
    ) 
  }
  const renderPyjamas=()=>{
    return(
      pyjamaItems && 
        pyjamaItems.map(item=>(
          <PyjamaItem arr={item} onDelete={onObjectDelete}/>
      ))
    ) 
  }
  const renderNotes=()=>{
    return(
      noteItems && 
        noteItems.map(item=>(
          <NoteItem arr={item} onDelete={onObjectDelete}/>
      ))
    ) 
  }


	return(
      <ScrollView style={styles.container}>
        {renderHeader()}
        {renderForm()}
        <Pressable onPress={ev=>setLengthsConcat(!lengthsConcat)}>
          <Text style={styles.headings}>
            View Values
          </Text>
        </Pressable>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginRight:12,
            marginVertical:5
          }}
        />
        {
          lengthsConcat && renderSayyas()
        }
        {
          lengthsConcat && renderKurtas()
        }
        {
          lengthsConcat && renderPyjamas()
        }
        {
          lengthsConcat && renderNotes()
        }
      </ScrollView>
	)	
}

const styles = StyleSheet.create({
  headings:{
      marginLeft: 12,
      marginVertical:8,
      fontSize:18,
      fontWeight:"bold"
    },
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
    marginRight:8,
    paddingVertical: 8,
    justifyContent: 'center',
    borderRadius:5,
    backgroundColor: colors.gray,
  },
  completed: {
    backgroundColor: colors.purpleDark,
  },

}); 
