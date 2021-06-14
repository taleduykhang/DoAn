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
import {IconCamera,IconGallery,IconEqual} from '../../resource/icons';
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
export default function DashboardScreen() {
  const [image, setImage] = useState();
  const [text, setText] = useState({});
  const [result, setResult] = useState({});
  const [steps, setSteps] = useState([]);
  const [visible, setVisible] = useState(false);
  const [ketQua, setKetQua] = useState('');
  const [buoc, setBuoc] = useState(0);
  const [baiToan, setBaiToan] = useState('');
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
        console.log(evalData1.mathSolverResult.actions[0].solution)
        console.log(evalData1.mathSolverResult.actions[0].templateSteps[0].templateName)
        console.log(evalData1.mathSolverResult.actions[0].templateSteps[0].steps[0].step)
        let kq=evalData1.mathSolverResult.actions[0].solution
        setKetQua(kq.toString())
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
  
    const _renderItem = ({item}) => {
      // for(let i=1;i<=steps.length;i++) {
      //   setBuoc(i++)
      // }
        return (
          <View style={{flex:1,marginTop: 30}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 13}}>Bước {buoc}:</Text>
              {/* <MathView math={item.step}/>  */}
              {/* <Text style={{fontSize: 13}}>{item.step}</Text> */}
              <MathText
                value={item.step}
                direction="ltr"
              />
            </View>
            <MathText
                value={item.expression}
                direction="ltr"
              />
            {/* <Text style={{fontSize: 13}}>{item.expression}</Text> */}
            
          </View>
          // console.log(item.expression)
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
        {/* <TextInput value={text} style={styles.input} onChangeText={onChangeText} placeholder={'Nhập phép toán'}></TextInput> */}
        <View style={{flexDirection: 'row',marginTop: 30}}>
          <TextInput value={baiToan}  style={styles.input} onChangeText={onChangeText}></TextInput>
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
      {/* <MathText
            value={'$\\int{7x+8}dx$'}
            direction="ltr"
          /> */}
      <View style={{marginTop: 30,flexDirection: 'row',justifyContent:'space-between'}}>
        <Text style={{fontSize: 13}} >{ketQua? 'Kết quả: ': ''}</Text>
        
        {/* <Latex>{ketQua}</Latex> */}
        {/* <MathView math={ketQua}/>  */}
        <MathText
            value={ketQua}
            direction="ltr"
          />
        <TouchableOpacity disabled={ketQua?false:true} onPress={onPressModal}>
            <Text style={{fontSize: 13, color: 'blue'}}>{ketQua?'Xem các bước giải':''}</Text>
        </TouchableOpacity>
        {/* <StaticMathField>{'\\frac{1}{\\sqrt{2}}\\cdot 2'}</StaticMathField> */}
        {/* <Latex>{ketQua}</Latex> */}
        
        {/* <MathJax
          html={'$$\\sum_{i=0}^n i^2 = \\frac{(n^2+n)(2n+1)}{6}$$<br>$\\sqrt{i=3}$'}
          mathJaxOptions={{
            messageStyle: 'none',
            extensions: ['tex2jax.js'],
            jax: ['input/TeX', 'output/HTML-CSS'],
            tex2jax: {
              inlineMath: [['$', '$'], ['\\(', '\\)']],
              displayMath: [['$$', '$$'], ['\\[', '\\]']],
              processEscapes: true,
            },
            TeX: {
              extensions: ['AMSmath.js', 'AMSsymbols.js', 'noErrors.js', 'noUndefined.js']
            }
          }}      
        /> */}
      </View>
      
      <Modal visible={visible} onBackdropPress={onPressModal}>
        <View style={styles.modalView}>
          <Text style={{fontSize: 13, color: 'blue'}}>Các bước giải</Text>
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


// export default class DashboardScreen extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       image:undefined,
//       result: 0,
//       text:undefined,
//       kq:undefined,
//       modalVisible: false
//     };
//   }
//   // Thay đổi trạng thái ô phép toán
//   onChangeText = (text) => {
//     this.setState({text: text});
//   };
//   // Mở camera
//   onTakePhoto = () => {
//     launchCamera({mediaType: 'image'}, this.onMediaSelect);
//   }
//   // Mở thư viện ảnh
//   onSelectImagePress = () =>{
//     launchImageLibrary({mediaType: 'image'}, this.onMediaSelect);
//   }
//   // Thực hiện phép toán đạo hàm
//   onPressMath=()=>{
//     if(this.state.text==""||this.state.text==undefined)
//     {
//       Alert.alert("Bạn phải nhập phép toán");
//     }
//     else{
//       // const steps = mathsteps.simplifyExpression('2x + 2x + x + x');
//       // steps.forEach(step => {
//       //   console.log("before change: " + step.oldNode.toString());   // before change: 2 x + 2 x + x + x
//       //   console.log("change: " + step.changeType);                  // change: ADD_POLYNOMIAL_TERMS
//       //   console.log("after change: " + step.newNode.toString());    // after change: 6 x
//       //   console.log("# of substeps: " + step.substeps.length);      // # of substeps: 3
//       // });
//       const a = derivative(this.state.text, 'x');
//       this.setState({kq:a.toString()}) 
//       this.setState({
//         modalVisible: !this.state.modalVisible,
//       });
//     }
    
//   }
//   // Nhận diện chữ từ hình ảnh
//   onMediaSelect = async (media) => {
//     if (!media.didCancel) {
//       this.setState({
//         image: media.uri
//       });
//       const result = await ml().cloudDocumentTextRecognizerProcessImage(
//         media.uri,
//       );
//       this.setState({
//         result: result.text,
//         text: result.text
//       });
//     }
//   };
//   // Xét trạng thái modal
//   onPressModal = () => {
//     this.setState({
//       modalVisible: !this.state.modalVisible,
//     });
//   };
//   render() {
//       return (
//         <ScrollView contentContainerStyle={styles.screen}>
//           <View>
//             <View style = {{
//                 flexDirection: 'row',
//                 justifyContent: 'space-around',
//                 marginTop:20
//               }}>
//               <TouchableOpacity style={styles.buttonCamera} onPress={this.onTakePhoto}>
//                 <IconCamera size={90} color={'black'}/>
//               </TouchableOpacity>
//               <TouchableOpacity style = {styles.buttonGallery} onPress = {this.onSelectImagePress} >
//                 <IconGallery size={90} color={'#9999ff'}/>
//               </TouchableOpacity>
//             </View>
//             {/* Hide image upload */}
//             {/* <Image
//               resizeMode="contain"
//               source={{uri: this.state.image}}
//               style={styles.image}
//             /> */}
//             <View style={{flexDirection: 'row',marginTop: 30}}>
//               <TextInput value={this.state.text}  style={styles.input} onChangeText={this.onChangeText}></TextInput>
//               <TouchableOpacity style = {styles.buttonResult} onPress={this.onPressMath}>
//                 <IconEqual size={30} color={'#ff7733'}/>
//               </TouchableOpacity>
//             </View>
//           </View>
//           <Modal
//           animationType="slide"
//           //transparent={true}
//           visible={this.state.modalVisible}
//           customBackdrop={
//               <TouchableWithoutFeedback onPress={this.onPressModal}>
//                 <View
//                   style={{
//                     flex: 1,
//                   }}
//                 />
//               </TouchableWithoutFeedback>
//           }
//           //backdropColor='#ffff'
//           > 
//             <View style={styles.modalView}>
//               <Text style={styles.titleResult}>Kết quả</Text>
//               <Text style={{fontSize: 20}}>Đề bài</Text>
//               <Text style={{fontSize: 18,marginLeft: 20}}> f(x) = {this.state.text}</Text>
//               <Text style={{fontSize: 20}}>Kết quả</Text>
//               <Text style={{fontSize: 18,marginLeft: 20}}> f'(x) = {this.state.kq}</Text>
//             </View>
//           </Modal>
//           <View style={{marginTop: 30}}>
//             <Text>Bàn phím</Text>
//             {/* <MathText value={this.state.kq}></MathText> */}
//           </View>
//         </ScrollView>
//       );
//   }
// }
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