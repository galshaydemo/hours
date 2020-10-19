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
  Button,
} from 'react-native';

import SQLite from "react-native-sqlite-storage";

export default function App()
{
  const createTables=()=>
  {
    const sqlName="CREATE TABLE IF NOT EXISTS Hours( " +
    "hour_id INTEGER PRIMARY KEY NOT NULL, " +
    "day INTEGER, month INTEGER,year INTEGER,stHour INTEGER,stMinute INTEGER,enHour INTEGER,enMinute INTEGER" +
  ");"
    console.log('create table')
    console.log(db);
    db.transaction(tx  => {
      tx.executeSql(
        sqlName
      )
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
  const updateDatabase=()=>
  {
    setStatus(!status)
    db.transaction(tx => {
      tx.executeSql(
      "insert into Hours (day,month,year,stHour,stMinute,enHour,enMinute) values(1,1,2000,10,5,12,6)")
    .then(()=>{
      console.log('add record');
    })
  })
}
  useEffect(function() {
    SQLite.DEBUG(true);
    SQLite.enablePromise(true);

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
      <View>
        <Button title={status ? "Start":"End"} onPress={updateDatabase}></Button>
        <Button title="Read" onPress={readData}></Button>
        
      </View>
      </SafeAreaView>)
  }

  

const styles = StyleSheet.create({
  scrollView: {
    
  },
  engine: {
    position: 'absolute',
    right: 0,
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


