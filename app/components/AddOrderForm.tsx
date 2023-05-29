import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Platform,
  StyleSheet,
} from 'react-native';
import DatePicker from "react-native-date-picker"
import {buttonStyles} from '../styles/button';
import colors from '../styles/colors';
import {shadows} from '../styles/shadows';

type AddOrderFormProps = {
  onSubmit: (order: string,date:Date) => void;
};

export const AddOrderForm: React.FC<AddOrderFormProps> = ({onSubmit}) => {
  const [lengthDescription, setLengthDescription] = useState('');
  const [estimatedCompletion, setEstimatedCompletion] = useState();
  const [lengths, setLengths] = useState('');
  const [order, setOrder] = useState('');
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const handleSubmit = () => {
    onSubmit(order,date);
    setLengths('');
  };

  useEffect(()=>{
    },)

  return (
    <View style={styles.form}>
      <View style={{flexDirection : 'column', flex: 1}}>
        <TextInput
          value={order}
          placeholder="Enter Order Name"
          onChangeText={setOrder}
          autoCorrect={false}
          autoCapitalize="none"
          style={styles.textInput}
        />
        <Pressable onPress={ev=>setOpen(true)}>
          <Text style={styles.date}>
            Select Date{" "}: {" "}
            {date.toDateString()}
          </Text>
        </Pressable>
        <DatePicker
          modal
          style={styles.textInput}
          open={open}
          date={date}
          mode="date"
          onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
        />
      </View>
      <Pressable onPress={handleSubmit} style={styles.submit}>
        <Text style={styles.icon}>＋</Text>
      </Pressable>
    </View>
  );

};

const styles = StyleSheet.create({
  form: {
    height: 'auto',
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
    marginLeft:8,
    paddingLeft: 15,
    paddingRight: 5,
    paddingVertical: 15,
    borderRadius: 5,
    backgroundColor: colors.gray,
    fontSize: 14,
    marginBottom: 12,
    ... shadows
  },
  date: {
    marginLeft:8,
    paddingLeft: 15,
    paddingRight: 5,
    paddingVertical:8 ,
    borderRadius: 5,
    backgroundColor: colors.white,
    fontSize: 14,
    marginBottom: 12,
    color: colors.black,
    ... shadows
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


