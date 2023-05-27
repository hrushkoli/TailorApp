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
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import JsonToTable from 'react-json-to-table/build/lib/components/JsonToTable';

const {useRealm,useObject} = TaskRealmContext;

export default function AddLengths ({route,navigation}) {
  const [totalSayyaCost, setTotalSayyaCost] = useState<Number>(0);
  const [totalKurtaCost, setTotalKurtaCost] = useState<Number>(0);
  const [totalPyjamaCost, setTotalPyjamaCost] = useState<Number>(0);
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


  const sayyatable = () => {
     let t = '';
     if (sayyaItems.length>0){
      t = t + 
      `
      <h3 >
          Sayyas
        </h3>
        <table style="width:100%;text-align:center;border:1px solid;border-collapse:collapse;">
        <tr>
          <th style="border:1px solid;">Cost</th>
          <th style="border:1px solid;">Length</th>
          <th style="border:1px solid;">Type</th>
        </tr>
        `
        let tempSayyaCost = 0
         for (let i in sayyaItems) {
           const item = sayyaItems[i]
           tempSayyaCost += item.cost
           t = t +
            `<tr>
               <td style="border:1px solid;">${item.cost}</td>
               <td style="border:1px solid;">${item.length}</td>
               <td style="border:1px solid;">${item.type}</td>
             </tr>`
         }
         setTotalSayyaCost(tempSayyaCost)
         t = t+ `</table>`
     }
     return t;
  }

  const kurtatable = () => {
     let t = '';
     if (kurtaItems.length>0){
       t = t + `<h3 ">
          Kurtas 
        </h3>
        <table style="width:100%;text-align:center;border:1px solid;border-collapse:collapse;">
        <tr>
          <th style="border:1px solid;">Type</th>
          <th style="border:1px solid;">Length</th>
          <th style="border:1px solid;">Sleeve</th>
          <th style="border:1px solid;">Hip</th>
          <th style="border:1px solid;">Collar</th>
          <th style="border:1px solid;">Chest</th>
          <th style="border:1px solid;">Waist</th>
          <th style="border:1px solid;">Cost</th>
        </tr>`

        let tempKurtaCost = 0
         for (let i in kurtaItems) {
           const item = kurtaItems[i]
           tempKurtaCost += item.cost
           t = t +
            `<tr>
               <td style="border:1px solid;">${item.type}</td>
               <td style="border:1px solid;">${item.length}</td>
               <td style="border:1px solid;">${item.sleeve}</td>
               <td style="border:1px solid;">${item.hip}</td>
               <td style="border:1px solid;">${item.collar}</td>
               <td style="border:1px solid;">${item.chest}</td>
               <td style="border:1px solid;">${item.waist}</td>
               <td style="border:1px solid;">${item.cost}</td>
             </tr>`
         }
         setTotalKurtaCost(tempKurtaCost)
         t = t+ `</table>`
       }
     return t;
  }

  const pyjamatable = () => {
     let t = '';
     if (pyjamaItems.length>0){
       t = t + `<h3 ">
          Pyjama 
        </h3>
        <table style="width:100%;text-align:center;border:1px solid;border-collapse:collapse;">
        <tr>
          <th style="border:1px solid;">Type</th>
          <th style="border:1px solid;">Length</th>
          <th style="border:1px solid;">Bottom</th>
          <th style="border:1px solid;">Waist</th>
          <th style="border:1px solid;">Cost</th>
        </tr>`
        let tempPyjamaCost = 0
         for (let i in pyjamaItems) {
           const item = pyjamaItems[i]
           tempPyjamaCost += item.cost
           t = t +
            `<tr>
               <td style="border:1px solid;">${item.type}</td>
               <td style="border:1px solid;">${item.length}</td>
               <td style="border:1px solid;">${item.bottom}</td>
               <td style="border:1px solid;">${item.waist}</td>
               <td style="border:1px solid;">${item.cost}</td>
             </tr>`
         }
         setTotalPyjamaCost(tempPyjamaCost)
         t = t+ `</table>`
       }
     return t;
  }

  const notetable = () => {
     let t = '';
     if (noteItems.length>0){
       t = t + 
       `
       <h3>
          Notes
        </h3>
        <table style="width:100%;text-align:center;border:1px solid;border-collapse:collapse;">
       `
       for (let i in noteItems) {
         const item = noteItems[i]
         t = t +
          `<tr>
             <td style="border:1px solid;">${item.value}</td>
           </tr>`
       }
       t = t+ `</table>`
     }
     return t;
  }
  const onPrintReceipt= async ()=>{
    const html=`
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
      </head>
      <body style="text-align: center;">
      <h1 style="font-size: 50px; font-weight: bold;">
        Alif Boutique
      </h1>
      <h3 style="text-aligh:center">
        Order Summary
      </h3>
      <div style="text-center"/>
        ${sayyatable()}
        ${kurtatable()}
        ${pyjamatable()}
        ${notetable()}
        <h3>Total Sayya Cost is: ${totalSayyaCost}</h3>
        <h3>Total Kurta Cost is: ${totalKurtaCost}</h3>
        <h3>Total Pyjama Cost is: ${totalPyjamaCost}</h3>
        <h1>Total Cost is: ${totalSayyaCost+totalKurtaCost+totalPyjamaCost}</h1>
      </div>
      </body>
      </html>
    `
    await Print.printToFileAsync({ html }).then(({uri})=>{
      alert(`File has been saved to: ${uri}`);
      shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    })
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

        <Pressable onPress={onPrintReceipt} style={styles.submit}>
          <Text style={styles.icon}>Print Receipt</Text>
        </Pressable>
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
  submit: {
    width: 150,
    paddingVertical:15,
    marginVertical: 12,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
    textAlignVertical: "center",
    marginLeft: 10,
    borderRadius: 5,
    backgroundColor: colors.black,
  },

}); 
