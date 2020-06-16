import React from 'react'
import { 
    SafeAreaView,
    View,
    Text, 
    AsyncStorage,
    TouchableOpacity,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Toast, {DURATION} from 'react-native-easy-toast'

import CoctelModal from '../../components/CoctelModal'
import PlayersModal from '../../components/PlayersModal';
import GameChallenge from '../gameChallengeFragment'
import GameWhowould from '../gameWhowouldFragment'
import * as constants from '../../constants/constants'
import styles from "./styles"
import globalStyles from "../../constants/globalStyles"

var randomCoctel;
//var playersList;
var self;

class GamesFragment extends React.Component{
    constructor(){
        super();
        //Initial order and drink type
        
        this.state={
            coctelModalVisible:true,     
            playersModalVisible:false,     
            gameChallengeVisible:false,
            gameWhowouldVisible:false,
            playersList:null,
        }
        this.getData();
        self = this;
        //Gets a initial coctel to load it on the modal. 
        //Otherway, it would crash, as coctel would be null
        randomCoctel=this.getInitialCoctel;
    }

    UNSAFE_componentWillMount(){        
        randomCoctel=this.getRandomCoctel();
    }

    getInitialCoctel=()=>{
        //By calling this on the first load, it gets a coctel and DOESN'T open the modal
        let x = Math.floor((Math.random() * constants.coctels.length) + 0);
        while(randomCoctel==constants.coctels[x])
        {
            x = Math.floor((Math.random() * constants.coctels.length) + 0);
        }
        randomCoctel=constants.coctels[x];
        return randomCoctel;
    }

    getRandomCoctel = () => {
        //Get a random coctel and open the modal
        let x = Math.floor((Math.random() * constants.coctels.length) + 0);
        while(randomCoctel==constants.coctels[x])
        {
            x = Math.floor((Math.random() * constants.coctels.length) + 0);
        }
        randomCoctel=constants.coctels[x];
        this.toggleCoctelModal();
        return randomCoctel;
    }

    getData = async () => {
        //Get players to validate if there are any at game button click
        try {
            let data = await AsyncStorage.getItem(constants.PLAYERS_KEY);
            data = JSON.parse(data);
            self.setState({playersList:data});
            console.log("GETDATA", data);
            if(self.state.playersList === null) {
                self.setState({playersList:[]})
            }
        } catch(e) {
            // error reading value
        }
    }

    checkPlayers(){
        console.log("LENGTH:", self.state.playersList && self.state.playersList.length);
        //console.log(self.state.playersList);
        if(self.state.playersList===null||(self.state.playersList&&self.state.playersList.length===0))
        {
            self.refs.toast.show("Añade jugadores antes");
            return false;
        }
        else{
            if(self.state.playersList.length===1){
                self.refs.toast.show("Añade más jugadores");
                return false;
            }            
        }
        return true;
    }

    //Show/Hide modal (random coctel)
    toggleCoctelModal = () => {
        this.setState({ coctelModalVisible: !this.state.coctelModalVisible });
    };

    //Show/Hide modal (players)
    togglePlayersModal = () => {
        this.setState({playersModalVisible: !this.state.playersModalVisible});
        this.getData();
    };

    //Show/Hide modal (challenges Game)
    toggleGameChallenge = () => {
        this.setState({gameChallengeVisible: !this.state.gameChallengeVisible});
    };

    //Show/Hide modal (whowould Game)
    toggleGameWhowould = () => {
        this.setState({gameWhowouldVisible: !this.state.gameWhowouldVisible});
    };

    render()
    {
        return(
            <SafeAreaView style={globalStyles.container}>
                <ScrollView>
                    <View style={[globalStyles.card, styles.card]}>
                        {/* Layout title */}
                        <Text style={[globalStyles.bigTitle]}>JUEGOS</Text>
                        {/* Different buttons for different games */}
                        <TouchableOpacity style={[globalStyles.button, styles.topButton]}
                            onPress={this.getRandomCoctel}>
                            <Text style={globalStyles.centeredText}> Bebida aleatoria </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[globalStyles.button, styles.topButton]}
                            onPress={()=>{
                                if(this.checkPlayers()){
                                    this.toggleGameWhowould();
                                }
                            }}>
                            <Text style={globalStyles.centeredText}> ¿Quién es más probable que...? </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[globalStyles.button, styles.topButton]}
                        onPress={()=>{
                            if(this.checkPlayers()){
                                this.toggleGameChallenge();
                            }
                        }}>
                            <Text style={globalStyles.centeredText}> Retos </Text>
                        </TouchableOpacity>
                    </View>
                    {/* Players button */}
                    <TouchableOpacity style={[globalStyles.button, styles.playersButton]}
                        onPress={this.togglePlayersModal}>
                        <Text style={globalStyles.centeredText}>Jugadores</Text>
                    </TouchableOpacity>
                </ScrollView>      
                {/* Random coctel info loader */}
                <CoctelModal 
                    onRef={ref => (this.Option = ref)}
                    cocktail={randomCoctel}
                    visible={this.state.coctelModalVisible}
                    onCloseModal={this.toggleCoctelModal}/>    
                {/* Players loader */}
                <PlayersModal
                    onRef={ref => (this.Option = ref)}
                    visible={this.state.playersModalVisible}
                    onCloseModal={this.togglePlayersModal}/>    
                <GameChallenge
                    onRef={ref => (this.Option = ref)}
                    visible={this.state.gameChallengeVisible}
                    onCloseModal={this.toggleGameChallenge}
                    players={this.state.playersList}/>
                <GameWhowould
                    onRef={ref => (this.Option = ref)}
                    visible={this.state.gameWhowouldVisible}
                    onCloseModal={this.toggleGameWhowould}
                    players={this.state.playersList}/>
                <Toast ref="toast"/>
            </SafeAreaView>
        )
    }
}

export default GamesFragment;