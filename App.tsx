/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

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
import {Picker} from '@react-native-community/picker';
import SQLite from "react-native-sqlite-storage";
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import OnePicker from './OnePicker'
import messaging from '@react-native-firebase/messaging';
import Geolocation from '@react-native-community/geolocation';
export default function App()
{
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
    console.log('chnage date' + year.toString())
    console.log('chnage date' + month.toString())
    console.log('chnage date' + day.toString())
  }
  const changeTime=(hour,minute)=>
  {
    setHour(hour)
    setMinute(minute)
    
    console.log('change time hour' + hour.toString())
    console.log('change time minute' + minute.toString())
    
  }
  const createTables=()=>
  {
    const sqlName="CREATE TABLE IF NOT EXISTS Hours( " +
    "hour_id INTEGER PRIMARY KEY NOT NULL, " +
    "day INTEGER, month INTEGER,year INTEGER,Hour INTEGER,Minute INTEGER,INTEGER,status INTEGER" +
  ");"
    console.log('create table')
    console.log(db);
    db.transaction(tx  => {
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
      "insert into Hours (day,month,year,Hour,Minute,status) values(?,?,?,?,?,?)",[
        d.getDay(),d.getMonth()+1,d.getFullYear(),d.getHours(),d.getMinutes(),close? 1 : 0
      ])
    .then(()=>{
      console.log('add record');
    })
  })
    }
    else
    {
    //setStatus(!status)
    db.transaction(tx => {
      tx.executeSql(
      "insert into Hours (day,month,year,Hour,Minute,status) values(?,?,?,?,?,?)",[
        day,month,year,hour,mine,close? 1 : 0
      ])
    .then(()=>{
      console.log('add record');
    })
  })
    }
}
  useEffect(function() {
    SQLite.DEBUG(true);
    SQLite.enablePromise(true);
    Geolocation.getCurrentPosition(info => console.log(info))
    SQLite.openDatabase({
        name: "TestDatabase",
        location: "default"
    }).then((db) => {
        setDb(db)
        console.log("Database open!");
        db.transaction(createTables)
        .then(()=>{

        })
    });
}, []);
    return (<SafeAreaView>
      <View style={styles.scrollView}>
        <Text style={styles.sectionTitle}>דיווח שעות</Text>
      </View>
      <View >
      
      <TouchableOpacity onPress={()=>updateDatabase(true,true)}
          
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
        
        
        <TouchableOpacity onPress={updateDatabase}>
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
        <TouchableOpacity onPress={updateDatabase}
          style={styles.buttonFacebookStyle}
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
        
        
        <TouchableOpacity onPress={updateDatabase}>
        <View style={styles.action}>
          <Image style={{width:32,height:32}}
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
  buttonTextStyle:
  {
    width:200,
    borderWidth:0,
  },
  scrollView: {
    
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


