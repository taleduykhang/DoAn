import React ,{useLayoutEffect, useEffect, useState}from 'react';
import {View, Text,Image,Dimensions,TouchableOpacity} from 'react-native';
const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
export const Scale = (size) => (width / guidelineBaseWidth) * size;
import {db} from '../../firebase/configFirebase'
import MathView, { MathText } from 'react-native-math-view';
export default function Settings () {
  
    return (
      <View style={{flex: 1}}>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize:20,paddingVertical: 10}}>Phần mềm được nhóm HKL phát triển</Text>
          
        </View>
        <View style={{flexDirection: 'row'}}>
        <Text style={{fontSize:16,paddingVertical: 10,paddingLeft: 20}}>Trường: Đại học Công Nghệ TP.HCM</Text>
        <Image source={require('../../../resource/images/hutechLogo.png')}/>
        </View>
        <Text style={{fontSize:16,paddingBottom: 10,paddingLeft: 20}}>GVHD: Thạc sĩ Dương Thành Phết</Text>
        <Text style={{fontSize:16,paddingBottom: 10,paddingLeft: 20}}>Lớp: 17DTHD1</Text>
        <Text style={{fontSize:16,paddingBottom: 10,paddingLeft: 20}}>Thành viên gồm: </Text>
        <Text style={{fontSize:16,paddingBottom: 10,paddingLeft: 40}}>Tạ Lê Duy Khang - MSSV: 1711061957</Text>
        <Text style={{fontSize:16,paddingBottom: 10,paddingLeft: 40}}>Trương Lâm Hữu Lộc - MSSV: </Text>
        <Text style={{fontSize:16,paddingBottom: 10,paddingLeft: 40}}>Nguyễn Phương Hoàng - MSSV: </Text>
      </View>
    );
  
  // const [post,setPost]=useState([]);
  // useEffect(() =>{
  //   db.ref('derivative').on('value', querySnapShot => {
  //     const data = querySnapShot.val() ? querySnapShot.val() : {};
  //     //const todoItems = {...data};
  //     setPost(data);
      
  //   });
  //   console.log(post)
  // },[])
  // const _renderItemDerivative = ({item}) => {
  //   return (
  //     <View style={{flex:1,marginTop: 5,backgroundColor:'white',heigh:200}}>
  //       <View style={{alignItems: 'center',marginHorizontal:5}}>
  //       <TouchableOpacity style={{borderWidth:0.5,height:50}} onPress={() => _onPressDerivative(item.derivative)}>
          
  //         <MathText
  //             value={'$$'+item.derivative+'$$'}
  //             direction="ltr"
  //           />
  //           <MathText
  //             value={'$$'+item.math+'$$'}
  //             direction="ltr"
  //           />
  //       </TouchableOpacity>
          
          
  //       </View>
  //     </View>
  //   )
  // }

  // return(
  //   <View style={{height:500,backgroundColor:'red'}}>
  //     <FlatList
  //           nestedScrollEnabled={true}
  //           scrollEnabled={true}
  //           data={post}
  //           renderItem={_renderItemDerivative}
  //           keyExtractor={item => item.derivative}
  //         />
  //   </View>
  // )
}
