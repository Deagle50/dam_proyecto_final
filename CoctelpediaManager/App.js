import React from 'react';
import { 
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Picker,
} from 'react-native';
import IconM from "react-native-vector-icons/MaterialCommunityIcons";
import Toast, {DURATION} from 'react-native-easy-toast';

import * as colors from './colors'
import * as constants from './constants'
import styles from './styles'

//Simple app to manage the phrases uploaded at Coctelpedia App, where you can edit, 
//delete and upload the phrases given by players.

var self;
const iconSize=25;

const tables = [
  {text:'Retos', value:'game_challenges'},
  {text:'Quién es más probable que...', value:'game_whowould'},
]

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      phrases : [],
      table: tables[0],
      phrase:null,
    }

    self = this;
  }

  componentDidMount = () => {
    //Get phrases from api at launch
    self.getApiPhrases();
  }

  getApiPhrases = () => {
    //consume rest api data
    fetch(constants.API_DIRECTION+'/api/temp_phrases')
    .then(response => response.json())
    .then(phrases => {
        //If it connects, use phrases from api
        console.log('Connected');
        this.setState({phrases:phrases});
    })
    .catch(function() {   
      self.error();
    });
  }

  delete = (id) =>{
    //Delete the phrase with the id as parameter
    console.log(id);
    let details = {
      'id':id,
    }

    var formBody = [];

    for(var property in details){
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    //Delete phrase from api
    fetch(constants.API_DIRECTION+'/api/temp_phrases',
    {
        method:'DELETE',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody,            
    })
    .catch(function() {   
      self.error();
    });       
  }

  
  upload = (text) =>{
    //Posts the phrase to the api
    console.log('TEXT', text);
    console.log('TABLE:', self.state.table.value);
    if(text.length<10)
    {}
    else
    {
        let details = {
        'text':text,
        'table': self.state.table.value,
        }

        var formBody = [];

        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }            
        formBody = formBody.join("&");
        //Post phrase to api
        fetch(constants.API_DIRECTION+'/api/phrases',
        {
            method:'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody,            
        })
        .catch(function() {   
          self.error();
        });
}

  }

  error = () => {
    self.refs.toast.show('No se ha podido conectar con el servidor');
    console.log('Not connected');
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={[styles.rowView, {justifyContent:'center'}]}>
          <View style={{flex:3}}></View>
          <Text style={[styles.title]}>Coctelpedia Manager</Text>
          <TouchableOpacity style={[styles.button, styles.updateButton]} onPress={()=>{this.getApiPhrases()}}>
                <IconM name="update" size={iconSize} color={colors.primaryColor} />
          </TouchableOpacity>
        </View>
        <View style={styles.card}>      
          <Text style={[styles.centeredText, styles.boldText, {margin:10}]}>Frases de usuarios</Text>    
          {this.state.phrases.length>0&&
          //If there are phrases, loads them
               this.state.phrases.map( phrase => {            
              return(
              //Each phrase to edit/delete/upload
              <View style={styles.rowView}>
                <TextInput 
                  style={styles.textInput}
                  multiline={true}>
                    {phrase.text}
                </TextInput>
                
                
                {/* Delete button */}
                <TouchableOpacity style={styles.button} onPress={()=>{
                  this.delete(phrase.id);
                  this.getApiPhrases();
                  this.refs.toast.show('Frase eliminada');
                  }}>
                  <IconM name="delete" size={iconSize-3} color={'red'} />
                </TouchableOpacity>
                {/* Upload button */}
                <TouchableOpacity style={styles.button} onPress={()=>{
                  this.delete(phrase.id);
                  this.upload(phrase.text);
                  this.getApiPhrases();
                  this.refs.toast.show('Frase subida');
                  }}>
                  <IconM name="upload" size={iconSize+1} color={colors.primaryColor} />
                </TouchableOpacity>
              </View>
            )})
            ||
            //If there aren't, warning
            <Text style={styles.centeredText}>No hay frases para revisar</Text>
            
          }
          <Toast ref="toast"/>
        </View>
        <View style={[styles.card]}>
        <Text style={[styles.centeredText, styles.boldText, {margin:10}]}>Frases personalizadas</Text>    
        <Picker style={[styles.text, {marginLeft:14}]}
                selectedValue={this.state.table}
                onValueChange={(item) => {this.setState({table:item}), console.log(item)}}>
                  {tables.map(element=>{
                    return(<Picker.Item label={element.text} value={element} key={element.value}/>)
                  })}
        </Picker>
        <TextInput 
          onChangeText={(text) => this.setState({phrase:text})}
          value={this.state.phrase}
          style={[styles.textInput, {flex:0}]}
          placeholder={'Introducir frase personalizada'}
          placeholderTextColor={colors.textWhite}
          clearButtonMode={'always'}//iOS only, button to delete phrase
          onSubmitEditing={()=>{this.upload(this.state.phrase), this.setState({text:''});}}/>
        
        </View>
        
      </View>
    );
    }
}