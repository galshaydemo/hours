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
import { FlatList } from 'react-native-gesture-handler';
import { reportHour } from './interfaces';
export default function Home()
{
    useEffect(function() {
        SQLite.DEBUG(true);
        SQLite.enablePromise(true);
        
        SQLite.openDatabase({
            name: "TestDatabase",
            location: "default"
        }).then((db) => {
          setDb(db)   
          readData(db)         
        });
    }, []);
    
  
    
      
  
    
    const [db, setDb] = useState(null);
    const [data, setData] = useState([]);
    const readData = (localDb) => {
    var temp=[]
    const sqlName="select s.day,s.month,s.year,s.hour as sHour,s.minute as sMinute,e.hour as eHour,e.minute as eMinute,(60.0*e.Hour + e.Minute -(60*s.Hour+s.Minute))/60.0 as hours,s.dayWeek  from (SELECT * FROM hours where status=0) s left join  (SELECT * FROM hours where status=1) e on e.day=s.day and e.month=s.month and e.year=s.year"
      localDb.transaction(tx => {
        
        // sending 4 arguments in executeSql
        tx.executeSql(sqlName, [], // passing sql query and parameters:null
        (tx,results) => {
          console.log('aaa')
          console.log(results.rows.length)
          for(let i=0;i<results.rows.length;i++)
          {
              console.log(i)
              let tempObject=new reportHour();
              console.log('row i'+i)
              
              
              temp.push(tempObject)
              console.log('after push')
          }
          console.log(temp)
          setData(temp)
        }
          
      ) // end transaction
      })
    }
    
  
    return (<SafeAreaView>
      <View style={styles.scrollView}>
        <Text style={styles.sectionTitle}>דוח שעות</Text>
        <FlatList data={data}  renderItem={({ item, index }) => {
        return <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text>{item.dayName()}</Text>
                <Text>{item.timeStart()}</Text>
                <Text>{item.timeEnd()}</Text>
                <Text>{item.weekDayName()}</Text>
                <Text>{item.hoursStr()}</Text>
                </View>
        }}></FlatList>
      </View>
      </SafeAreaView>
      )
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