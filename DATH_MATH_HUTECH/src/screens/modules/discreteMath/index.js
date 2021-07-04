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
import {IconCamera,IconSad,IconEqual,IconGallery,IconQues} from '../../../resource/icons';
import Modal from 'react-native-modal';
// import { StaticMathField  } from 'react-mathquill'
import MathView, { MathText } from 'react-native-math-view';
const {width: WIDTH} = Dimensions.get('window');
const {height: HEIGHT} = Dimensions.get('window');
// import factor from '../../Data/factor'
import Keyboard from '../../components/keyboard'
import {db} from '../../firebase/configFirebase'
export default function DiscreteMath() {
  const [image, setImage] = useState();
  const [text, setText] = useState();
  const [result, setResult] = useState({});
  const [steps, setSteps] = useState([]);
  const [factor, setFactor] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visibleImage, setVisibleImage] = useState(false);
  const [visibleInfo, setVisibleInfo] = useState(false);
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
      db.ref('factorMath').on('value', querySnapShot => {
      const data = querySnapShot.val() ? querySnapShot.val() : {};
      //const todoItems = {...data};
      setFactor(data);
      setIsList(false)
      });
      console.log(factor)
  },[])
    const onPressMathImage = async () => {
      setIsLoad(true)
      setIsGiai(false)
        console.log(text)
        try{
          axios.post(`https://mathsolver.microsoft.com/cameraexp/api/v1/solvelatex`, { 
          "latexExpression": text,
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
                "Thông báo",
                "Không thể giải bài toán này",
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
                  "Thông báo",
                  "Vẫn chưa có bước giải cho bài toán này",
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
                "Thông báo",
                "Bạn phải nhập phép toán",
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
        "latexExpression": baiToan,
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
                "Thông báo",
                "Không thể giải bài toán này",
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
                "Thông báo",
                "Vẫn chưa có bước giải cho bài toán này",
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

  const _onPressFactor = async (item) => {
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
                "Thông báo",
                "Không thể giải bài toán này",
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
                "Thông báo",
                "Vẫn chưa có bước giải cho bài toán này",
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
      const _renderItemFactor = ({item}) => {
        return (
          <View style={{flex:1,marginTop: 5,backgroundColor:'white'}}>
            <View style={{alignItems: 'center',marginHorizontal:5}}>
            <TouchableOpacity style={{borderWidth:0.5,height:50}} onPress={() => _onPressFactor(item.factor)}>
            <MathText
                value={'$$'+item.factor+'$$'}
                direction="ltr"
              />
            </TouchableOpacity>
            </View>
          </View>
        )
      }
  const onPressModalInfo=()=>{
    setVisibleInfo(!visibleInfo)
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
            <TextInput value={baiToan}  style={styles.input} onChangeText={onChangeText} placeholder={isVN? 'Nhập phép toán ':'Enter the factor operation'}></TextInput>
            <TouchableOpacity style = {{marginTop:10,marginLeft:-40,marginRight:15}} onPress = {onPressModalImage} >
              <IconGallery size={25} color={'#9999ff'}/>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.buttonResult} onPress={onPressMath}>
              <IconEqual size={30} color={'#ff7733'}/>
            </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row',width:'100%',backgroundColor:'white',marginTop:10}}>
          <Text style={{fontSize: 13, marginTop: 18}} >{isVN?'Bài toán: ':'Problem: '} </Text>
          <View style={{width: '80%'}}>
            <MathText
                value={'$$'+baiToan+'$$'}
                direction="ltr"
              />
          </View>
          <TouchableOpacity style = {{marginTop:15,marginRight:15}} onPress = {onPressModalInfo} >
              <IconQues size={20} color={'#9999ff'}/>
            </TouchableOpacity>
        </View>
        {isImage?(
            <View style={{flexDirection: 'row'}}>
              <Text style={{paddingTop: 5,marginRight:10}}>{isVN?'Bài toán nhận được: ':'The problem gets: '} {text}</Text>
              <TouchableOpacity style = {{}} onPress={onPressMathImage}>
                <Text style={{marginTop:5, color:'#ff7733',borderBottomWidth:1,borderColor:'#ff7733'}}>{isVN?'Giải':'Solution'} </Text>
              </TouchableOpacity>
            </View>
          ):(null)}
        </View>
      
        {isGiai? (
          <View style={{justifyContent:'space-between',width:'100%',paddingHorizontal:20,backgroundColor:'white',marginBottom:10}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 13, paddingTop: 18}} >{isVN?'Kết quả: ':'Result: '}</Text>
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
                    <Text style={{fontSize: 13, color: 'rgba(0, 128, 255, 1)',borderBottomWidth:1,borderColor:'rgba(0, 128, 255, 1)',width:130}}>{isVN?'Xem các bước giải ...':'See the solution steps'}</Text>
                  </TouchableOpacity>
                  
                ):(
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 13, color: '#ff7733'}}>{isVN?'Chưa có các bước giải cho bài toán này ':'There are no steps to solve this problem'}</Text>
                    <IconSad size={13} color={'#ff7733'} style={{paddingTop:3}}/>
                  </View>
                )
                }
            </View>
          </View>
          
        
        ): null}
      {
        isLoad ? (<View style={{ paddingVertical: 10,justifyContent: "center"}}>
          <ActivityIndicator size="small" color="#0000ff" />
          <Text style={{fontSize: 13, color: '#0000ff'}}>{isVN?'Đang giải bài toán xin chờ giây lát':'Solving the math problem, please wait a moment'}</Text>
        </View>) : null
      }
      {isList?(
        <View style={{justifyContent: "center",paddingVertical: 10}}>
          <ActivityIndicator size="small" color="#0000ff" />
          <Text style={{fontSize: 13, color: '#0000ff'}}>{isVN?'Đang tải ví dụ xin chờ giây lát':'Loading example please wait a moment'}</Text>
        </View>
            ):(
              <View style={{backgroundColor:'white',padding: 10,height:100}}>
        <Text>{isVN?'Ví dụ':'For example'}</Text>
        <FlatList
              nestedScrollEnabled={true}
              data={factor}
              renderItem={_renderItemFactor}
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
      
      <Modal visible={visibleInfo} onBackdropPress={onPressModalInfo}>
        <View style={styles.modalViewInfo}>
          <View style={{alignItems: 'center',backgroundColor:'#54CCB6',height:'10%',justifyContent: 'center', borderTopStartRadius:20, borderTopEndRadius:20}}>
            <Text style={{fontSize: 24, color: 'white'}}>{isVN?'Các bài toán có thể giải':'Problems that can be solved'}</Text>
          </View>
            <Text style={{fontSize: 16,paddingLeft: 20,paddingTop:10}}>{isVN?'Trung bình mean(a,b,..).':'Average mean(a,b,..)'}</Text>
            <Text style={{fontSize: 16,paddingLeft: 20,paddingTop:10}}>{isVN?'Số yếu vị mode(a,b,..).':'Mode mode(a,b,..)'}</Text>
            <Text style={{fontSize: 16,paddingLeft: 20,paddingTop:10}}>{isVN?'Ước chung lớn nhất gcf(a,b,...).':'Greatest common factor gcf(a,b,...).'}</Text>
            <Text style={{fontSize: 16,paddingLeft: 20,paddingTop:10}}>{isVN?'Bội chung nhỏ nhất lcm(a,b,...).':'Least common multiple lcm(a,b,...).'}</Text>
            <Text style={{fontSize: 16,paddingLeft: 20,paddingTop:10}}>{isVN?'Phân số, hỗn số.':'Fractions, mixed fractions.'}</Text>
            <Text style={{fontSize: 16,paddingLeft: 20,paddingTop:10}}>{isVN?'Số nguyên tố factor(a).':'Prime factorization factor(a).'}</Text>
            <Text style={{fontSize: 16,paddingLeft: 20,paddingTop:10}}>{isVN?'Số mũ.':'Exponents.'}</Text>
            <Text style={{fontSize: 16,paddingLeft: 20,paddingTop:10}}>{isVN?'Căn thức.':'Radicals.'}</Text>
            <Text style={{fontSize: 16,paddingLeft: 20,paddingTop:10}}>{isVN?'Kết hợp các số hạng đồng dạng.':'Combine like terms.'}</Text>
            <Text style={{fontSize: 16,paddingLeft: 20,paddingTop:10}}>{isVN?'Giải cho một biến.':'Solve for a variable.'}</Text>
            <Text style={{fontSize: 16,paddingLeft: 20,paddingTop:10}}>{isVN?'Thừa số.':'Factor.'}</Text>
            <Text style={{fontSize: 16,paddingLeft: 20,paddingTop:10}}>{isVN?'Mở rộng.':'Expand.'}</Text>
            <Text style={{fontSize: 16,paddingLeft: 20,paddingTop:10}}>{isVN?'So sánh phân số.':'Evaluate fractions.'}</Text>
            <Text style={{fontSize: 16,paddingLeft: 20,paddingTop:10}}>{isVN?'Các phương trình tuyến tính.':'Linear equations.'}</Text>
            <Text style={{fontSize: 16,paddingLeft: 20,paddingTop:10}}>{isVN?'Phương trình bậc 2.':'Quadratic equations.'}</Text>
            <Text style={{fontSize: 16,paddingLeft: 20,paddingTop:10}}>{isVN?'Các bất đẳng thức.':'Inequalities.'}</Text>
            <Text style={{fontSize: 16,paddingLeft: 20,paddingTop:10}}>{isVN?'Ước lượng.':'Evaluate.'}</Text>
        </View>
      </Modal>
      
      <Modal visible={visible} onBackdropPress={onPressModal}>
        <View style={styles.modalView}>
          <View style={{alignItems: 'center',backgroundColor:'#54CCB6',height:'10%',justifyContent: 'center', borderTopStartRadius:20, borderTopEndRadius:20}}>
            <Text style={{fontSize: 26, color: 'white'}}>{isVN?'Các bước giải':'Solution steps'}</Text>
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
  modalViewInfo: {
    height:HEIGHT-180,
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