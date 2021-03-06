import React, {useState,useEffect,useLayoutEffect}from 'react';
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
  SafeAreaView
} from 'react-native';
import {
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker';
import Latex from 'react-native-latex';
import ml from '@react-native-firebase/ml';

import MathJax from 'react-native-mathjax'
import axios from 'axios';
import {IconCamera,IconSad,IconEqual,IconGallery,IconBar} from '../../../resource/icons';
import Modal from 'react-native-modal';
// import { StaticMathField  } from 'react-mathquill'
import MathView, { MathText } from 'react-native-math-view';
const {width: WIDTH} = Dimensions.get('window');
const {height: HEIGHT} = Dimensions.get('window');
//import derivative from '../../Data/derivative'
import Keyboard from '../../components/keyboard'
import {db} from '../../firebase/configFirebase'
export default function Analytics(navigation) {
  const [image, setImage] = useState();
  const [text, setText] = useState();
  const [result, setResult] = useState({});
  const [steps, setSteps] = useState([]);
  const [derivative, setDerivative] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visibleImage, setVisibleImage] = useState(false);
  const [ketQua, setKetQua] = useState('');
  const [isLoad, setIsLoad] = useState(false);
  const [baiToan, setBaiToan] = useState('');
  const [isGiai, setIsGiai] = useState(false);
  const [isBuoc, setIsBuoc] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [flag, setFlag] = useState('vi');
  const [isVN, setIsVN] = useState(true);
  const [isList, setIsList] = useState(false);
  const onTakePhoto = () => launchCamera({mediaType: 'image'}, onMediaSelect);
  const onChangeText = (text) => {
    setBaiToan(text);
  };
  const onSelectImagePress = () =>
    launchImageLibrary({mediaType: 'image'}, onMediaSelect);
    useEffect(() =>{
      setIsList(true)
      db.ref('derivativeMath').on('value', querySnapShot => {
      const data = querySnapShot.val() ? querySnapShot.val() : {};
      //const todoItems = {...data};
      setDerivative(data);
      setIsList(false)
      });
      console.log(derivative)
  },[])
    const onPressMathImage = async () => {
      setIsLoad(true)
      setIsGiai(false)
        console.log(text)
        try{
          axios.post(`https://mathsolver.microsoft.com/cameraexp/api/v1/solvelatex`, { 
          "latexExpression": '\\displaystyle\\frac{d}{d x  }  \\left('+text+'\\right)',
          "clientInfo": {
              "platform": "mobile",
              "mkt": flag,
          },
          // "customLatex": text,
        })
        .then(res => {
          let evalData = JSON.parse(res.data.results[0].tags[0].actions[0].customData);
          let evalData1 = JSON.parse(evalData.previewText);
          console.log(evalData1.mathSolverResult)
          if(evalData1.mathSolverResult==null)
          {
            if(isVN==true)
            {
              Alert.alert(
                "Th??ng ba??o",
                "Kh??ng th???? gia??i ba??i toa??n na??y",
                [
                  { text: "OK"}
                ],
                { cancelable: false }
              );
            }
            else{
            Alert.alert(
              "Notification",
              "Can't solve this problem",
              [
                { text: "OK"}
              ],
              { cancelable: false }
            );}
            setIsGiai(false)
            setIsLoad(false)
          }
          else{
            console.log(evalData1.mathSolverResult.actions[0].solution)
            let kq=evalData1.mathSolverResult.actions[0].solution
            setKetQua(kq.toString())
            if(evalData1.mathSolverResult.actions[0].templateSteps[0]!=undefined)
            {
              console.log(evalData1.mathSolverResult.actions[0].templateSteps[0].templateName)
              console.log(evalData1.mathSolverResult.actions[0].templateSteps[0].steps[0].step)
              setSteps(evalData1.mathSolverResult.actions[0].templateSteps[0].steps)
              console.log(steps)
              setIsBuoc(true)
              setIsGiai(true)
              setIsLoad(false)
            }
            else{
              setIsLoad(false)
              setIsBuoc(false)
              setIsGiai(true)
              if(isVN==true)
              {
                Alert.alert(
                  "Th??ng ba??o",
                  "V????n ch??a co?? b??????c gia??i cho ba??i toa??n na??y",
                  [
                    { text: "OK"}
                  ],
                  { cancelable: false }
                );
              }
              else{
                Alert.alert(
                  "Notification",
                  "There is no solution to this problem yet",
                  [
                    { text: "OK"}
                  ],
                  { cancelable: false }
                );
              }
            }
          }
          
          // setSteps(evalData1.mathSolverResult.actions[0].templateSteps[0].steps)
          // console.log(steps)
        })
        }catch(err){
          console.log(err)
        }
        
      
      
      
    } 
  const onPressMath = async () => {
    setIsLoad(true)
    setIsGiai(false)
    if(baiToan==''||baiToan==undefined)
    {
      
          if(isVN==true)
            {
              Alert.alert(
                "Th??ng ba??o",
                "Ba??n pha??i nh????p phe??p toa??n",
                [
                  { text: "OK"}
                ],
                { cancelable: false }
              );
            }
            else{
              Alert.alert(
                "Notification",
                "You must enter math",
                [
                  { text: "OK"}
                ],
                { cancelable: false }
              );}
      setIsLoad(false)
    }
    else{
      console.log(baiToan)
      try{
        axios.post(`https://mathsolver.microsoft.com/cameraexp/api/v1/solvelatex`, { 
        "latexExpression": '\\displaystyle\\frac{d}{d x  }  \\left('+baiToan+'\\right)',
        "clientInfo": {
            "platform": "mobile",
            "mkt": flag,
        },
        // "customLatex": text,
      })
      .then(res => {
        let evalData = JSON.parse(res.data.results[0].tags[0].actions[0].customData);
        let evalData1 = JSON.parse(evalData.previewText);
        console.log(evalData1.mathSolverResult)
        if(evalData1.mathSolverResult==null)
        {
          if(isVN==true)
            {
              Alert.alert(
                "Th??ng ba??o",
                "Kh??ng th???? gia??i ba??i toa??n na??y",
                [
                  { text: "OK"}
                ],
                { cancelable: false }
              );
            }
            else{
            Alert.alert(
              "Notification",
              "Can't solve this problem",
              [
                { text: "OK"}
              ],
              { cancelable: false }
            );}
            setIsGiai(false)
            setIsLoad(false)
        }
        else{
          console.log(evalData1.mathSolverResult.actions[0].solution)
          let kq=evalData1.mathSolverResult.actions[0].solution
          setKetQua(kq.toString())
          if(evalData1.mathSolverResult.actions[0].templateSteps[0]!=undefined)
          {
            console.log(evalData1.mathSolverResult.actions[0].templateSteps[0].templateName)
            console.log(evalData1.mathSolverResult.actions[0].templateSteps[0].steps[0].step)
            setSteps(evalData1.mathSolverResult.actions[0].templateSteps[0].steps)
            console.log(steps)
            setIsBuoc(true)
            setIsGiai(true)
            setIsLoad(false)
          }
          else{
            setIsLoad(false)
            setIsBuoc(false)
            setIsGiai(true)
            if(isVN==true)
            {
              Alert.alert(
                "Th??ng ba??o",
                "V????n ch??a co?? b??????c gia??i cho ba??i toa??n na??y",
                [
                  { text: "OK"}
                ],
                { cancelable: false }
              );
            }
            else{
              Alert.alert(
                "Notification",
                "There is no solution to this problem yet",
                [
                  { text: "OK"}
                ],
                { cancelable: false }
              );
            }
          }
        }
        
        // setSteps(evalData1.mathSolverResult.actions[0].templateSteps[0].steps)
        // console.log(steps)
      })
      }catch(err){
        console.log(err)
      }
      
    }
    
    
  }

  const _onPressDerivative = async (item) => {
    console.log(item)
      setBaiToan('')
      setIsLoad(true)
      setIsGiai(false)
      try{
        axios.post(`https://mathsolver.microsoft.com/cameraexp/api/v1/solvelatex`, { 
        "latexExpression": item,
        "clientInfo": {
            "platform": "mobile",
            "mkt": flag,
        },
        // "customLatex": text,
      })
      .then(res => {
        let evalData = JSON.parse(res.data.results[0].tags[0].actions[0].customData);
        let evalData1 = JSON.parse(evalData.previewText);
        console.log(evalData1.mathSolverResult)
        if(evalData1.mathSolverResult==null)
        {
          if(isVN==true)
            {
              Alert.alert(
                "Th??ng ba??o",
                "Kh??ng th???? gia??i ba??i toa??n na??y",
                [
                  { text: "OK"}
                ],
                { cancelable: false }
              );
            }
            else{
            Alert.alert(
              "Notification",
              "Can't solve this problem",
              [
                { text: "OK"}
              ],
              { cancelable: false }
            );}
            setIsGiai(false)
            setIsLoad(false)
        }
        else{
          console.log(evalData1.mathSolverResult.actions[0].solution)
          let kq=evalData1.mathSolverResult.actions[0].solution
          setKetQua(kq.toString())
          if(evalData1.mathSolverResult.actions[0].templateSteps[0]!=undefined)
          {
            console.log(evalData1.mathSolverResult.actions[0].templateSteps[0].templateName)
            console.log(evalData1.mathSolverResult.actions[0].templateSteps[0].steps[0].step)
            setSteps(evalData1.mathSolverResult.actions[0].templateSteps[0].steps)
            console.log(steps)
            setIsBuoc(true)
            setIsGiai(true)
            setIsLoad(false)
          }
          else{
            setIsBuoc(false)
            setIsGiai(true)
            setIsLoad(false)
            if(isVN==true)
            {
              Alert.alert(
                "Th??ng ba??o",
                "V????n ch??a co?? b??????c gia??i cho ba??i toa??n na??y",
                [
                  { text: "OK"}
                ],
                { cancelable: false }
              );
            }
            else{
              Alert.alert(
                "Notification",
                "There is no solution to this problem yet",
                [
                  { text: "OK"}
                ],
                { cancelable: false }
              );
            }
            
          }
        }
        
      })
      }catch(err){
        console.log(err)
      }
      
    
    
  }
  
  const onMediaSelect = async (media) => {
    if (!media.didCancel) {
      setImage(media.uri);
      const result = await ml().cloudDocumentTextRecognizerProcessImage(
        media.uri,
      );
      setResult(result);
      const a = result.text.toLowerCase();
      setText(a);
      setIsImage(true);
      setVisibleImage(false);
      setBaiToan('')
      console.log(result);
    }
  };
  useEffect(() => {
    setSteps(steps)
  }, [steps])
  const onPressModal = () => {
    setVisible(!visible)
  }
  const onPressModalImage = () => {
    setVisibleImage(!visibleImage)
  }
  const _onPressCan2=()=> {
    setBaiToan(baiToan+'\\sqrt{ }');
  }
  const _onPressCan=()=> {
    setBaiToan(baiToan+'\\sqrt[ ]{ }');
  }
  const _onPressMu=()=> {
    setBaiToan(baiToan+'x^{ }');
  }
  const _onPressMu2=()=> {
    setBaiToan(baiToan+'x^{2}');
  }
  const _onPressClear=()=> {
    setBaiToan('');
    setText('');
    setIsImage(false);
  }
  const _onPressX=()=> {
    setBaiToan(baiToan+'x');
  }
  const _onPressY=()=> {
    setBaiToan(baiToan+'y');
  }
  const _onPressPhan=()=> {
    setBaiToan(baiToan+'\\frac{  }{   }');
  }

  const _onPressPhanSo=()=> {
    setBaiToan(baiToan+'{ }\\frac{  }{  }');
  }
  
  const _onPressLogE=()=> {
    setBaiToan(baiToan+'\\log_{ e }( {  } )');
  }
  const _onPressLog=()=> {
    setBaiToan(baiToan+'\\log(  )');
  }
  const _onPressChia=()=> {
    setBaiToan(baiToan+' \\div ');
  }
  const _onPressCong=()=> {
    setBaiToan(baiToan+' + ');
  }
  const _onPressTru=()=> {
    setBaiToan(baiToan+' - ');
  }
  const _onPressNhan=()=> {
    setBaiToan(baiToan+' \\cdot ');
  }
  const _onPressSin=()=> {
    setBaiToan(baiToan+' \\sin(  ) ');
  }
  const _onPressCos=()=> {
    setBaiToan(baiToan+' \\cos(  ) ');
  }
  const _onPressTan=()=> {
    setBaiToan(baiToan+' \\tan(  ) ');
  }
  const _onPressCot=()=> {
    setBaiToan(baiToan+' \\cot(  ) ');
  }
  const _onPressBang=()=> {
    setBaiToan(baiToan+' = ');
  }
  const _onPressSpace=()=> {
    setBaiToan(baiToan+' ');
  }
  const _onPressFlag=()=> {
    setIsVN(!isVN)
    setIsGiai(false)
  }
  useEffect(() => {
    if(isVN==true)
    {
      setFlag('vi');
    }
    else{
      setFlag('en');
    }
  }, [isVN])
  
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
          <View style={{flex:1,marginTop: 5,backgroundColor:'white'}}>
            <View style={{alignItems: 'center',marginHorizontal:5}}>
            <TouchableOpacity style={{borderWidth:0.5,borderRadius:5,height:50}} onPress={() => _onPressDerivative(item.derivative)}>
            <MathText
                value={'$$'+item.derivative+'$$'}
                direction="ltr"
              />
            </TouchableOpacity>
            </View>
          </View>
        )
      }

  return (
    <ScrollView contentContainerStyle={styles.screen}>

        {/* <Image
          resizeMode="contain"
          source={{uri: image}}
          style={styles.image}
        /> */}
       
        <View style={{width:'100%',backgroundColor:'white',marginBottom:10,paddingHorizontal:20}}>
        <View style={{flexDirection: 'row',marginTop: 15,width:'100%'}}>
            <TextInput value={baiToan}  style={styles.input} onChangeText={onChangeText} placeholder={isVN? 'Nh????p phe??p toa??n ??a??o ha??m':'Enter the derivative operation'} keyboardType={'numeric'}></TextInput>
            <TouchableOpacity style = {{marginTop:10,marginLeft:-40,marginRight:15}} onPress = {onPressModalImage} >
              <IconGallery size={25} color={'#9999ff'}/>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.buttonResult} onPress={onPressMath}>
              <IconEqual size={30} color={'#ff7733'}/>
            </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row',width:'100%',backgroundColor:'white',marginTop:10}}>
          <Text style={{fontSize: 13, marginTop: 18}} >{isVN?'Ba??i toa??n: ':'Problem: '} </Text>
          <View>
            <MathText
                value={'$$\\displaystyle\\frac{d}{d x  }  \\left('+baiToan+'\\right)$$'}
                direction="ltr"
              />
          </View>
        </View>
        {isImage?(
            <View style={{flexDirection: 'row'}}>
              <Text style={{paddingTop: 5,marginRight:10}}>{isVN?'Ba??i toa??n nh????n ????????c: ':'The problem gets: '} {text}</Text>
              <TouchableOpacity style = {{}} onPress={onPressMathImage}>
                <Text style={{marginTop:5, color:'#ff7733',borderBottomWidth:1,borderColor:'#ff7733'}}>{isVN?'Gia??i':'Solution'} </Text>
              </TouchableOpacity>
            </View>
          ):(null)}
        </View>
      
        {isGiai? (
          <View style={{justifyContent:'space-between',width:'100%',paddingHorizontal:20,backgroundColor:'white',marginBottom:10}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 13, paddingTop: 18}} >{isVN?'K????t qua??: ':'Result: '}</Text>
                <View>
                  <MathText
                      value={ketQua}  
                      direction="ltr"
                    />
                </View>
            </View>
            <View style={{marginBottom:10}}>
              {isBuoc  ? (
                  <TouchableOpacity onPress={onPressModal}>
                    <Text style={{fontSize: 13, color: 'rgba(0, 128, 255, 1)',borderBottomWidth:1,borderColor:'rgba(0, 128, 255, 1)',width:130}}>{isVN?'Xem ca??c b??????c gia??i ...':'See the solution steps'}</Text>
                  </TouchableOpacity>
                  
                ):(
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 13, color: '#ff7733'}}>{isVN?'Ch??a co?? ca??c b??????c gia??i cho ba??i toa??n na??y ':'There are no steps to solve this problem'}</Text>
                    <IconSad size={13} color={'#ff7733'} style={{paddingTop:3}}/>
                  </View>
                )
                }
            </View>
          </View>
          
        
        ): null}
      {
        isLoad ? (<View style={{ justifyContent: "center",paddingVertical: 10}}>
          <ActivityIndicator size="small" color="#0000ff" />
          <Text style={{fontSize: 13, color: '#0000ff'}}>{isVN?'??ang gia??i ba??i toa??n xin ch???? gi??y la??t':'Solving the math problem, please wait a moment'}</Text>
        </View>) : null
      }
      {isList?(
        <View style={{justifyContent: "center",paddingVertical: 10}}>
          <ActivityIndicator size="small" color="#0000ff" />
          <Text style={{fontSize: 13, color: '#0000ff'}}>{isVN?'??ang ta??i vi?? du?? xin ch???? gi??y la??t':'Loading example please wait a moment'}</Text>
        </View>
            ):(
              <View style={{backgroundColor:'white',padding: 10,height:100}}>
        <Text>{isVN?'Vi?? du??':'For example'}</Text>
        <FlatList
              nestedScrollEnabled={true}
              data={derivative}
              renderItem={_renderItemDerivative}
              keyExtractor={item => item.id}
              horizontal={true}
              scrollEnabled={true}
        />
      </View>
            )}
      

      <Keyboard 
        onPressMu={_onPressMu} 
        onPressMu2={_onPressMu2} 
        onPressCan={_onPressCan}
        onPressCan2={_onPressCan2}
        onPressClear={_onPressClear}
        onPressX={_onPressX}
        onPressY={_onPressY}
        onPressPhan={_onPressPhan}
        onPressLog={_onPressLog}
        onPressLogE={_onPressLogE}
        onPressPhanSo={_onPressPhanSo}
        onPressChia={_onPressChia}
        onPressCong={_onPressCong}
        onPressTru={_onPressTru}
        onPressNhan={_onPressNhan}
        onPressSin={_onPressSin}
        onPressCos={_onPressCos}
        onPressTan={_onPressTan}
        onPressCot={_onPressCot}
        onPressBang={_onPressBang}
        onPressSpace={_onPressSpace}
        onPressFlag={_onPressFlag}
        flag={isVN}
        />
      
      
      
      <Modal visible={visible} onBackdropPress={onPressModal}>
        <View style={styles.modalView}>
          <View style={{alignItems: 'center',backgroundColor:'#54CCB6',height:'10%',justifyContent: 'center', borderTopStartRadius:20, borderTopEndRadius:20}}>
            <Text style={{fontSize: 26, color: 'white'}}>{isVN?'Ca??c b??????c gia??i':'Solution steps'}</Text>
          </View>
          <FlatList
            nestedScrollEnabled={true}
            scrollEnabled={true}
            data={steps}
            renderItem={_renderItem}
            keyExtractor={item => item.expression}
          />
        </View>
      </Modal>
      <Modal visible={visibleImage} onBackdropPress={onPressModalImage}>
          <View style = {{flexDirection: 'row',backgroundColor: "rgba(221, 247, 232, 1)",borderRadius: 20,height:150,margin: 40,justifyContent:'space-around',alignItems: 'center',borderWidth:0.5}}>
            <TouchableOpacity style={styles.buttonCamera} onPress={onTakePhoto}>
              <IconCamera size={20} color={'black'}/>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.buttonGallery} onPress = {onSelectImagePress} >
              <IconGallery size={20} color={'#9999ff'}/>
            </TouchableOpacity>
          </View>
      </Modal>
    </ScrollView>
  );
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