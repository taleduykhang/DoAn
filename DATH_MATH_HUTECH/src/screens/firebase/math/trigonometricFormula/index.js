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

    const [title2, setTitle2] = useState('');
    const [basic, setBasic] = useState([]);

    const [title3, setTitle3] = useState('');
    const [add, setAdd] = useState([]);

    const [title4, setTitle4] = useState('');
    const [titleDuplicate, setTitleDuplicate]  = useState('');
    const [duplicate, setDuplicate] =  useState([]);
    const [titleTriple, setTitleTriple]  = useState('');
    const [triple, setTriple] =  useState([]);

    const [title5, setTitle5] = useState('');
    const [downgraded, setDowngraded] = useState([]);

    const [title6, setTitle6] = useState('');
    const [total, setTotal] = useState([]);

    const [title7, setTitle7] = useState('');
    const [volume, setVolume] = useState([]);

    useEffect(() =>{
        setIsList(true)
        db.ref('trigonometricFormula').on('value', querySnapShot => {
        const data = querySnapShot.val() ? querySnapShot.val() : {};
        //const todoItems = {...data};
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

        setTitle2(data.basicTrigonometry.title)
        setBasic(data.basicTrigonometry.formula)

        setTitle3(data.add.title)
        setAdd(data.add.formula)

        setTitle4(data.multiply.title)
        
        setTitleDuplicate(data.multiply.duplicated.title)
        setDuplicate(data.multiply.duplicated.formula)

        setTitleTriple(data.multiply.triple.title)
        setTriple(data.multiply.triple.formula)

        setTitle5(data.downgraded.title)
        setDowngraded(data.downgraded.formula)

        setTitle6(data.total.title)
        setTotal(data.total.formula)

        setTitle7(data.volume.title)
        setVolume(data.volume.formula)
        setIsList(false)
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
        
        <View style={{flex:1,backgroundColor:'white'}}>
            {isList?(
                <View style={{ flex: 1,justifyContent: "center",backgroundColor:'white',alignItems: 'center'}}>
                        <ActivityIndicator size="small" color="#54CCB6" />
                        <Text style={{fontSize: 13, color: '#54CCB6'}}>{'Đang lấy danh sách xin chờ giây lát'}</Text>
                        </View>
            ):(
                <ScrollView style={{marginBottom:10}}>
            <View style={{paddingTop:10}}>
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
                    
                <View style={{paddingTop:10}}>
                    <Text style={{fontSize:24,fontWeight:'bold',padding:10}}>{title2}</Text>
                    <View style={{marginHorizontal:15,paddingLeft:20,borderWidth:1}}>
                        <FlatList
                                nestedScrollEnabled={true}
                                scrollEnabled={true}
                                data={basic}
                                renderItem={_renderItem}
                                keyExtractor={item => item.id}
                            />
                    </View>
                </View>

                <View style={{paddingTop:10}}>
                    <Text style={{fontSize:24,fontWeight:'bold',padding:10}}>{title3}</Text>
                    <View style={{marginHorizontal:15,paddingLeft:20,borderWidth:1}}>
                        <FlatList
                                nestedScrollEnabled={true}
                                scrollEnabled={true}
                                data={add}
                                renderItem={_renderItem}
                                keyExtractor={item => item.id}
                            />
                    </View>
                </View>

                <View style={{paddingTop:10}}>
                    <Text style={{fontSize:24,fontWeight:'bold',padding:10}}>{title4}</Text>
                    <View style={{marginHorizontal:15,paddingLeft:20,borderWidth:1}}>
                            <MathText
                            value={titleDuplicate}
                            direction="ltr"
                        />
                        <FlatList
                                nestedScrollEnabled={true}
                                scrollEnabled={true}
                                data={duplicate}
                                renderItem={_renderItem}
                                keyExtractor={item => item.id}
                            />
                    </View>
                    <View style={{marginHorizontal:15,paddingLeft:20,borderRightWidth:1,borderBottomWidth:1,borderLeftWidth:1}}>
                            <MathText
                            value={titleTriple}
                            direction="ltr"
                        />
                        <FlatList
                                nestedScrollEnabled={true}
                                scrollEnabled={true}
                                data={triple}
                                renderItem={_renderItem}
                                keyExtractor={item => item.id}
                            />
                    </View>
                </View>

                <View style={{paddingTop:10}}>
                    <Text style={{fontSize:24,fontWeight:'bold',padding:10}}>{title5}</Text>
                    <View style={{marginHorizontal:15,paddingLeft:20,borderWidth:1}}>
                        <FlatList
                                nestedScrollEnabled={true}
                                scrollEnabled={true}
                                data={downgraded}
                                renderItem={_renderItem}
                                keyExtractor={item => item.id}
                            />
                    </View>
                </View>

                <View style={{paddingTop:10}}>
                    <Text style={{fontSize:24,fontWeight:'bold',padding:10}}>{title6}</Text>
                    <View style={{marginHorizontal:15,paddingLeft:20,borderWidth:1}}>
                        <FlatList
                                nestedScrollEnabled={true}
                                scrollEnabled={true}
                                data={total}
                                renderItem={_renderItem}
                                keyExtractor={item => item.id}
                            />
                    </View>
                </View>

                <View style={{paddingTop:10}}>
                    <Text style={{fontSize:24,fontWeight:'bold',padding:10}}>{title7}</Text>
                    <View style={{marginHorizontal:15,paddingLeft:20,borderWidth:1}}>
                        <FlatList
                                nestedScrollEnabled={true}
                                scrollEnabled={true}
                                data={volume}
                                renderItem={_renderItem}
                                keyExtractor={item => item.id}
                            />
                    </View>
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