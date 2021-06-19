import React, {useState,useEffect}from 'react';
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
  TouchableWithoutFeedback,
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
import {IconCamera,IconSad,IconEqual,IconGallery} from '../../resource/icons';
import Modal from 'react-native-modal';
// import { StaticMathField  } from 'react-mathquill'
import MathView, { MathText } from 'react-native-math-view';
const {width: WIDTH} = Dimensions.get('window');
const {height: HEIGHT} = Dimensions.get('window');
import integral from '../Data'
import Keyboard from '../components/keyboard'

export default function DashboardScreen() {
  const [image, setImage] = useState();
  const [text, setText] = useState();
  const [result, setResult] = useState({});
  const [steps, setSteps] = useState([]);
  const [visible, setVisible] = useState(false);
  const [ketQua, setKetQua] = useState('');
  const [buoc, setBuoc] = useState(0);
  const [baiToan, setBaiToan] = useState('');
  const [isGiai, setIsGiai] = useState(false);
  const [isBuoc, setIsBuoc] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const onTakePhoto = () => launchCamera({mediaType: 'image'}, onMediaSelect);
  const onChangeText = (text) => {
    setBaiToan(text);
  };
  const onSelectImagePress = () =>
    launchImageLibrary({mediaType: 'image'}, onMediaSelect);
    

    const onPressMathImage = async () => {
      if(text==''||text==undefined)
      {
        Alert.alert(
          "Thông báo",
          "Bạn phải chọn hình ảnh",
          [
            { text: "OK"}
          ],
          { cancelable: false }
        );
      }
      else{
        console.log(text)
        try{
          axios.post(`https://mathsolver.microsoft.com/cameraexp/api/v1/solvelatex`, { 
          "latexExpression": '\\int{'+text+'}dx',
          "clientInfo": {
              "platform": "mobile",
              "mkt": "vi",
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
            setIsGiai(false)
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
            }
            else{
              setIsBuoc(false)
              setIsGiai(true)
              Alert.alert(
                "Thông báo",
                "Vẫn chưa có bước giải cho bài toán này",
                [
                  { text: "OK"}
                ],
                { cancelable: false }
              );
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
  const onPressMath = async () => {
    if(baiToan==''||baiToan==undefined)
    {
      Alert.alert(
        "Thông báo",
        "Bạn phải nhập phép toán",
        [
          { text: "OK"}
        ],
        { cancelable: false }
      );
    }
    else{
      console.log(baiToan)
      try{
        axios.post(`https://mathsolver.microsoft.com/cameraexp/api/v1/solvelatex`, { 
        "latexExpression": '\\int{'+baiToan+'}dx',
        "clientInfo": {
            "platform": "mobile",
            "mkt": "vi",
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
          setIsGiai(false)
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
          }
          else{
            setIsBuoc(false)
            setIsGiai(true)
            Alert.alert(
              "Thông báo",
              "Vẫn chưa có bước giải cho bài toán này",
              [
                { text: "OK"}
              ],
              { cancelable: false }
            );
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

  const _onPressIntegral = async (item) => {
    console.log(item)
      setBaiToan('')
      try{
        axios.post(`https://mathsolver.microsoft.com/cameraexp/api/v1/solvelatex`, { 
        "latexExpression": item,
        "clientInfo": {
            "platform": "mobile",
            "mkt": "vi",
        },
        // "customLatex": text,
      })
      .then(res => {
        let evalData = JSON.parse(res.data.results[0].tags[0].actions[0].customData);
        let evalData1 = JSON.parse(evalData.previewText);
        console.log(evalData1.mathSolverResult)
        if(evalData1.mathSolverResult==null)
        {
          setKetQua('')
          Alert.alert(
            "Thông báo",
            "Không thể giải bài toán này",
            [
              { text: "OK"}
            ],
            { cancelable: false }
          );
        }
        else{
          console.log(evalData1.mathSolverResult.actions[0].solution)
          let kq=evalData1.mathSolverResult.actions[0].solution
          setKetQua(kq.toString())
          if(evalData1.mathSolverResult==null)
        {
          Alert.alert(
            "Thông báo",
            "Không thể giải bài toán này vui lòng nhập lại",
            [
              { text: "OK"}
            ],
            { cancelable: false }
          );
          setIsGiai(false)
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
          }
          else{
            setIsBuoc(false)
            setIsGiai(true)
            Alert.alert(
              "Thông báo",
              "Vẫn chưa có bước giải cho bài toán này",
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
      console.log(result);
    }
  };
  useEffect(() => {
    setSteps(steps)
  }, [steps])
  const onPressModal = () => {
    setVisible(!visible)
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
      const _renderItemIntegral = ({item}) => {
        return (
          <View style={{flex:1,marginTop: 5,backgroundColor:'white'}}>
            <View style={{alignItems: 'center',marginHorizontal:5}}>
            <TouchableOpacity style={{borderWidth:1,height:50}} onPress={() => _onPressIntegral(item.integral)}>
            <MathText
                value={'$$'+item.integral+'$$'}
                direction="ltr"
              />
            </TouchableOpacity>
            </View>
          </View>
        )
      }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
        <View style = {{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginVertical:10,
            width:'100%',
            backgroundColor:'white',
            padding:5
          }}>
          {isImage?(
            <View style={{flexDirection: 'row'}}>
            <Text style={{paddingTop: 5}}>Bài toán nhận được: {text}</Text>
        {/* <TextInput value={text}  style={styles.input} onChangeText={onChangeText} placeholder={'Chọn hình ảnh'}></TextInput> */}
            <TouchableOpacity style = {styles.buttonResultImage} onPress={onPressMathImage}>
              <IconEqual size={15} color={'#ff7733'}/>
            </TouchableOpacity>
        </View>
          ):(
            <View style = {{
            flexDirection: 'row'
          }}>
            <TouchableOpacity style={styles.buttonCamera} onPress={onTakePhoto}>
              <IconCamera size={20} color={'black'}/>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.buttonGallery} onPress = {onSelectImagePress} >
              <IconGallery size={20} color={'#9999ff'}/>
            </TouchableOpacity>
          </View>
          )}
          
          
          
        </View>
        
       
        
        {/* <Image
          resizeMode="contain"
          source={{uri: image}}
          style={styles.image}
        /> */}
        <View style={{width:'100%',backgroundColor:'white',marginBottom:10,paddingHorizontal:20}}>
        <View style={{flexDirection: 'row',marginTop: 30,width:'100%'}}>
          <TextInput value={baiToan}  style={styles.input} onChangeText={onChangeText} placeholder={'Nhập phép toán tích phân'}></TextInput>
            <TouchableOpacity style = {styles.buttonResult} onPress={onPressMath}>
              <IconEqual size={30} color={'#ff7733'}/>
            </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row',width:'100%',backgroundColor:'white',marginTop:10}}>
          <Text style={{fontSize: 13, marginTop: 18}} >Bài toán: </Text>
          <View>
            <MathText
                value={'$$\\int{'+baiToan+'}  dx$$'}
                direction="ltr"
              />
          </View>
        </View>
        </View>
      
        {isGiai? (
          <View style={{justifyContent:'space-between',width:'100%',paddingHorizontal:20,backgroundColor:'white',marginVertical:10}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 13, paddingTop: 18}} >{'Kết quả: '}</Text>
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
                    <Text style={{fontSize: 13, color: 'rgba(0, 128, 255, 1)'}}>{'Xem các bước giải'}</Text>
                  </TouchableOpacity>
                  
                ):(
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 13, color: '#ff7733'}}>{'Chưa có các bước giải cho bài toán này '}</Text>
                    <IconSad size={13} color={'#ff7733'} style={{paddingTop:3}}/>
                  </View>
                )
                }
            </View>
          </View>
          
        
        ):null}
      

      <View style={{backgroundColor:'white',padding: 10,height:100}}>
        <Text>Ví dụ</Text>
        <FlatList
              nestedScrollEnabled={true}
              data={integral}
              renderItem={_renderItemIntegral}
              keyExtractor={item => item.id}
              horizontal={true}
              scrollEnabled={true}
        />
      </View>

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
        />
      
      
      
      <Modal visible={visible} onBackdropPress={onPressModal}>
        <View style={styles.modalView}>
          <View style={{alignItems: 'center',backgroundColor:'#54CCB6',height:'10%',justifyContent: 'center', borderTopStartRadius:20, borderTopEndRadius:20}}>
            <Text style={{fontSize: 26, color: 'white'}}>Các bước giải</Text>
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
    width: 40,
    height: 40,
    backgroundColor: 'gray',
    color: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth:1,
    marginRight: 10,
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
    width: 40,
    height: 40,
    backgroundColor: '#e6f2ff',
    borderColor: '#333333',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth:1
  },
  input: {
    width: WIDTH-100,
    height: 50,
    borderRadius: 5,
    fontSize: 14,
    backgroundColor: 'white',
    paddingLeft: 5,
    borderColor: '#333333',
    borderWidth:1
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
    borderWidth:1
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
    borderWidth:1
  }
});