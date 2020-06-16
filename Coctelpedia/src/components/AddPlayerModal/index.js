import React from 'react'
import {
    Modal,
    View,
    TextInput,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from 'react-native'
import styles from './styles'
import globalStyles from '../../constants/globalStyles'
import * as colors from '../../constants/colors'
import Toast, {DURATION} from 'react-native-easy-toast';

class AddPlayerModal extends React.Component{
    constructor(props){
        super(props)
        this.state={
            text: '',//Text for input text. Resets when adding a player
        }
    }
    
    componentDidMount() {
        this.props.onRef(this);    
    }
        
    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    

    render(){
        const { onCloseModal } = this.props;
        return(
            <Modal
                visible={this.props.visible}
                onRequestClose={onCloseModal}
                transparent={true}
                animationType="fade">
                {/* Background view to close front view */}
                <TouchableOpacity style={[{width:"100%", height:"100%"}, styles.container]} onPress={onCloseModal} activeOpacity={1}>
                    {/* Modal View */}                    
                    <KeyboardAvoidingView style={styles.modal}
                    behavior={Platform.OS==='ios'?'padding':'android'}>
                        <TouchableOpacity style={[{width:"100%"}]} onPress={()=>{}} activeOpacity={1}>{/*Toma ñapa. Para que no se active el padre, le pongo touchableopacity pero que no hace nada, ni siquiera animación y un onPress porque tiene que tenerlo XD*/}
                        {/* "Add player" text */}
                        <Text style={globalStyles.title}> Añadir jugador</Text>
                        {/* Text input */}
                        <TextInput
                            onChangeText={(text) => this.setState({text})}
                            value={this.state.text}
                            style={styles.textInput}
                            placeholder={"Introduce el nombre del jugador"}//Hint
                            autoCompleteType='name'
                            keyboardAppearance='dark'//iOS only, change keyboard to dark, according to app's theme
                            maxLength={25}
                        />
                        {/* Separator view, just a single line */}
                        <View style={[globalStyles.barView, styles.barView]}></View>
                        {/* Save button (it also closes the modal) */}
                        <TouchableOpacity 
                        style={[globalStyles.closeButton, styles.savePlayerButton]} 
                        onPress={this.savePlayer=()=>{
                            if(this.state.text === ''||this.state.text===" ")//Need to validate if has more spaces
                            {
                                this.refs.toast.show("El nombre no puede estar vacío");//Show error if name is empty or has only a whitespace
                            }
                            else{
                                this.props.addPlayer(this.state.text);//Add player on parent class with name on params
                                this.setState({text:''})//Clean input text to add more players
                                onCloseModal()
                            }
                        }}>
                            <Text style={[globalStyles.closeButtonText, styles.savePlayerButtonText]}>Guardar</Text>
                        </TouchableOpacity>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                    
                </TouchableOpacity>
                
                <Toast ref="toast"/>
            </Modal>
        )
    }
}

export default AddPlayerModal;
