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

export default function trigonometricFormula () {
    
    
    const [steps, setSteps] = useState([]);
    const [math, setMath] = useState('');
    const [visible, setVisible] = useState(false);
    const [isLoad, setIsLoad] = useState(false);
    
    const [isKetQua, setIsKetQua] = useState(false);
    const [isList, setIsList] = useState(false);

    const [title1, setTitle1] = useState('');
    const [titleAgainst, setTitleAgainst] = useState('');
    const [against, setAgainst] = useState([]);
    const [titleCompensate, setTitleCompensate] = useState('');
    const [compensate,setCompensate]=useState([]);
    const [titleDependent, setTitleDependent] = useState('');
    const [dependent,setDependent]=useState([]);
    const [titlePi, setTitlePi] = useState('');
    const [pi,setPi]=useState([]);
    const [titlePiDevide, setTitlePiDevide] = useState('');
    const [piDevide, setPiDevide] = useState([]);
    useEffect(() =>{
        setIsList(true)
        db.ref('trigonometricFormula').on('value', querySnapShot => {
        const data = querySnapShot.val() ? querySnapShot.val() : {};
        //const todoItems = {...data};
        setIsList(false)
        setTitle1(data.relatedBows.title)

        setTitleAgainst(data.relatedBows.against.title)
        setAgainst(data.relatedBows.against.formula)

        setTitleCompensate(data.relatedBows.compensate.title)
        setCompensate(data.relatedBows.compensate.formula)

        setTitleDependent(data.relatedBows.dependent.title)
        setDependent(data.relatedBows.dependent.formula)

        setTitlePi(data.relatedBows.pi.title)
        setPi(data.relatedBows.pi.formula)
        
        setTitlePiDevide(data.relatedBows.piDivide.title)
        setPiDevide(data.relatedBows.piDivide.formula)
        });
        
    },[])



    const _renderItem = ({item}) => {
        return (
        <View style={{flex:1,backgroundColor:'white',paddingHorizontal:40}}>
            <View style={{alignItems: 'center',marginHorizontal:5,flexDirection: 'row',justifyContent:'space-between'}}>
                <MathText
                value={'$$'+item.math+'$$'}
                direction="ltr"
                />
            </View>
        </View>
        )
    }

    return(
        
        <View style={{flex:1}}>
            <ScrollView style={{marginBottom:10}}>
            <View style={{paddingTop:10,backgroundColor:'white'}}>
                <Text style={{fontSize:24,fontWeight:'bold',padding:10}}>{title1}</Text>
                <View style={{borderWidth:1,marginHorizontal:15,paddingLeft:20}}>
                    <MathText
                        value={titleAgainst}
                        direction="ltr"
                    />
                    <FlatList
                            nestedScrollEnabled={true}
                            scrollEnabled={true}
                            data={against}
                            renderItem={_renderItem}
                            keyExtractor={item => item.id}
                        />
                </View>
                <View style={{borderLeftWidth:1,borderRightWidth:1,marginHorizontal:15,paddingLeft:20,borderBottomWidth:1}}>
                    <MathText
                        value={titleCompensate}
                        direction="ltr"
                    />
                    <FlatList
                            nestedScrollEnabled={true}
                            scrollEnabled={true}
                            data={compensate}
                            renderItem={_renderItem}
                            keyExtractor={item => item.id}
                        />
                        
                </View>
                <View style={{borderBottomWidth:1,borderLeftWidth:1,borderRightWidth:1,marginHorizontal:15,paddingLeft:20}}>
                <MathText
                        value={titleDependent}
                        direction="ltr"
                    />
                <FlatList
                        nestedScrollEnabled={true}
                        scrollEnabled={true}
                        data={dependent}
                        renderItem={_renderItem}
                        keyExtractor={item => item.id}
                    />
                </View>
               
                <View style={{borderLeftWidth:1,borderRightWidth:1,marginHorizontal:15,paddingLeft:20,borderBottomWidth:1}}>
                <MathText
                    value={titlePi}
                    direction="ltr"
                />
                <FlatList
                        nestedScrollEnabled={true}
                        scrollEnabled={true}
                        data={pi}
                        renderItem={_renderItem}
                        keyExtractor={item => item.id}
                    />
                    </View>
                
                <View style={{borderLeftWidth:1,borderRightWidth:1,marginHorizontal:15,paddingLeft:20,borderBottomWidth:1}}>
                <MathText
                    value={titlePiDevide}
                    direction="ltr"
                />
                <FlatList
                        nestedScrollEnabled={true}
                        scrollEnabled={true}
                        data={piDevide}
                        renderItem={_renderItem}
                        keyExtractor={item => item.id}
                    />
                    </View>
                

                </View>
                
            
            </ScrollView>
            
            {/* {isList?(
                <View style={{ flex: 1,justifyContent: "center",backgroundColor:'white',alignItems: 'center'}}>
                        <ActivityIndicator size="small" color="#54CCB6" />
                        <Text style={{fontSize: 13, color: '#54CCB6'}}>{'Đang lấy danh sách xin chờ giây lát'}</Text>
                        </View>
            ):(
                <FlatList
                    nestedScrollEnabled={true}
                    scrollEnabled={true}
                    data={post}
                    renderItem={_renderItemDerivative}
                    keyExtractor={item => item.integral}
                />
            )}
            
            <Modal visible={visible} onBackdropPress={onPressModal}>
                <View style={styles.modalView}>
                    <View style={{alignItems: 'center',backgroundColor:'#54CCB6',height:'10%',justifyContent: 'center', borderTopStartRadius:20, borderTopEndRadius:20}}>
                        <Text style={{fontSize: 26, color: 'white',fontWeight:'bold'}}>{'Kết quả'}</Text>
                    </View>
                    <View style={{alignItems: 'center', borderBottomWidth:0.5,flexDirection: 'row'}}>
                        <Text style={{marginLeft:15,paddingTop:3}}>{'Đạo hàm bài toán: '}</Text>
                        <MathText
                            value={'$$'+math+'$$'}
                            direction="ltr"
                        />
                    </View>
                    {isKetQua ? (
                        <View style={{ flex: 1,justifyContent: "center",backgroundColor:'white',alignItems: 'center'}}>
                        <ActivityIndicator size="small" color="#54CCB6" />
                        <Text style={{fontSize: 13, color: '#54CCB6'}}>{'Đang lấy kết quả xin chờ giây lát'}</Text>
                        </View>
                        
                    ):(
                        <View style={{justifyContent: 'center',alignItems: 'center',borderBottomWidth:0.5}}>
                        <Text style={{marginTop:15}}>{'Kết quả'}</Text>
                        <MathText
                            value={'$$'+ketQua+'$$'}
                            direction="ltr"
                        />
                        </View>
                    )}
                    {
                        isLoad ? (
                            <View style={{ flex: 1,justifyContent: "center",backgroundColor:'white',alignItems: 'center'}}>
                        <ActivityIndicator size="small" color="#54CCB6" />
                        <Text style={{fontSize: 13, color: '#54CCB6'}}>{'Đang giải bài toán xin chờ giây lát'}</Text>
                        </View>
                        ) : (
                            <FlatList
                                        nestedScrollEnabled={true}
                                        scrollEnabled={true}
                                        data={steps}
                                        renderItem={_renderItem}
                                        keyExtractor={item => item.expression}
                                    />
                )
            }
                    
                    </View>
        </Modal> */}
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