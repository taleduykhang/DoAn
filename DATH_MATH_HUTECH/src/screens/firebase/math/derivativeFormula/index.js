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
import styles from './styles'
export default function derivativeFormula () {
    
    const [post,setPost]=useState([]);
    const [steps, setSteps] = useState([]);
    const [math, setMath] = useState('');
    const [visible, setVisible] = useState(false);
    const [isLoad, setIsLoad] = useState(false);
    const [ketQua, setKetQua] = useState('');
    const [isKetQua, setIsKetQua] = useState(false);
    const [isList, setIsList] = useState(false);
    useEffect(() =>{
        setIsList(true)
        db.ref('derivative').on('value', querySnapShot => {
        const data = querySnapShot.val() ? querySnapShot.val() : {};
        //const todoItems = {...data};
        setPost(data);
        setIsList(false)
        });
        console.log(post)
    },[])

    const _onPressDerivative = async (item) => {
        setMath(item);
        setVisible(true);
        setIsLoad(true);
        setIsKetQua(true);
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
                setKetQua(kq.toString())
                setIsKetQua(false)
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
                    setSteps([])
                    //setVisible(false);
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
            <TouchableOpacity style={{borderBottomWidth:0.5,borderColor:'#0000ff'}} onPress={() => _onPressDerivative(item.math)}>
                <Text style={{color:'#0000ff'}}>Xem ví dụ</Text>
            </TouchableOpacity>
            </View>
        </View>
        )
    }
    const onPressModal = () => {
        setVisible(!visible)
    }
    return(
        <View style={styles.container}>
            {isList?(
                <View style={styles.containerLoading}>
                        <ActivityIndicator size="small" color="#54CCB6" />
                        <Text style={{fontSize: 13, color: '#54CCB6'}}>{'Đang lấy danh sách xin chờ giây lát'}</Text>
                        </View>
            ):(
                <FlatList
                    nestedScrollEnabled={true}
                    scrollEnabled={true}
                    data={post}
                    renderItem={_renderItemDerivative}
                    keyExtractor={item => item.derivative}
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
        </Modal>
        </View>
    )
}

