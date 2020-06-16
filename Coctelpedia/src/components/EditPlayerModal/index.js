import React, { Component } from 'react';
import {
    Modal,
    View, 
    Text, 
    TouchableOpacity,
    KeyboardAvoidingView,
    TextInput,
    Platform}
from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';

import styles from './styles'
import globalStyles from '../../constants/globalStyles'

var name = ""
var self
export default class EditPlayerModal extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        text:'',//Text input text, empty at launch
        name2:'',        
    };

    self = this;
  }
    
  componentDidMount() {
    this.props.onRef(this);    
    if(this.props.player!=null){
        name = this.props.player.name;
        this.setState({name2:this.props.player.name})//Name of the player that is going to be updated
    }
  }
    
componentWillUnmount() {
    this.props.onRef(undefined)
}

componentDidUpdate(prevProps){
    //IDK man, just did it and idk what it does.
    if(this.props.player && !prevProps.player)
    {//If player received and there was no previous player, put name as props.player.name
        this.setState({name2:this.props.player.name})
    }
    if(this.props.player && prevProps && prevProps.player && this.props.player.name!==prevProps.player.name)
    {//If previous props are different from actual ones, change player's name
        this.setState({name2:this.props.player.name})
    }
}


  render() {
    const { onCloseModal } = this.props;
    return (
      <Modal 
        visible={this.props.visible}
        onRequestClose={onCloseModal}
        transparent={true}
        animationType="fade">       
        {/* Top view to close children onclick */}
        <TouchableOpacity 
            onPress={onCloseModal}
            style={[{width:'100%', height:'100%'}, styles.container]}
            activeOpacity={1}>

            <KeyboardAvoidingView 
            style={styles.modal}
            behavior={Platform.OS=='ios'?'padding':'android'}>

                <TouchableOpacity style={[{width:"100%"}]} onPress={()=>{}} activeOpacity={1}>{/*Toma ñapa. Para que no se active el padre, le pongo touchableopacity pero que no hace nada, ni siquiera animación */}
                {/* Add player text */}
                <Text style={globalStyles.title}> Editar jugador</Text>
                <Text style={globalStyles.centeredText}>{this.state.name2}</Text>{/* Previous playername*/}
                        {/* Input text */}
                        <TextInput
                            onChangeText={(text) => this.setState({text})}
                            value={this.state.text}
                            style={styles.textInput}
                            placeholder={"Introduce el nombre del jugador"}
                            autoCompleteType='name'
                            keyboardAppearance='dark'
                            maxLength={25}
                        />
                        {/* Separator */}
                        <View style={[globalStyles.barView, styles.barView]}></View>

                        {/* Buttons */}
                        <View style={globalStyles.rowView}>
                            {/* Delete button */}
                            <TouchableOpacity
                            style={[globalStyles.closeButton, styles.playerButton, {width:'50%'}]}
                            //Delete player from parent class
                            onPress={this.deletePlayer=()=>{
                                this.props.deletePlayer(this.props.player);
                                this.setState({text:''})
                                onCloseModal()
                            }}>
                                <Text style={[globalStyles.closeButtonText, styles.playerButtonText, {color:'red'}]}>Eliminar</Text>
                            </TouchableOpacity>

                            {/* Vertical 1rem separator */}
                            <View style={styles.buttonSeparator}></View>

                            {/* Save button */}
                            <TouchableOpacity 
                            style={[globalStyles.closeButton, styles.playerButton, {width:'50%'}]}
                            onPress={this.editPlayer=()=>{
                                if(this.state.text === ''||this.state.text===' ')
                                {//Name can't be empty validation
                                    this.refs.toast.show("El nombre no puede estar vacío");
                                }
                                else{//Edit player on parent class and close modal
                                    var p = {id:this.props.player.id, name:this.state.text};
                                    this.props.editPlayer(p);
                                    this.setState({text:''})
                                    onCloseModal()
                                }
                                
                            }}>
                                <Text style={[globalStyles.closeButtonText, styles.playerButtonText]}>Guardar</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
            </KeyboardAvoidingView>

        </TouchableOpacity>
        
        <Toast ref="toast"/>
      </Modal>
    );
  }
}
