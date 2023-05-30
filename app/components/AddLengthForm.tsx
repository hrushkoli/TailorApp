import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  Platform,
  StyleSheet,
} from 'react-native';
import DatePicker from "react-native-date-picker"
import { buttonStyles } from '../styles/button';
import colors from '../styles/colors';
import { shadows } from '../styles/shadows';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';

type AddLengthFormProps = {
  onSayyaSubmit: (type: string, length: string, cost:number) => void;
  onKurtaSubmit: (type: string, length: string, shoulders: string, sleeve: string, chest: string, waist: string, hip: string, collar: string, cost:number ) => void;
  onPyjamaSubmit: (type: string, length: string, waist: string, bottom: string,cost:number) => void;
  onNoteSubmit: (value: string,userImage: string) => void;
};

export const AddLengthForm: React.FC<AddLengthFormProps> = ({ 
  onSayyaSubmit,
  onKurtaSubmit,
  onPyjamaSubmit,
  onNoteSubmit
  }) => {


  const [sayyaConcat,setSayyaConcat] = useState(false)
  const [kurtaConcat,setKurtaConcat] = useState(false)
  const [pyjamaConcat,setPyjamaConcat] = useState(false)
  const [noteValue, setNoteValue] = useState('')
  
  const [sayyaLength, setSayyaLength] = useState('');
  const [sayyaCost, setSayyaCost] = useState<Number>();
  const [sayyaTypeValue, setSayyaTypeValue] = useState('');
  const [sayyaOpen, setSayyaOpen] = useState(false)
  const [sayyaItems, setSayyaItems] = useState([
    {label: 'Sayya 1', value: '1'},
    {label: 'Sayya 2', value: '2'},
    {label: 'Sayya 3', value: '3'}
  ]);


  const [kurtaLength, setKurtaLength] = useState('');
  const [kurtaCost, setKurtaCost] = useState<Number>();
  const [kurtaShoulder, setKurtaShoulder] = useState('');
  const [kurtaSleeve, setKurtaSleeve] = useState('');
  const [kurtaChest, setKurtaChest] = useState('');
  const [kurtaWaist, setKurtaWaist] = useState('');
  const [kurtaHip, setKurtaHip] = useState('');
  const [kurtaCollar, setKurtaCollar] = useState('');
  const [kurtaTypeValue, setKurtaTypeValue] = useState('');
  const [kurtaOpen, setKurtaOpen] = useState(false)
  const [kurtaItems, setKurtaItems] = useState([
    {label: 'Cuff', value: 'Cuff'},
    {label: 'Kali', value: 'Kali'},
    {label: 'Cuff Kali', value: 'Cuff Kali'}
  ]);


  const [pyjamaLength, setPyjamaLength] = useState('');
  const [pyjamaCost, setPyjamaCost] = useState<Number>();
  const [pyjamaWaist, setPyjamaWaist] = useState('');
  const [pyjamaBottom, setPyjamaBottom] = useState('');
  const [pyjamaTypeValue, setPyjamaTypeValue] = useState('');
  const [pyjamaOpen, setPyjamaOpen] = useState(false)
  const [pyjamaItems, setPyjamaItems] = useState([
    {label: 'Belt', value: 'Belt'},
    {label: 'Nari', value: 'Nari'},
    {label: 'Elastic', value: 'Elastic'}
  ]);


  const handleSayyaSubmit = () => {
    onSayyaSubmit(sayyaTypeValue, sayyaLength, sayyaCost);
  };
  const handleKurtaSubmit = () => {
    onKurtaSubmit(kurtaTypeValue, kurtaLength, kurtaShoulder, kurtaSleeve, kurtaChest, kurtaWaist, kurtaHip, kurtaCollar,kurtaCost)
  };
  const handlePyjamaSubmit= () => {
    onPyjamaSubmit(pyjamaTypeValue,pyjamaLength,pyjamaWaist,pyjamaBottom,pyjamaCost)
  };
  const handleNoteSubmit= () => {
    onNoteSubmit(noteValue,imageUri)
    imageUri=""
  };


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


  return (
    <View style={{}}>

      <View style={styles.form4}>
        <View style={{ flexDirection: 'column', flex: 1 }}>
        {pickerResult
          && <Image
              source={{uri: imageUri}}
              style={{ width: 200, height: 200,margin:8 }}
            />
          }
          <TextInput
            value={noteValue}
            placeholder="Enter Note"
            onChangeText={setNoteValue}
            autoCorrect={false}
            autoCapitalize="none"
            style={styles.textInput}
          />
        <Pressable style={styles.button} onPress={_pickImg} title="Camera Upload  " ><Text style={{color:colors.white}}>Camera Upload</Text></Pressable>
        <Pressable style={styles.button} onPress={_pickImgLibrary} title="Upload Image " ><Text style={{color:colors.white}}>Select Image</Text></Pressable>
        </View>
          <Pressable onPress={handleNoteSubmit} style={styles.submit}>
            <Text style={styles.icon}>＋</Text>
          </Pressable>
      </View>

      <Pressable onPress={ev=>setSayyaConcat(!sayyaConcat)}>
        <Text style={styles.headings}>
          Enter New Sayya
        </Text>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginRight:12,
            marginVertical:5
          }}
        />
      </Pressable>
      {sayyaConcat &&
      (
        <View style={styles.form1}>
          <View style={{ flexDirection: 'column', flex: 1 }}>
            <View 
              style={{zIndex:3,elevation:3,marginBottom:8,marginLeft:8}}
            >
              <DropDownPicker
                  placeholder="Select Sayya"
                  open={sayyaOpen}
                  value={sayyaTypeValue}
                  items={sayyaItems}
                  setOpen={setSayyaOpen}
                  setValue={setSayyaTypeValue}
                  setItems={setSayyaItems}
                />
            </View>
            <TextInput
              value={sayyaLength}
              placeholder="Enter Sayya Length"
              onChangeText={setSayyaLength}
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.textInput}
            />
            <TextInput
              inputMode="numeric"
              placeholder="Enter Sayya Cost"
              onChangeText={(value)=>{
                setSayyaCost(Number(value));
                }}
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.textInput}
            />
            </View>
            <Pressable onPress={handleSayyaSubmit} style={styles.submit}>
              <Text style={styles.icon}>＋</Text>
            </Pressable>
        </View>
        )

        }
      
      <Pressable onPress={ev=>setKurtaConcat(!kurtaConcat)}>
        <Text style={styles.headings}>
          Enter New Kurta 
        </Text>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginRight:12,
            marginVertical:5
          }}
        />
      </Pressable>
      {kurtaConcat && 
        (
        <View style={styles.form2}>
           <View style={{ flexDirection: 'column', flex: 1 }}>
            <View 
              style={{zIndex:2,elevation:2,marginBottom:8,marginLeft:8}}
            >
              <DropDownPicker
                  placeholder="Select Kurta"
                  open={kurtaOpen}
                  value={kurtaTypeValue}
                  items={kurtaItems}
                  setOpen={setKurtaOpen}
                  setValue={setKurtaTypeValue}
                  setItems={setKurtaItems}
                />
            </View>
            <TextInput
              value={kurtaLength}
              placeholder="Enter Kurta Length"
              onChangeText={setKurtaLength}
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.textInput}
            />
            <TextInput
              value={kurtaShoulder}
              placeholder="Enter Kurta Shoulder Size"
              onChangeText={setKurtaShoulder}
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.textInput}
            />
            <TextInput
              value={kurtaSleeve}
              placeholder="Enter Kurta Sleeve Size"
              onChangeText={setKurtaSleeve}
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.textInput}
            />
            <TextInput
              value={kurtaChest}
              placeholder="Enter Kurta Chest Size"
              onChangeText={setKurtaChest}
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.textInput}
            />
            <TextInput
              value={kurtaWaist}
              placeholder="Enter Kurta Waist Size"
              onChangeText={setKurtaWaist}
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.textInput}
            />
            <TextInput
              value={kurtaHip}
              placeholder="Enter Kurta Hip Size"
              onChangeText={setKurtaHip}
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.textInput}
            />
            <TextInput
              value={kurtaCollar}
              placeholder="Enter Kurta Collar Size"
              onChangeText={setKurtaCollar}
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.textInput}
            />
            <TextInput
              inputMode="numeric"
              placeholder="Enter Kurta Cost"
              onChangeText={(value)=>{
                setKurtaCost(Number(value));
                }}
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.textInput}
            />
          </View>
            <Pressable onPress={handleKurtaSubmit} style={styles.submit}>
              <Text style={styles.icon}>＋</Text>
            </Pressable>
        </View>

        )

        }



      
      <Pressable onPress={ev=>setPyjamaConcat(!pyjamaConcat)}>
        <Text style={styles.headings}>
          Enter New Pyjama 
        </Text>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginRight:12,
            marginVertical:5
          }}
        />
      </Pressable>

      {pyjamaConcat && 
        (
        <View style={styles.form3}>
           <View style={{ flexDirection: 'column', flex: 1 }}>
            <View 
              style={{zIndex:1,elevation:1,marginBottom:8,marginLeft:8}}
            >
              <DropDownPicker
                  placeholder="Select Pyjama"
                  open={pyjamaOpen}
                  value={pyjamaTypeValue}
                  items={pyjamaItems}
                  setOpen={setPyjamaOpen}
                  setValue={setPyjamaTypeValue}
                  setItems={setPyjamaItems}
                />
            </View>
            <TextInput
              value={pyjamaLength}
              placeholder="Enter Pyjama Length"
              onChangeText={setPyjamaLength}
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.textInput}
            />
            <TextInput
              value={pyjamaWaist}
              placeholder="Enter Pyjama Waist"
              onChangeText={setPyjamaWaist}
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.textInput}
            />
            <TextInput
              value={pyjamaBottom}
              placeholder="Enter Pyjama Bottom"
              onChangeText={setPyjamaBottom}
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.textInput}
            />
            <TextInput
              inputMode="numeric"
              placeholder="Enter Pyjama Cost"
              onChangeText={(value)=>{
                setPyjamaCost(Number(value));
                }}
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.textInput}
            />
          </View>
            <Pressable onPress={handlePyjamaSubmit} style={styles.submit}>
              <Text style={styles.icon}>＋</Text>
            </Pressable>
        </View>
        )
        }


    </View>
  );

};

const styles = StyleSheet.create({
  headings:{
      marginLeft: 12,
      marginVertical:8,
      fontSize:18,
      fontWeight:"bold"
    }
  ,
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
  form1: {
    height: 'auto',
    zIndex:3,
    elevation:3,
    marginBottom: 5,
    flexDirection: "row",
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.7,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  form2: {
    height: 'auto',
    zIndex:2,
    elevation:2,
    marginBottom: 5,
    flexDirection: "row",
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.7,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  form3: {
    height: 'auto',
    zIndex:1,
    elevation:1,
    flexDirection: "row",
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.7,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  form4: {
    height: 'auto',
    zIndex:1,
    marginTop:12,
    elevation:1,
    marginBottom: 5,
    flexDirection: "row",
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.7,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  textInput: {
    height: 50,
    marginLeft: 8,
    paddingLeft: 15,
    paddingRight: 5,
    paddingVertical: 15,
    zIndex:0,
    elevation:0,
    borderRadius: 5,
    backgroundColor: colors.gray,
    fontSize: 14,
    marginBottom: 12,
    ...shadows
  },
  date: {
    marginLeft: 8,
    paddingLeft: 15,
    paddingRight: 5,
    paddingVertical: 8,
    borderRadius: 5,
    backgroundColor: colors.white,
    fontSize: 14,
    marginBottom: 12,
    color: colors.black,
    ...shadows
  },
  submit: {
    width: 50,
    marginBottom: 12,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
    textAlignVertical: "center",
    marginLeft: 10,
    borderRadius: 5,
    backgroundColor: colors.black,
  },
  icon: {
    color: colors.white,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },
});


