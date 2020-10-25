import React,{useState,useEffect, createRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableHighlight,
  View,
  Text,
  Platform,
  StatusBar,
  Button,
} from 'react-native';
import Station from './Station'

import DateTimePickerModal from "react-native-modal-datetime-picker";

function DesignTrip()
{
	const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    //setDate(currentDate);
  };
  const switchStation=()=>
  {
	  const fr=fromStation;
	  const t=toStation;
	  setToStation(fr)
	  setFromStation(fr)
  }
  const [arrive,setArrive]=useState(false)
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState(new Date())
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [fromStation, setFromStation] = useState('sss');
  const [toStation, setToStation] = useState('aaa');
  const [showTime, setShowTime] = useState(false);
  const myRef=createRef<typeof Station>();
  const myRefTo=createRef<typeof Station>();
  const setTommorow=()=>
  {
	  var ms = new Date().getTime() + 86400000;
  	  var tomorrow = new Date(ms);
		setDate(tomorrow)
		console.log(myRef)

  }
  


  return (
    <>
	<View style={{marginBottom:40}}>
    <Station ref={myRef} value={fromStation} onChange={(value)=>setFromStation(value)} name="מוצא"/>
    <Station ref={myRefTo} value={toStation} onChange={(value)=>setToStation(value)} name={"יעד"}/>
	</View>
	
	
	<View style={{flexDirection:'row',marginBottom:20}}>
	<View style={{paddingHorizontal:10}}><Text style={styles.lableStyle}>תכנון נסיעה ליום</Text></View>
	<View><Text>{date.toLocaleDateString()}</Text></View>
	
    
	</View>
    <View style={{flexDirection:'row',marginBottom:20}}>
    <TouchableHighlight style={styles.appButtonContainer} onPress={()=>setDate(new Date())}>
    <Text style={styles.appButtonText}>היום</Text>
    </TouchableHighlight>
    <TouchableHighlight style={styles.appButtonContainer} onPress={()=>setTommorow()}>
    <Text style={styles.appButtonText}>מחר</Text>
    </TouchableHighlight>
	
    <TouchableHighlight style={styles.appButtonContainer} onPress={()=>setShow(true)}>
    <Text style={styles.appButtonText}>אחר</Text>
    </TouchableHighlight>
	</View>
    <DateTimePickerModal
        isVisible={show}
        mode="date"
        onConfirm={(value)=>{setShow(false);setDate(value)}}
        onCancel={()=>{setShow(false)}}
      />
    
        <View style={{flexDirection:'row'}}>
	<TouchableHighlight style={styles.appButtonContainer} onPress={()=>setShowTime(true)}>
		<Text style={[styles.appButtonText,{}]}>זמן</Text>
		</TouchableHighlight>
		<View style={{flexDirection:'row',paddingTop:20,paddingLeft:10}}>
			<View style={{paddingRight:10}}>
				<Text  style={styles.lableStyle}>זמן יציאה\הגעה</Text>
			</View>
			<View><Text  style={styles.lableStyle}>{time.toLocaleTimeString('he-IL')}</Text></View>
			<DateTimePickerModal
        isVisible={showTime}
        mode="time"
        onConfirm={(value)=>{alert('confirm');setShowTime(false);setTime(value)}}
        onCancel={()=>{alert('confirm');setShowTime(false)}}
      />
		</View>
	</View>
    <TouchableHighlight style={styles.appButtonContainer} onPress={()=>switchStation()}>
    <View>
    <Text style={styles.appButtonText}>החלפה</Text>
    </View>
    </TouchableHighlight>
    <View style={{flexDirection:'row',marginVertical:20}}>
    <Text style={styles.lableStyle}>הגעה\יציאה
    </Text>
    <Switch
         onValueChange = {(value)=>setArrive(value)}
         value = {arrive}/>
    </View>
	<TouchableHighlight style={styles.appButtonContainer} onPress={()=>alert('aaa')}>
    <Text style={styles.appButtonText}>חיפוש</Text>
	</TouchableHighlight>
    </>
  )
}
const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 2,
    marginHorizontal:3,
    marginTop:10,
    width:70,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
,
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  lableStyle:
  {
	color: "black",
    fontWeight: "bold",
    
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  station:{
    width:100,
    borderWidth:1,
    padding:3,
    margin:3,

  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default DesignTrip;
