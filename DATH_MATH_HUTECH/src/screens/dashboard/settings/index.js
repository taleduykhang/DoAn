import React from 'react';
import {View, Text,Image,Dimensions} from 'react-native';
const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
export const Scale = (size) => (width / guidelineBaseWidth) * size;
export default class Settings extends React.PureComponent {
  render() {
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
  }
}
