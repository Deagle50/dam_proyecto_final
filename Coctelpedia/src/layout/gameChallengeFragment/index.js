import React from 'react'
import {
    Modal,
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native'
import Toast, {DURATION} from 'react-native-easy-toast';

import * as constants from '../../constants/constants'
import styles from './styles'
import globalStyles from '../../constants/globalStyles'
import {gameChallenges} from '../../constants/games'
import stringHelper from '../../helpers/stringHelper'
import CoctelModal from '../../components/CoctelModal'

var self;
var pList = [];
var newChallenges=[];
var newPlayers = [];
var newPhrases = [];
var i = 0;
var firstLoad = true;
var randomCoctel;

var challenges = [];

class GameChallenge extends React.Component{
    constructor(){
        super();
        this.state={
            playersList:null,
            phrase:null,
            challenge:null,
            player:null,
            coctelModalVisible:true,     
        }        
        self = this;
        
        //this.getData();
        randomCoctel=this.getInitialCoctel;
    }
    
    UNSAFE_componentWillMount(){        
        randomCoctel=this.getRandomCoctel();
    }

    componentDidMount = () => {
        this.props.onRef(this)        
        challenges = gameChallenges;
        self.getApiPhrases();
        
        self.getData();
    }

    componentWillUnmount = () => {
        this.props.onRef(this)
    }

    getApiPhrases = () => {
        //consume rest api data
        fetch(constants.API_DIRECTION+'/api/challenges')
        .then(response => response.json())
        .then(phrases => {
            //If it connects, use phrases from api
            console.log("Connected");
            challenges = phrases;
        })
        .catch(()=>{
            //If it doesn't connect, use phrases from constants
            console.log("Not connected");
            self.refs.toast.show("No se ha podido conectar con el servidor, no tendrás las frases actualizadas.");
            challenges = gameChallenges;
        });
    }

    getData = () => {
        //Set players from props as playerlist
        self.setState({playersList:self.props.players});  
        pList=self.props.players; 
        if(firstLoad){
            self.getNext();
        }  
        
    }

    getNext = () => {
        let ch, pl, ph;
        if(firstLoad)
        {
            firstLoad=false;

            ch=stringHelper.getRandomString(newChallenges[i], challenges);
            pl=stringHelper.getRandomString(newPlayers[i], pList);
            // //console.log("PLAYER", pl.name);
            ph=pl.name+', '+ch.text+'.';
            //ph=ch.text+'.';            
            self.setState({challenge:ch});
            self.setState({player:pl});
            self.setState({phrase:ph});
            newChallenges.push(ch);
            newPlayers.push(pl);
            newPhrases.push(ph);
            newChallenges.push(ph);
        }
        else if(i<newPhrases.length-1){
            //If its not located on last position, shows the next on the array
            i++;//IDK if here or below
            self.setState({phrase:newPhrases[i]})            
        }else{
            ch=stringHelper.getRandomString(newChallenges[i], challenges);
            pl=stringHelper.getRandomString(newPlayers[i], pList);            
            //console.log("prevPLAYER", newPlayers[i].name, pl.name);
            ph=pl.name+', '+ch.text+'.';
            self.setState({challenge:ch});
            self.setState({player:pl});
            self.setState({phrase:ph});
            newPlayers.push(pl);
            newPhrases.push(ph);
            newChallenges.push(ph);
            i++;
        }
    }


    getPrev(){
        if(i>0) {
            if(i==1)
            {
                i=0;
                self.setState({phrase:newPhrases[i]})            
            }
            else{
                i--;
                self.setState({phrase:newPhrases[i]})
            }
        }
    }

    getInitialCoctel=()=>{
        //By calling this on the first load, it gets a coctel and DOESN'T open the modal
        let x = Math.floor((Math.random() * constants.coctels.length) + 0);
        while(randomCoctel==constants.coctels[x])
        {
            x = Math.floor((Math.random() * constants.coctels.length) + 0);
        }
        let r = constants.coctels[x];
        return r;
    }

    getRandomCoctel = () => {
        //Get a random coctel and open the modal
        var x = Math.floor((Math.random() * constants.coctels.length) + 0);
        while(randomCoctel==constants.coctels[x])
        {
            x = Math.floor((Math.random() * constants.coctels.length) + 0);
        }
        randomCoctel=constants.coctels[x];
        this.toggleCoctelModal();
        return randomCoctel;
    }

    //Show/Hide modal (random coctel)
    toggleCoctelModal = () => {
        this.setState({ coctelModalVisible: !this.state.coctelModalVisible });
    };

    render(){
        const { onCloseModal } = this.props;
        
        return(
            <Modal
            visible={this.props.visible}
            onRequestClose={onCloseModal}
            >
                <SafeAreaView style={[globalStyles.container, styles.container]}>
                    <View style={[globalStyles.rowView, styles.topView]}>
                        <TouchableOpacity style={[globalStyles.closeButton, {alignSelf:'center'}]} onPress={onCloseModal}>
                            <Text style={globalStyles.closeButtonText}>Cerrar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[globalStyles.button, styles.button]} onPress={this.getRandomCoctel}>
                            <Text style={globalStyles.centeredText}>Bebida aleatoria</Text>
                        </TouchableOpacity>
                    </View>
                    {/* Top cardview, title and phrase */}
                    <View style={[globalStyles.card, styles.card]}>
                        <Text style={[globalStyles.bigTitle, styles.bigTitle]}>Retos</Text>
                        <Text style={[globalStyles.centeredText, globalStyles.title, styles.centeredText]}>{this.state.phrase}</Text>
                    </View>
                    {/* Bottom cardview, previous and next buttons */}
                    <View style={[globalStyles.card, globalStyles.rowView, styles.buttonView]} >
                        <TouchableOpacity style={[globalStyles.button, styles.button]} onPress={this.getPrev}>
                            <Text style={[globalStyles.centeredText, styles.text]}>Frase anterior</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[globalStyles.button, styles.button]} onPress={this.getNext}>
                            <Text style={[globalStyles.centeredText, styles.text]}>Siguiente frase</Text>
                        </TouchableOpacity>
                    </View>
                    <Toast ref="toast"/>
                    <CoctelModal 
                        onRef={ref => (this.Option = ref)}
                        cocktail={randomCoctel}
                        visible={this.state.coctelModalVisible}
                        onCloseModal={this.toggleCoctelModal}/>
                </SafeAreaView>
            </Modal>
        )
    }
}

export default GameChallenge;