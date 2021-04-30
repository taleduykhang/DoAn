import React,{useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  TextInput
} from 'react-native';
import {
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker';

import ml from '@react-native-firebase/ml';
import {
  derivative
} from 'mathjs'
import {IconCamera,IconGallery,IconEqual} from '../../resource/icons';
// import MathText from 'react-native-math';
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
export default class DashboardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image:undefined,
      result: 0,
      text:undefined,
      kq:undefined,
    };
  }
  onChangeText = (text) => {
    this.setState({text: text});
  };
  onTakePhoto = () => {
    launchCamera({mediaType: 'image'}, this.onMediaSelect);
  }
  onSelectImagePress = () =>{
    launchImageLibrary({mediaType: 'image'}, this.onMediaSelect);
  }
  onPressMath=()=>{
    const a = derivative(this.state.text, 'x');
    this.setState({kq:a.toString()}) 
  }
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
        text: result.text
      });
    }
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
            {/* <Image
              resizeMode="contain"
              source={{uri: this.state.image}}
              style={styles.image}
            /> */}
            <View style={{flexDirection: 'row',marginTop: 30}}>
              <TextInput value={this.state.text} caretHidden={true} style={styles.input} onChangeText={this.onChangeText}></TextInput>
              <TouchableOpacity style = {{justifyContent: 'space-around',alignItems: 'center',width:50,height:50,marginLeft:5,backgroundColor:'white',borderRadius:20}} onPress={this.onPressMath}>
                <IconEqual size={30} color={'#ff7733'}/>
              </TouchableOpacity>
            </View>
            <Text style={{fontSize: 13}}>Kết quả = {this.state.kq}</Text>
          </View>
          <View style={{marginTop: 30}}>
            {/* <Text style={{fontSize: 13}}>{this.state.result}</Text> */}
            <Text>Bàn phím</Text>
            {/* <MathText value={this.state.kq}></MathText> */}
          </View>
        </ScrollView>
      );
  }
}
const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    backgroundColor: '#66b3ff',
    flex:1
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
    width: 120,
    height: 120,
    backgroundColor: 'gray',
    color: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonGallery: {
    width: 120,
    height: 120,
    backgroundColor: 'white',
    borderColor: '#333333',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 20,
  },
  input: {
    width: 250,
    height: 50,
    borderRadius: 5,
    fontSize: 14,
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    paddingLeft: 5,
    borderColor: '#333333',
  },
});