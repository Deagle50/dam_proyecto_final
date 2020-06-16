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

import styles from './styles'
import globalStyles from '../../constants/globalStyles'
import * as colors from '../../constants/colors'
import * as constants from '../../constants/constants'
import AddPlayerModal from '../AddPlayerModal'
import EditPlayerModal from '../EditPlayerModal'

var self

class PlayersModal extends React.Component{
    constructor(props){
        super(props)
        this.state={
            addPlayerModalVisible:false,
            editPlayerModalVisible:false,
            currentPlayer:null,
            playersList:null,
        }  
        //AsyncStorage.clear();//Only remove comment to delete ALL data on AsyncStorage
        this.getData();
        self = this;
    }
    
    componentDidMount() {        
        this.props.onRef(this);
    }
        
    componentWillUnmount() {
        this.props.onRef(undefined)
    }
    
    getData = async () =>{
        //Get data (data) from key (PLAYERS_KEY) and save it as state
        try {
            let data = await AsyncStorage.getItem(constants.PLAYERS_KEY);
            data = JSON.parse(data);
            self.setState({playersList:data})
            if(self.state.playersList === null) {
                self.setState({playersList:[]})
            }
        } catch(e) {
            // error reading value
        }
    }
    
    storeData = async (list) => {
        //Save data (list) at key (PLAYERS_KEY)
        try {     
            await AsyncStorage.setItem(constants.PLAYERS_KEY, JSON.stringify(list));            
        } catch (e) {
          // saving error
        }
    } 

    addPlayer(player){//this function is executed from child "AddPlayerModal"
        if(self.dontLetHimBeGod(player))//Validate input
        {
            var i=self.generateID();//Create random id, to not use index (this way avoiding conflict with deletions)
            console.log("ID: ", i)//It's nice to see the random keys generated XD
            var p;
            if(self.state.playersList===null)
            {                
                self.setState({playersList:[]})
            }
            p = {id:i, name:player};
            self.state.playersList.push(p);//TODO: This shouldn't work, but it does, and haven't found form to change it, issue #11 https://github.com/Deagle50/ceit-practicas/issues/11            
            self.storeData(self.state.playersList);
            self.refs.toast.show(player + " añadido");//Show toast at add
        }
    }

    editPlayer(player){//This funtcion is executed  from child "EditPlayerModal"
        if(self.dontLetHimBeGod(player))//Validate input
        {
            let newPlayerList = self.state.playersList;//Create new list, can't change state directly
            const updateIndex = self.state.playersList.findIndex(p => p.id === player.id);
            newPlayerList[updateIndex]=player
            self.setState({playersList:newPlayerList});//Overwrite state with new list
            self.storeData(newPlayerList);
            self.refs.toast.show(player.name + " actualizado");//Show toast at edit
        }
    }
    
    deletePlayer(player){//This function is executed from child "EditPlayerModal"
        const newPlayerList = self.state.playersList.filter(p => p.id !== player.id);//Creates a new list WITHOUT the player given, so instead of delete it directly, it overwrites the previous list with a new one but whitout that player
        self.setState({playersList:newPlayerList});//Overwrite state with new list
        self.storeData(newPlayerList);
        self.refs.toast.show(player.name+" eliminado");//Show toast at delete
    }
    
    dontLetHimBeGod(player){
        //Easter egg: when you input "No hay jugadores" (same text as empty list) it throws a toast and doesn't save the player
        if(player==="No hay jugadores"||player.name==="No hay jugadores")
        {
            self.refs.toast.show("No te creas Dios, no se puede añadir ese jugador");
            return false;//Doesn't let continue parent function
        }
        return true;//Lets continue parent funtion
    }

    //Show/Hide modal (AddPlayer)
    toggleAddPlayersModal=()=>{
        this.setState({addPlayerModalVisible: !this.state.addPlayerModalVisible});
    }

    //Show/Hide modal(EditPlayer)
    toggleEditPlayersModal=()=>{
        this.setState({editPlayerModalVisible: !this.state.editPlayerModalVisible});
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
                {/* Top transparent container to close modal */}
                <View style={globalStyles.modalTopContainer}>                    
                        <TouchableOpacity onPress={onCloseModal} style={{height:"100%", width:"100%"}}>
                        </TouchableOpacity>                    
                </View>

                {/* Modal container and its contents */}
                <View style={[globalStyles.modalContainer, {justifyContent:'space-between'}]}>
                    {/* View at top, close button, player name and player quantity */}
                    <View>
                    {/* Close button */}
                    <View style={[globalStyles.rowView, {justifyContent: 'flex-end',}]}>
                        <TouchableOpacity style={globalStyles.closeButton} onPress={onCloseModal}>                    
                            <Text style={[globalStyles.text, globalStyles.closeButtonText]}>Cerrar</Text>
                        </TouchableOpacity>                    
                    </View>
                    {/* Top view, players, number of players and separator bar */}
                    <View style={styles.topBarView}>
                    <View style={[globalStyles.rowView, styles.topView]}>
                        <View style={styles.leftView}></View>{/*View to make players stay at center*/}
                        <Text style={globalStyles.title}>Jugadores</Text>
                        <Text style={[globalStyles.title, styles.rightText]}>{!self.state.playersList?0:self.state.playersList.length}</Text>
                    </View>
                    
                    {/* Horizontal separator */}
                    <View style={globalStyles.barView}></View>
                    </View>
                        <View style={globalStyles.card}>
                            {/* Player List */}
                            <FlatList
                                data={self.state.playersList}
                                keyExtractor={item=>item.id.toString()}
                                renderItem={({item})=>(                                    
                                    /* List Item */
                                    <TouchableOpacity onPress={() => {
                                        this.setState({currentPlayer:item});
                                        this.toggleEditPlayersModal();
                                        }
                                    } style={{width:"100%"}}>
                                        {/*console.log("LISTITEM", item)*/}
                                            <Text style={globalStyles.centeredText}>{item.name}</Text>
                                    </TouchableOpacity>
                                )}
                                ItemSeparatorComponent={this.itemSeparator=()=>(                                    
                                    /* Separator for each player*/
                                        <View
                                            style={{
                                                height: 1,
                                                marginTop:3,
                                                marginBottom:3,    
                                                backgroundColor: colors.cardBorder,
                                                marginLeft: "24%",
                                                marginRight:"24%",
                                            }}
                                        />
                                )}
                                ListEmptyComponent={this.emptyComponent=()=>(
                                    //This shows when there are no players
                                    /* Touchable opacity to insert players when there aren't*/ 
                                    <View>
                                        <TouchableOpacity style={{width:"100%", height:"100%"}} onPress={this.toggleAddPlayersModal}>
                                        <Text style={[globalStyles.centeredText]}>No hay jugadores</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                                style={styles.flatList}
                            />
                            
                        </View>
                    </View>
                    {/* View at bottom, add player button */}
                    <View>
                        <View style={[globalStyles.rowView, {alignSelf: 'flex-end',}]}>
                            <TouchableOpacity style={[globalStyles.closeButton, styles.addPlayerButton]} onPress={this.toggleAddPlayersModal}>                    
                                <Text style={[globalStyles.text, globalStyles.closeButtonText]}>Añadir jugador</Text>
                            </TouchableOpacity> 
                        </View>
                    </View>
                </View>
                <AddPlayerModal 
                onRef={ref => (this.Option = ref)}
                visible={this.state.addPlayerModalVisible}
                onCloseModal={this.toggleAddPlayersModal}
                addPlayer={this.addPlayer}
                />
                <EditPlayerModal
                onRef={ref=>(this.Option=ref)}
                visible={this.state.editPlayerModalVisible}
                onCloseModal={this.toggleEditPlayersModal}
                player={this.state.currentPlayer}
                editPlayer={this.editPlayer}
                deletePlayer={this.deletePlayer}
                />
                {/* Toast to show */}
                <Toast ref="toast"/>
            </Modal>
        )
    }

    generateID(){
        return '_' + Math.random().toString(36).substr(2, 9);
    }
}

export default PlayersModal;