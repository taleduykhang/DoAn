import React, { Component} from 'react';
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
    FlatList,
  } from 'react-native';
import firebaseApp from '../configFirebase'
import MathView, { MathText } from 'react-native-math-view';
export default class Math extends React.Component {
    constructor(props) {
        super(props);
        this.itemRef=firebaseApp.database();
        this.state ={
            dataSource: [],
        }
    }

    _renderItemFactor = ({item}) => {
        return (
          <View style={{flex:1,marginTop: 5,backgroundColor:'white'}}>
                <Text>{item.name}</Text>
          </View>
        )
    }
    listenForItem(itemRef){
        var items=[];
        this.itemRef.ref('derivative').on('child_added',(dataSnapshot)=>{
            items.push({
                name:dataSnapshot.val(),
                key:dataSnapshot.key
            });
            this.setState({
                dataSource: items.name
            })
        })
    
    }
    componentDidMount(){
        this.listenForItem(this.itemRef)
    }
    render(){
        return (
            <View>
               <FlatList
                    nestedScrollEnabled={true}
                    scrollEnabled={true}
                    data={this.state.dataSource}
                    renderItem={this._renderItemFactor}
                    keyExtractor={item => item.key}
                />
            </View>
        )
    }
}