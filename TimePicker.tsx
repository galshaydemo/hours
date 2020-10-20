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
export default function TimePicker()
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
  onValueChange={(itemValue) =>
    {
      console.log(itemValue)
    setHour(itemValue)
    }
  }>
  {hours.map((data) => {
      return (
        <Picker.Item label={data.toString()} value={data.toString()}/>
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
  onValueChange={(itemValue) =>
    {
      console.log(itemValue)
    setMinute(itemValue)
    }
  }>
  {minutes.map((data) => {
      return (
        <Picker.Item label={data.toString()} value={data.toString()}/>
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
  flexDirection:'row',
  marginTop:10,
  justifyContent:'space-around'
},

  label:
  {
    width:100,
  }
});


