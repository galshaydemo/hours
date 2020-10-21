import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import SQLite from "react-native-sqlite-storage";
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import messaging from '@react-native-firebase/messaging';
import Geolocation from '@react-native-community/geolocation';
export default function Home({navigation})
{
    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <Button onPress={() => navigation.navigate('Report')} title="Report" />
          ),
        });
      }, [navigation]);
    useEffect(function() {

        SQLite.DEBUG(true);
        SQLite.enablePromise(true);
        
        SQLite.openDatabase({
            name: "TestDatabase",
            location: "default"
        }).then((db) => {
          setDb(db)
          createTables(db)
            
        });
    }, []);
    const [year, setYear] = useState(0);
    const [month, setMonth] = useState(0);
    const [day, setDay] = useState(0);
    const [hour, setHour] = useState(0);
    const [mine, setMinute] = useState(0);
  
    const changeDate=(year,month,day)=>
    {
      setYear(year)
      setMonth(month)
      setDay(day)
      console.log('change time hour' +year.toString())
      console.log('change time minute' + month.toString())
    }
    const changeTime=(hour,minute)=>
    {
      setHour(hour)
      setMinute(minute)
      
      console.log('change time hour' + hour.toString())
      console.log('change time minute' + minute.toString())
      
    }
    const createTables=(dbLocal)=>
    {
      const sqlName="CREATE TABLE IF NOT EXISTS Hours( " +
      "hour_id INTEGER PRIMARY KEY NOT NULL, " +
      "day INTEGER, month INTEGER,year INTEGER,dayWeek INTEGER,Hour INTEGER,Minute INTEGER,status INTEGER" +
    ");"
      console.log('create table')
      console.log(db);
      dbLocal.transaction(tx  => {
        tx.executeSql(
          sqlName
        )
      }).then(()=>{
        console.log('create record');
      })
  
    }  
  
    const [status, setStatus] = useState(true);
    const [db, setDb] = useState(null);
    const readData = () => {
      db.transaction(tx => {
        // sending 4 arguments in executeSql
        tx.executeSql('SELECT * FROM hours', [], // passing sql query and parameters:null
        (tx,results) => {
          console.log(results.rows.length)
        }
          
      ) // end transaction
      })
    }
    const updateDatabase=(close,current)=>
    {
      if (current)
      {
        const d=new Date();
        
        db.transaction(tx => {
        tx.executeSql(
        "insert into Hours (day,month,year,dayWeek,Hour,Minute,status) values(?,?,?,?,?,?,?)",[
          d.getDate(),d.getMonth()+1,d.getFullYear(),d.getDay(),d.getHours(),d.getMinutes(),close? 1 : 0
        ])
      .then(()=>{
        console.log('add record');
      })
    })
      }
      else
      {
      //setStatus(!status)
      const d=new Date(year,month-1,day)
      db.transaction(tx => {
        tx.executeSql(
        "insert into Hours (day,month,year,dayWeek,Hour,Minute,status) values(?,?,?,?,?,?,?)",[
          day,month,year,d.getDay(), hour,mine,close? 1 : 0
        ])
      .then(()=>{
        console.log('add record');
      })
    })
      }
  }
    return (
<SafeAreaView>
      <View style={styles.scrollView}>
        <Text style={styles.sectionTitle}>דיווח שעות</Text>
      </View>
      <View style={styles.container}>
      
      <TouchableOpacity onPress={()=>updateDatabase(false,true)}
          
          activeOpacity={0.5}>
            <View style={styles.action}>
          <Image style={{width:32,height:32,backgroundColor:'lightgreen'}}
            source={
              require('./clock.png')
            }
            
          />
          
          <Text style={styles.buttonTextStyle}>
             התחלת עבודה אוטומאטי
          </Text>
          </View>  
        </TouchableOpacity>
        
        
        <TouchableOpacity onPress={()=>updateDatabase(true,true)}>
        <View style={styles.action}>
          <Image style={{width:32,height:32}}
            source={
              require('./clock.png')
            }
            
          />
          
          <Text style={styles.buttonTextStyle}>
             סיום עבודה אוטומאטי
          </Text>
          </View>
          </TouchableOpacity>         
          
        <DatePicker onChange={changeDate}></DatePicker>
        <TimePicker onChange={changeTime}></TimePicker>
        <View style={{marginTop:30}}>
        <TouchableOpacity onPress={()=>updateDatabase(false,false)}
          activeOpacity={0.5}>
            <View style={styles.action}>
          <Image style={{width:32,height:32,backgroundColor:'lightgreen'}}
            source={
              require('./clock.png')
            }
            
          />
          
          <Text style={styles.buttonTextStyle}>
             התחלת עבודה ידני
          </Text>
          </View>  
        </TouchableOpacity>
        
        
        <TouchableOpacity onPress={()=>updateDatabase(true,false)}>
        <View style={styles.action}>
          <Image style={{width:32,height:32,backgroundColor:'red'}}
            source={
              require('./clock.png')
            }
            
          />
          
          <Text style={styles.buttonTextStyle}>
             סיום עבודה ידני
          </Text>
          </View>
          </TouchableOpacity>         
        
      
          </View>
      </View>
      </SafeAreaView>)
}
const styles = StyleSheet.create({
    container:
    {
        paddingTop:20,
        backgroundColor:'#02ccbb',
        paddingHorizontal:10,
    },
    buttonTextStyle:
    {
      width:200,
      borderWidth:0,
    },
    scrollView: {
        backgroundColor:'#00ddbb',
        paddingHorizontal:10,
    },
    engine: {
      position: 'absolute',
      right: 0,
    },
    action:
    {
      marginBottom:20,
      flexDirection:'row',justifyContent:'space-around'
    },
    img:{
      
    },
    body: {
      
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
      
    },
    highlight: {
      fontWeight: '700',
    },
    footer: {
      
      fontSize: 12,
      fontWeight: '600',
      padding: 4,
      paddingRight: 12,
      textAlign: 'right',
    },
  });