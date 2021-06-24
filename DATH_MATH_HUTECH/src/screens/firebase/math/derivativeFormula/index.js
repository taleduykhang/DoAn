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

export default function derivativeFormula () {
    
    const [post,setPost]=useState([]);
    const [steps, setSteps] = useState([]);
    const [math, setMath] = useState('');
    const [visible, setVisible] = useState(false);
    const [isLoad, setIsLoad] = useState(false);
    useEffect(() =>{
        db.ref('derivative').on('value', querySnapShot => {
        const data = querySnapShot.val() ? querySnapShot.val() : {};
        //const todoItems = {...data};
        setPost(data);
        
        });
        console.log(post)
    },[])

    const _onPressDerivative = async (item) => {
        setMath(item);
        setVisible(true);
        setIsLoad(true)
            try{
                axios.post(`https://mathsolver.microsoft.com/cameraexp/api/v1/solvelatex`, { 
                "latexExpression": item,
                "clientInfo": {
                    "platform": "mobile",
                    "mkt": 'vi',
                },
                // "customLatex": text,
            })
            .then(res => {
                let evalData = JSON.parse(res.data.results[0].tags[0].actions[0].customData);
                let evalData1 = JSON.parse(evalData.previewText);
                console.log(evalData1.mathSolverResult)
                if(evalData1.mathSolverResult==null)
                {
                    Alert.alert(
                        "Thông báo",
                        "Không thể giải bài toán này",
                        [
                        { text: "OK"}
                        ],
                        { cancelable: false }
                    );
                    setIsLoad(false)
                    setVisible(false);
                }
                else{
                console.log(evalData1.mathSolverResult.actions[0].solution)
                let kq=evalData1.mathSolverResult.actions[0].solution
                // setMath(kq.toString())
                if(evalData1.mathSolverResult.actions[0].templateSteps[0]!=undefined)
                {
                    console.log(evalData1.mathSolverResult.actions[0].templateSteps[0].templateName)
                    console.log(evalData1.mathSolverResult.actions[0].templateSteps[0].steps[0].step)
                    setSteps(evalData1.mathSolverResult.actions[0].templateSteps[0].steps)
                    console.log(steps)
                    setIsLoad(false)
                }
                else{
                    
                    Alert.alert(
                        "Thông báo",
                        "Vẫn chưa có bước giải cho bài toán này",
                        [
                        { text: "OK"}
                        ],
                        { cancelable: false }
                    );
                    setIsLoad(false)
                    setVisible(false);
                }
                }
            })
            }catch(err){
                console.log(err)
            }
        }

        const _renderItem = ({item}) => {
            return (
                <View style={{flex:1,marginTop: 30}}>
                    
                    <View style={{paddingHorizontal:15}}>
                        <MathText
                        value={item.step}
                        direction="ltr"
                        />
                    </View>
                    <View style={{alignItems: 'center'}}>
                    <MathText
                        value={item.expression}
                        direction="ltr"
                    />
                    </View>
                    <View style={{backgroundColor:'#858585',height:1}}>
                    </View>
                </View>
            )
        }

    const _renderItemDerivative = ({item}) => {
        return (
        <View style={{flex:1,borderBottomWidth:0.5,backgroundColor:'white',paddingHorizontal:40}}>
            <View style={{alignItems: 'center',marginHorizontal:5,flexDirection: 'row',justifyContent:'space-between'}}>
                <MathText
                value={'$$'+item.derivative+'$$'}
                direction="ltr"
                />
            <TouchableOpacity style={{borderBottomWidth:0.5}} onPress={() => _onPressDerivative(item.math)}>
                <Text>Xem ví dụ</Text>
            </TouchableOpacity>
            </View>
        </View>
        )
    }
    const onPressModal = () => {
        setVisible(!visible)
    }
    return(
        <View style={{flex:1}}>
            <FlatList
                    nestedScrollEnabled={true}
                    scrollEnabled={true}
                    data={post}
                    renderItem={_renderItemDerivative}
                    keyExtractor={item => item.derivative}
            />
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
        </Modal>
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