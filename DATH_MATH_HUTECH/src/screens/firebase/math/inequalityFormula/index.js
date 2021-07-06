import React, {useLayoutEffect, useEffect, useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    Dimensions,
    TextInput,
    Alert,
    FlatList,
    ActivityIndicator,
    SafeAreaView, 
    
  } from 'react-native';
import {db} from '../../configFirebase'
import axios from 'axios';
import Modal from 'react-native-modal';
import MathView, { MathText } from 'react-native-math-view';
const {width: WIDTH} = Dimensions.get('window');
const {height: HEIGHT} = Dimensions.get('window');

export default function inequalityFormula () {
    
    
    const [isList, setIsList] = useState(false);

    const [title1, setTitle1] = useState('');
    const [inequality, setInequality] = useState([]);

    useEffect(() =>{
        setIsList(true)
        db.ref('inequalityFormula').on('value', querySnapShot => {
        const data = querySnapShot.val() ? querySnapShot.val() : {};
        //const todoItems = {...data};
        setInequality(data)

        
        setIsList(false)
        });
        
    },[])



    const _renderItem = ({item}) => {
        return (
        <View style={{flex:1,backgroundColor:'white',paddingHorizontal:40,borderWidth:0.5,marginHorizontal:15}}>
            <Text style={{fontSize:18,paddingTop:10}}>{item.title}</Text>
            <View style={{marginHorizontal:5,paddingLeft:30}}>
                <MathText
                value={'$$'+item.math+'$$'}
                direction="ltr"
                />
            </View>
        </View>
        )
    }

    return(
        
        <View style={{flex:1,backgroundColor:'white'}}>
            {isList?(
                <View style={{ flex: 1,justifyContent: "center",backgroundColor:'white',alignItems: 'center'}}>
                        <ActivityIndicator size="small" color="#54CCB6" />
                        <Text style={{fontSize: 13, color: '#54CCB6'}}>{'Đang lấy danh sách xin chờ giây lát'}</Text>
                        </View>
            ):(
                <ScrollView style={{marginBottom:10}}>
                <View style={{paddingTop:10}}>
                        <FlatList
                                nestedScrollEnabled={true}
                                scrollEnabled={true}
                                data={inequality}
                                renderItem={_renderItem}
                                keyExtractor={item => item.id}
                            />
                </View>
            
            </ScrollView>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
      alignItems: 'center',
      flex:1,
    },
    titleResult:{
      fontSize: 23,
      borderBottomWidth:1,
      width:'100%',
      textAlign:'center',
      paddingBottom:15,
      paddingTop:15
    },
    title: {
      fontSize: 35,
      marginVertical: 40,
    },
    image: {
      height: 300,
      width: 300,
      marginTop: 30,
      borderRadius: 10,
    },
    buttonCamera: {
      width: 80,
      height: 80,
      backgroundColor: 'gray',
      color: '#fff',
      justifyContent: 'space-around',
      alignItems: 'center',
      borderRadius: 20,
      borderWidth:0.5,
      // marginRight: 10,
    },
    modalView: {
      height:HEIGHT-50,
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 2,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 20
    },
    buttonGallery: {
      width: 80,
      height: 80,
      backgroundColor: '#e6f2ff',
      borderColor: '#333333',
      justifyContent: 'space-around',
      alignItems: 'center',
      borderRadius: 20,
      borderWidth:0.5
    },
    input: {
      width: WIDTH-100,
      height: 50,
      borderRadius: 5,
      fontSize: 14,
      backgroundColor: 'white',
      paddingLeft: 5,
      borderColor: '#333333',
      borderWidth:0.5
    },
    buttonResult:{
      justifyContent: 'space-around',
      alignItems: 'center',
      width:50,
      height:50,
      marginLeft:10,
      backgroundColor:'white',
      borderRadius:20,
      borderColor: '#333333',
      borderWidth:0.5
    },
    buttonResultImage:{
      justifyContent: 'space-around',
      alignItems: 'center',
      width:30,
      height:30,
      marginLeft:10,
      backgroundColor:'white',
      borderRadius:10,
      borderColor: '#333333',
      borderWidth:0.5
    }
  });