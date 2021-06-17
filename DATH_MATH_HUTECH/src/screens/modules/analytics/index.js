// import React from 'react';
// import {View, Text} from 'react-native';

// export default class Analytics extends React.PureComponent {
//   render() {
//     return (
//       <View style={{flex: 1}}>
//         <Text>This is analytics screen</Text>
//       </View>
//     );
//   }
// }

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
import {IconCamera,IconGallery,IconEqual} from '../../../resource/icons';
import Modal from 'react-native-modal';
// import { StaticMathField  } from 'react-mathquill'
import MathView, { MathText } from 'react-native-math-view';
const {width: WIDTH} = Dimensions.get('window');
const {height: HEIGHT} = Dimensions.get('window');
const Item = ({ expression }) => (
  <View style={{backgroundColor:'red'}}>
    <Text>{expression}</Text>
  </View>
);
export default function Analytics() {
  const [image, setImage] = useState();
  const [text, setText] = useState({});
  const [result, setResult] = useState({});
  const [steps, setSteps] = useState([]);
  const [visible, setVisible] = useState(false);
  const [ketQua, setKetQua] = useState('');
  const [buoc, setBuoc] = useState(0);
  const [baiToan, setBaiToan] = useState('');
  const [test, setTest] = useState('');
  const onTakePhoto = () => launchCamera({mediaType: 'image'}, onMediaSelect);
  const onChangeText = (text) => {
    setBaiToan(text);
  };
  const onSelectImagePress = () =>
    launchImageLibrary({mediaType: 'image'}, onMediaSelect);
  const onPressMath = () => {
    if(baiToan==''||baiToan==undefined)
    {
      console.log('Bạn phải nhập phép toán')
    }
    else{
      console.log(baiToan)
      try{
        axios.post(`https://mathsolver.microsoft.com/cameraexp/api/v1/solvelatex`, { 
        "latexExpression": '\\displaystyle\\frac{d}{d x  }  \\left(' + baiToan +'\\right)',
        "clientInfo": {
            "platform": "mobile",
            "mkt": "vi",
        },
        // "customLatex": "\\sqrt{  { x  }^{ 2  }    }  - { x  }^{ 4  }",
      })
      .then(res => {
        let evalData = JSON.parse(res.data.results[0].tags[0].actions[0].customData);
        let evalData1 = JSON.parse(evalData.previewText);
        console.log(evalData1.mathSolverResult)
        console.log(evalData1.mathSolverResult.actions[0].solution)
        //console.log(evalData1.mathSolverResult.actions[0].templateSteps[0].templateName)
        console.log(evalData1.mathSolverResult.actions[0].templateSteps[0].steps[0].step)
        let kq=evalData1.mathSolverResult.actions[0].solution
        setKetQua(kq.toString())
        console.log(kq)
        // let buoc2=evalData1.mathSolverResult.actions[0].templateSteps[0].steps[1].expression
        // setkq2(buoc2.toString())
        setSteps(evalData1.mathSolverResult.actions[0].templateSteps[0].steps)
        console.log(steps)
      })
      }catch(err){
        console.log(err)
      }
      
    }
    
    
  }
  
  const onMediaSelect = async (media) => {
    if (!media.didCancel) {
      setImage(media.uri);
      const result = await ml().cloudDocumentTextRecognizerProcessImage(
        media.uri,
      );
      setResult(result);
      setText(result.text);
      console.log(result);
    }
  };
  useEffect(() => {
    setSteps(steps)
  }, [steps])
  const onPressModal = () => {
    setVisible(!visible)
  }
  const onPressMu2=()=> {
    setTest(test+'^{2}');
  }
  const onPressX=()=> {
    setTest(test+'x');
  }
  const onPress3=()=> {
    setTest(test+'3');
  }
    const _renderItem = ({item}) => {
        return (
          <View style={{flex:1,marginTop: 30}}>
            <View style={{flexDirection: 'row',paddingHorizontal:15}}>
              <Text style={{fontSize: 13}}>Bước {buoc}: </Text>
            </View>
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
            <View style={{backgroundColor:'gray',height:1}}>
            </View>
          </View>
        )
      }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View>
        <View style = {{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop:20
          }}>
          <TouchableOpacity style={styles.buttonCamera} onPress={onTakePhoto}>
            <IconCamera size={90} color={'black'}/>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.buttonGallery} onPress = {onSelectImagePress} >
            <IconGallery size={90} color={'#9999ff'}/>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row',marginTop: 30}}>
          <TextInput value={baiToan}  style={styles.input} onChangeText={onChangeText} placeholder={'Nhập phép toán đạo hàm'}></TextInput>
            <TouchableOpacity style = {styles.buttonResult} onPress={onPressMath}>
              <IconEqual size={30} color={'#ff7733'}/>
            </TouchableOpacity>
        </View>
        {/* <Image
          resizeMode="contain"
          source={{uri: image}}
          style={styles.image}
        /> */}
      </View>
      <View style={{marginTop: 30,flexDirection: 'row',justifyContent:'space-between',width:'100%',paddingHorizontal:20}}>
        <Text style={{fontSize: 13, marginTop: 15}} >{ketQua? 'Kết quả: ': ''}</Text>
        <View style={{backgroundColor:'red'}}>
          <MathText
              value={ketQua}
              direction="ltr"
            />
        </View>
        <TouchableOpacity disabled={ketQua?false:true} onPress={onPressModal}>
            <Text style={{fontSize: 13, color: 'blue',marginTop: 15}}>{ketQua?'Xem các bước giải':''}</Text>
        </TouchableOpacity>
      </View>
      <MathText
            value={'$\\int{'+test+'}dx$'}
            direction="ltr"
      />
      <TouchableOpacity onPress={onPressMu2} style={{borderWidth:1,width:60,alignItems: 'center'}}>
        <MathText
            value={'$x^2$'}
            direction="ltr"
          />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressX} style={{borderWidth:1}}>
        <MathText
            value={'$x$'}
            direction="ltr"
          />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress3} style={{borderWidth:1}}>
        <MathText
            value={'$3$'}
            direction="ltr"
          />
      </TouchableOpacity>
      
      <Modal visible={visible} onBackdropPress={onPressModal}>
        <View style={styles.modalView}>
          <View style={{alignItems: 'center',backgroundColor:'blue',height:'10%',justifyContent: 'center', borderTopStartRadius:20, borderTopEndRadius:20}}>
            <Text style={{fontSize: 26, color: 'white'}}>Các bước giải</Text>
          </View>
          <FlatList
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
    width: WIDTH-300,
    height: HEIGHT-650,
    backgroundColor: 'gray',
    color: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 20,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth:1,
    borderRightWidth:1
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
    width: WIDTH-300,
    height: HEIGHT-650,
    backgroundColor: '#e6f2ff',
    borderColor: '#333333',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 20,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth:1,
    borderRightWidth:1
  },
  input: {
    width: WIDTH-100,
    height: 50,
    borderRadius: 5,
    fontSize: 14,
    backgroundColor: 'white',
    paddingLeft: 5,
    borderColor: '#333333',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth:1,
    borderRightWidth:1
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
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth:1,
    borderRightWidth:1
  },
});
