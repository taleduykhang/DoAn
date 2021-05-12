import React from 'react';
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
  StatusBar,
  TouchableWithoutFeedback
} from 'react-native';
import {
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker';

import ml from '@react-native-firebase/ml';
import {
  derivative
} from 'mathjs';

import {IconCamera,IconGallery,IconEqual} from '../../resource/icons';
import Modal from 'react-native-modal';
import MathJax from 'react-native-mathjax'
// export default function DashboardScreen() {
//   const [image, setImage] = useState();
//   const [text, setText] = useState({});
//   const [result, setResult] = useState({});
//   const onTakePhoto = () => launchCamera({mediaType: 'image'}, onMediaSelect);
//   const onChangeText = (text) => {
//     setText(text);
//   };
//   const onSelectImagePress = () =>
//     launchImageLibrary({mediaType: 'image'}, onMediaSelect);

//   const onMediaSelect = async (media) => {
//     if (!media.didCancel) {
//       setImage(media.uri);
//       const result = await ml().cloudDocumentTextRecognizerProcessImage(
//         media.uri,
//       );
//       setResult(result);
//       setText(result.text);
//       console.log(result);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.screen}>
//       <View>
//         <View style = {{
//             flexDirection: 'row',
//             justifyContent: 'space-around',
//             marginTop:20
//           }}>
//           <TouchableOpacity style={styles.button} onPress={onTakePhoto}>
//             <FontAwesome5 name="camera" color='#ffff' size={60}/>
//             <Text style={styles.buttonText}>Camera</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={onSelectImagePress}>
//             <FontAwesome5 name="images" color='#ffff' size={60}/>
//             <Text style={styles.buttonText}>Gallery</Text>
//           </TouchableOpacity>
//         </View>
//         <TextInput value={text} caretHidden={true} style={styles.input} onChangeText={onChangeText}></TextInput>
//         {/* <Image
//           resizeMode="contain"
//           source={{uri: image}}
//           style={styles.image}
//         /> */}
//       </View>
//       <View style={{marginTop: 30}}>
//         <Text style={{fontSize: 13}}>{result.text}</Text>
//       </View>
//     </ScrollView>
//   );
// }
// const mathsteps = require('mathsteps');
const {width: WIDTH} = Dimensions.get('window');
const {height: HEIGHT} = Dimensions.get('window');
export default class DashboardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image:undefined,
      result: 0,
      text:undefined,
      kq:undefined,
      modalVisible: false,
      test:undefined
    };
  }
  // Thay đổi trạng thái ô phép toán
  onChangeText = (text) => {
    this.setState({text: text});
  };
  // Mở camera
  onTakePhoto = () => {
    launchCamera({mediaType: 'image'}, this.onMediaSelect);
  }
  // Mở thư viện ảnh
  onSelectImagePress = () =>{
    launchImageLibrary({mediaType: 'image'}, this.onMediaSelect);
  }
  // Thực hiện phép toán đạo hàm
  onPressMath=()=>{
    if(this.state.text==""||this.state.text==undefined)
    {
      Alert.alert("Bạn phải nhập phép toán");
    }
    else{
      // const steps = mathsteps.simplifyExpression('2x + 2x + x + x');
      // steps.forEach(step => {
      //   console.log("before change: " + step.oldNode.toString());   // before change: 2 x + 2 x + x + x
      //   console.log("change: " + step.changeType);                  // change: ADD_POLYNOMIAL_TERMS
      //   console.log("after change: " + step.newNode.toString());    // after change: 6 x
      //   console.log("# of substeps: " + step.substeps.length);      // # of substeps: 3
      // });
      // var splitArray= new Array();
      // var format = /[/]/;
      // var regex=/[- + * /]/;

      // if(format.test(this.state.text)==true){ 
      //   console.log(this.state.text.indexOf('/'));
      //   console.log(this.state.text.split('/').pop());
      //   console.log(this.state.text.indexOf('/'));
      //   console.log(this.state.text.slice(0,this.state.text.indexOf('/')-1)+"//frac"+"{"+this.state.text.slice(this.state.text.indexOf('/')-1,this.state.text.indexOf('/'))+"}{"+this.state.text.slice(this.state.text.indexOf('/')+1)+"}");
      //   console.log(this.state.text.charAt(this.state.text.indexOf('/')));
      //   //---------Tách chuỗi---------
      //   // splitArray=this.state.text.split(regex);
      //   // for(var i=0;i<splitArray.length;i++){
      //   //   console.log(splitArray[i]);
      //   // }
      // }
      // else{
      //   const a = derivative(this.state.text, 'x');
      //   this.setState({kq:a.toString()}) 
      //   this.setState({
      //     modalVisible: !this.state.modalVisible,
      //     test:this.state.text.slice(0,this.state.text.indexOf('/')-1)+"//frac"+"{"+this.state.text.slice(this.state.text.indexOf('/')-1,this.state.text.indexOf('/'))+"}{"+this.state.text.slice(this.state.text.indexOf('/')+1)+"}"
      //   });
      // }
      const a = derivative(this.state.text,'x');
        this.setState({
          modalVisible: !this.state.modalVisible,
          kq:a.toString(),
          // test:this.state.text.slice(0,this.state.text.indexOf('/')-1)+"\\frac"+"{"+this.state.text.slice(this.state.text.indexOf('/')-1,this.state.text.indexOf('/'))+"}{"+this.state.text.slice(this.state.text.indexOf('/')+1)+"}"
        });
        this.setState({
          test:this.state.kq.slice(0,this.state.kq.indexOf('/')-1)+"\\frac"+"{"+this.state.kq.slice(this.state.kq.indexOf('/')-1,this.state.kq.indexOf('/'))+"}{"+this.state.kq.slice(this.state.kq.indexOf('/')+1)+"}"
        });
    }
    
  }
  // Nhận diện chữ từ hình ảnh
  onMediaSelect = async (media) => {
    if (!media.didCancel) {
      this.setState({
        image: media.uri
      });
      const result = await ml().cloudDocumentTextRecognizerProcessImage(
        media.uri,
      );
     
      this.setState({
        result: result.text,
        text: result.text.toLowerCase().trim()
      });
    }
  };
  // Xét trạng thái modal
  onPressModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };
  render() {
      return (
        <ScrollView contentContainerStyle={styles.screen}>
          <View>
            <View style = {{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop:20
              }}>
              <TouchableOpacity style={styles.buttonCamera} onPress={this.onTakePhoto}>
                <IconCamera size={90} color={'black'}/>
              </TouchableOpacity>
              <TouchableOpacity style = {styles.buttonGallery} onPress = {this.onSelectImagePress} >
                <IconGallery size={90} color={'#9999ff'}/>
              </TouchableOpacity>
            </View>
            {/* Hide image upload */}
            {/* <Image
              resizeMode="contain"
              source={{uri: this.state.image}}
              style={styles.image}
            /> */}
            <View style={{flexDirection: 'row',marginTop: 30}}>
              <TextInput value={this.state.text}  style={styles.input} onChangeText={this.onChangeText}></TextInput>
              <TouchableOpacity style = {styles.buttonResult} onPress={this.onPressMath}>
                <IconEqual size={30} color={'#ff7733'}/>
              </TouchableOpacity>
            </View>
          </View>
          <Modal
          animationType="slide"
          //transparent={true}
          visible={this.state.modalVisible}
          customBackdrop={
              <TouchableWithoutFeedback onPress={this.onPressModal}>
                <View
                  style={{
                    flex: 1,
                  }}
                />
              </TouchableWithoutFeedback>
          }
          //backdropColor='#ffff'
          > 
            <View style={styles.modalView}>
              <Text style={styles.titleResult}>Kết quả</Text>
              <Text style={{fontSize: 20}}>Đề bài</Text>
              <Text style={{fontSize: 18,marginLeft: 20}}> f(x) = {this.state.text}</Text>
              <Text style={{fontSize: 20}}>Kết quả</Text>
              <Text style={{fontSize: 18,marginLeft: 20}}> f'(x) = {this.state.kq}</Text>
              <MathJax
                // HTML content with MathJax support
                html={"$"+this.state.test+"$"}
                // MathJax config option
                mathJaxOptions={{
                  messageStyle: 'none',
                  extensions: [ 'tex2jax.js' ],
                  jax: [ 'input/TeX', 'output/HTML-CSS' ],
                  tex2jax: {
                    inlineMath: [ ['$','$'], ['\\(','\\)'] ],
                    displayMath: [ ['$$','$$'], ['\\[','\\]'] ],
                    processEscapes: true,
                  },
                  TeX: {
                    extensions: ['AMSmath.js','AMSsymbols.js','noErrors.js','noUndefined.js']
                  }
                }}
              />
            </View>
          </Modal>
          <View style={{marginTop: 30}}>
            <Text>Bàn phím</Text>
            
          </View>
        </ScrollView>
      );
  }
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