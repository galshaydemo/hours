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
import PickerNumber from './PickerNumber';
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
      onChange(itemValue,mine)  
      setHour(itemValue)
    
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
<PickerNumber start={0} num={24} inRow={6} text={'בחר שעה'} onChange={(m)=> {setHour(m);onChange(m,mine)}}></PickerNumber>   
</View>
<View style={styles.oneLine}>
    <Picker
  selectedValue={mine}
  
  style={{height: 20, width: 120}}
  onValueChange={(itemValue:string) =>
    {
      

    onChange(hour,itemValue)
    
    setMinute(itemValue)
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
<PickerNumber start={0} num={60} inRow={10} text={'בחר דקה'} onChange={(m)=> {setMinute(m);onChange(hour,m)}}></PickerNumber>   
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
    width:30,
  }
});


