import React from 'react'
import {
    Modal,
    View,
    TouchableOpacity,
    Text,
    FlatList,
    AsyncStorage,
} from 'react-native'
import Toast, {DURATION} from 'react-native-easy-toast';
import {ScrollView} from 'react-native-gesture-handler'

import styles from './styles'
import globalStyles from '../../constants/globalStyles'
import * as colors from '../../constants/colors'
import * as constants from '../../constants/constants'
import AddPlayerModal from '../AddPlayerModal'
import EditPlayerModal from '../EditPlayerModal'

var self

class TricksModal extends React.Component{
    constructor(props){
        super(props)
        this.state={
            addPlayerModalVisible:false,
            editPlayerModalVisible:false,
            currentPlayer:null,
            playersList:null,
        }  
        self = this;
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
            animationType="slide"
            >                  
                {/* Top view, transparent, to close modal onPress */}
                <View style={globalStyles.modalTopContainer}>
                    <TouchableOpacity onPress={onCloseModal} style={{height:"100%", width:"100%"}}>
                    </TouchableOpacity>
                </View>    
                {/* Modal container and its contents */}
                <View style={[globalStyles.modalContainer, {/*justifyContent:'space-between'*/}]}>
                    {/* Close button */}
                    <View style={[globalStyles.rowView, {justifyContent: 'flex-end',}]}>
                        <TouchableOpacity style={globalStyles.closeButton} onPress={onCloseModal}>                    
                            <Text style={[globalStyles.text, globalStyles.closeButtonText]}>Cerrar</Text>
                        </TouchableOpacity>                    
                    </View>    
                    {/* View at top, close button, player name and player quantity */}
                    <Text style={[globalStyles.title, {paddingLeft:60, paddingRight:60, paddingBottom: 10, textAlign:'center'}]}>Trucos para preparar  los mejores cócteles</Text>
                     {/* Separator */}
                    <View style={[styles.topBarView, globalStyles.barView]}></View>
                    {/* Middle view, info */}
                    <ScrollView style={[styles.midView]}>
                        <Text style={[globalStyles.centeredText, globalStyles.boldText]}>Antes de empezar</Text>
                            <Text style={[globalStyles.centeredText, {fontSize:13}]}>Los consejos que se dan a continuación son solo una guía, cada usuario le puede dar su toque, que probablemente mejore su experiencia a la hora de tomar la bebida que sea.</Text>
                        <Text style={[globalStyles.boldText, {marginTop:10}]}>Servir y tomar frío:</Text>
                            <Text style={[globalStyles.text, {margin:10}]}>Tener la bebida fría de antemano, se puede enfriar rápidamente envolviéndola en papel mojado y metiéndola al congelador
                            Hacen falta hielos para mantener la temperatura. Para bebidas largas como cubatas, se recomiendan hielos grandes, para bebidas más pequeñas como cócteles, 
                            hielo picado. Se puede enfriar el vaso también para darle un mejor toque.</Text>
                        <Text style={[globalStyles.boldText, {marginTop:10}]}>Calidad antes que cantidad:</Text>
                            <Text style={[globalStyles.text, {margin:10}]}>Si se puede pagar, es mejor comprar algo de mejor calidad, y no usar bebidas alcohólicas baratas, ya que estas empeorarán el resultado, y también es más fácil que provoquen resaca.</Text>
                        <Text style={[globalStyles.boldText]}>Orden de ingredientes:</Text>
                            <Text style={[globalStyles.text, {margin:10}]}>Hielo, azúcar, leche/zumo/huevo y alcohol, de menor a mayor graduación.</Text>
                        <Text style={[globalStyles.boldText]}>Toque final:</Text>
                            <Text style={[globalStyles.text, {margin:10, marginBottom:40}]}>Se puede decorar con figuras pequeñas que no estropeen el cóctel, o añadir ingredientes como aceitunas, rodajas de limón/lima/naranja e incluso unas hojas de menta.</Text>
                    </ScrollView>
                </View>
                {/* Toast to show */}
                <Toast ref="toast"/>
            </Modal>
        )
    }
}

export default TricksModal;