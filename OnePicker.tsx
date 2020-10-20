
import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
export default function OnePicker(data:string[],label:string,defValue:string)
{

    const [value,setValue]=useState(defValue);
<View style={{flexDirection:'row',borderWidth:1}}>
    <Picker
        selectedValue={value}
        style={{height: 20, width: 120}}
        onValueChange={(itemValue) =>
        setValue(itemValue)
        }>
        {data.map((item:string) => {
        return (
          <Picker.Item label={item} value={item}/>
        )
      })
      }
</Picker>
<Text>{label}</Text>
</View>
}