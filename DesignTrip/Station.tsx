import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TextInput,
  ListRenderItem,
  FlatList,
  View
} from "react-native";
const customData = require('./../Data/stat.json');

interface IStation {
        Name: string;
        group: string;
        location: string;
        size: string;
    }
let list: Array<IStation> = customData;
type StationParam = {
  name: string,
  value:string,
  onChange:Function
  
  
}
const Station=({value,name,onChange}:StationParam)=> {
  
  const a=(item:IStation)=>
  {
      setModalVisible(false)
      setStation(item.Name)
	  onChange(item.Name)

  }
      
  const renderItem = ( {item}: {item:IStation} ) => (
    <TouchableHighlight onPress={()=>a(item)}>
    <View style={styles.station}><Text>{item.Name}</Text></View>
    </TouchableHighlight>
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [station, setStation] = useState(value);
  return (
    <View style={styles.centeredView}>
      <View style={{flexDirection:'row'}}>
      <View><Text style={{paddingLeft:10,width:70,paddingRight:10}} >{name}</Text></View>
      <TouchableHighlight onPress={()=>setModalVisible(true)} style={styles.appButtonContainer}>
		  <Text style={styles.appButtonText}>תחנה</Text>
	  </TouchableHighlight>
      <View style={{borderWidth:1,borderRadius:5,flexDirection:'row',paddingHorizontal:3}}>
      
      <Text style={{width:160}} >{station}</Text>
      </View>
      
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FlatList keyExtractor={(item, index) => item.Name}
			renderItem={renderItem}  data={list} numColumns={2}></FlatList>

            
          </View>
        </View>
      </Modal>

      
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    marginTop: 22
  },
  modalView: {
    margin: 10,
    backgroundColor: "#808080",
    borderRadius: 20,
    padding: 5,
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
  station:{
    width:150,
    borderWidth:0,
    fontSize:10,
    padding:3,
    margin:3,

  },
    appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 1,
    paddingHorizontal: 2,
    marginHorizontal:3,
    marginTop:4,
    width:110,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});

export default Station
