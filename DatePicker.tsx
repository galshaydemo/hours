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
export default function DatePicker({onChange})
{
	 const [year, setYear] = useState(2020);
  const [month, setMonth] = useState(10);
  const [day, setDay] = useState(20);
  const days=Array.from(Array(30).keys());
  const months=Array.from(Array(12).keys());
	return (<View style={{}}>
    <View style={styles.oneLine}>
    <Picker
        selectedValue={year}
        style={{height: 20, width: 120}}
        onValueChange={(itemValue) =>
        {
          onChange(year,month,day)
        setYear(itemValue)
        }
        
        }>
        {['2000','2001'].map((data) => {
        return (
          <Picker.Item label={data} value={data}/>
        )
      })
      }
</Picker>
<Text style={styles.label}>שנה</Text>
</View>
<View style={styles.oneLine}>
    <Picker
        selectedValue={month}
        style={{height: 20, width: 120}}
        onValueChange={(itemValue) =>
        {
          onChange(year,month,day)
        setMonth(itemValue)
        }
        }>
        {months.map((data) => {
        return (
          <Picker.Item label={(data+1).toString()} value={(data+1).toString()}/>
        )
      })
      }
</Picker>
<Text style={styles.label}>חודש</Text>
</View>
<View style={styles.oneLine}>
    <Picker
        selectedValue={day}
        
        style={{height: 20, width: 120}}
        onValueChange={(itemValue) =>
        {
          onChange(year,month,day)
        setDay(itemValue)
        }
        }>
        {days.map((data) => {
        return (
          <Picker.Item label={data.toString()} value={data.toString()}/>
        )
      })
      }
</Picker>
<Text style={styles.label}>יום</Text>
</View>

</View>)
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
  
  
