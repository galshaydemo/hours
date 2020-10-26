import React,{useState,useEffect, createRef,useRef} from 'react';
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
import SQLite from "react-native-sqlite-storage";
import DateTimePickerModal from "react-native-modal-datetime-picker";

//import PickerNumber from '../Component/PickerNumber';
//import TimePickerHalf from '../Component/TimePickerHalf';

function DesignTrip()
{
  
  const createTables=(dbLocal : SQLite.SQLiteDatabase)=>
    {
      const sqlName="CREATE TABLE IF NOT EXISTS SearchHistory( " +
      "search_id INTEGER PRIMARY KEY NOT NULL, " +
      "day INTEGER, month INTEGER,year INTEGER,fromStation TEXT,toStation TEXT,time TEXT,daySelect TEXT" +
    ");"
      console.log('create table search history')
      console.log(dbLocal);
      dbLocal.transaction(tx  => {
        tx.executeSql(
          sqlName
        )
      }).then(()=>{
        console.log('create table');
        dbLocal.transaction(tx =>
          {
            var temp=[]
            tx.executeSql("select  * from searchHistory order by year,month,day limit 1", [], // passing sql query and parameters:null
            (tx,results) => {
              console.log(results.rows.item(0).fromStation)
              setFromStation(results.rows.item(0).fromStation)
              setToStation(results.rows.item(0).toStation)
              refStationFrom.current.getAlert(results.rows.item(0).fromStation)
              refStationTo.current.getAlert(results.rows.item(0).toStation)
          })
        
      })
    })
  
    }  
  
    
    const [db, setDb] = useState(null);
  useEffect(function() {

    SQLite.DEBUG(true);
    SQLite.enablePromise(true);
    
    SQLite.openDatabase({
        name: "SearchHistory",
        location: "default"
    }).then((db) => {
      setDb(db)
      createTables(db)
        
    });
}, []);
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
    setFromStation(t)

    refStationFrom.current.getAlert(t);
    refStationTo.current.getAlert(fr);
  }
  const [arrive,setArrive]=useState(false)
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState(new Date())
  const [show, setShow] = useState(false);
  const [fromStation, setFromStation] = useState();
  const [toStation, setToStation] = useState();
  const [showTime, setShowTime] = useState(false);
  
  const updateDatabase=()=>
    {
       
        const d=new Date();
        db.transaction(tx => {
        tx.executeSql(
        "insert into SearchHistory (day,month,year,fromStation,toStation,time,daySelect) values(?,?,?,?,?,?,?)",[
          d.getDate(),d.getMonth()+1,d.getFullYear(),fromStation,toStation,time.toTimeString(),   date.toLocaleString()
        ])
      .then(()=>{
        console.log('add record');
      })
    })
  }
  const setTomorrow=()=>
  {
	  var ms = new Date().getTime() + 86400000;
  	  var tomorrow = new Date(ms);
		setDate(tomorrow)


  }
  const refStationFrom=useRef(null)
  const refStationTo=useRef(null)


  return (
    <>
	<View style={{marginBottom:40}}>
    
    <Station ref={refStationFrom} 
    value={fromStation} onChange={(value)=>setFromStation(value)} name={translate(cc_destination)}/>
    <Station ref={refStationTo} value={toStation} onChange={(value)=>setToStation(value)} name={"יעד"}/>
	</View>
	
	
	<View style={{flexDirection:'row',marginBottom:20}}>
	<View style={{paddingHorizontal:10}}><Text style={styles.labelStyle}>תכנון נסיעה ליום</Text></View>
	<View><Text>{date.toLocaleDateString()}</Text></View>
	
    
	</View>
    <View style={{flexDirection:'row',marginBottom:20}}>
    <TouchableHighlight style={styles.appButtonContainer} onPress={()=>setDate(new Date())}>
    <Text style={styles.appButtonText}>היום</Text>
    </TouchableHighlight>
    <TouchableHighlight style={styles.appButtonContainer} onPress={()=>setTomorrow()}>
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
				<Text  style={styles.labelStyle}>זמן { arrive ? 'יציאה' : 'הגעה'} </Text>
        
			</View>
			<View><Text  style={styles.labelStyle}>{time.toLocaleTimeString('he-IL')}</Text></View>
      	<DateTimePickerModal
        isVisible={showTime}
        mode="time"
        onConfirm={(value)=>{alert(value);setShowTime(false);setTime(value)}}
        onCancel={()=>{setShowTime(false)}}
      />
		</View>
	</View>
    <TouchableHighlight style={styles.appButtonContainer} onPress={()=>switchStation()}>
    <View>
    <Text style={styles.appButtonText}>החלפה</Text>
    </View>
    </TouchableHighlight>
    <View style={{flexDirection:'row',marginVertical:20}}>
    <Text style={styles.labelStyle}>הגעה\יציאה
    </Text>
    <Switch
         onValueChange = {(value)=>setArrive(value)}
         value = {arrive}/>
    </View>
	<TouchableHighlight style={styles.appButtonContainer} onPress={()=>updateDatabase()}>
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
  stationLabel:
  {
    fontSize:16,
    fontWeight:'bold',
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
  labelStyle:
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
