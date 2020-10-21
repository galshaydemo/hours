import React, { useState } from "react";
import {
  Alert,
    Button,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";

export default function PickerNumber ({num,inRow} ) {
  const [modalVisible, setModalVisible] = useState(false);
  const days=Array.from(Array(31).keys());

  const rows = Array.from(Array(inRow).keys());
  console.log(num)
  console.log(inRow)
  let a = (num / inRow)
  console.log(a)
  if ( a > Math.floor(a)) a=Math.floor(a)+1;else a=a
  const cols = Array.from(Array(a).keys());
  return (
    <View style={styles.centeredView}>
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
                <View >
                    {
                        rows.map((item)=>
                        {
                            return(
                            <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:3}}>
                            {cols.map((c)=>
                            {
                                const label=item*inRow+c+1;
                                const labelStr = label < 10 ? '0' + label.toString() :label.toString();

                                if ( label < num+1)
                                return (<View style={{paddingHorizontal:2}}><Button key={labelStr} title={labelStr} onPress={()=>{setModalVisible(!modalVisible)}}></Button></View>)

                            })
                        }
                            </View>
                            )

                        })
                    }
                    
                
                </View>
                </View>
                </View>
      </Modal>

      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
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
  
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

