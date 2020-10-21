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
export default function TimePicker({onChange})
{
	 const [hour, setHour] = useState('8');
  const [mine, setMinute] = useState('0');
  
  const hours=Array.from(Array(24).keys());
  const minutes=Array.from(Array(60).keys());
	return <View style={{}}>
    <View style={styles.oneLine}>
    <Picker
  selectedValue={hour}
  
  style={{height: 20, width: 120}}
  onValueChange={(itemValue:string) =>
    {
      
    setHour(itemValue)
    onChange(itemValue,mine)
    }
  }>
  {hours.map((data) => {
      return (
        <Picker.Item key={data} label={data.toString()} value={data.toString()}/>
      )
    })
}
</Picker>
<Text style={styles.label}>שעה</Text>
</View>
<View style={styles.oneLine}>
    <Picker
  selectedValue={mine}
  
  style={{height: 20, width: 120}}
  onValueChange={(itemValue:string) =>
    {
      

    setMinute(itemValue)
    onChange(hour,itemValue)
    }
  }>
  {minutes.map((data) => {
      return (
        <Picker.Item key={data} label={data.toString()} value={data.toString()}/>
      )
    })
}
</Picker>
<Text style={styles.label}>דקות</Text>
</View>

</View>
}
const styles = StyleSheet.create({
oneLine:
{
  flexDirection:'row-reverse',
  marginTop:10,
  justifyContent:'space-evenly'
  
},

  label:
  {
    width:100,
  }
});


