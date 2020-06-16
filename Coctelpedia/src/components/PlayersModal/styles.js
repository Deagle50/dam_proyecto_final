import {Dimensions} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
EStyleSheet.build({$rem: Dimensions.get('window').width / 380});

const styles = EStyleSheet.create({
    //Separator bar at top
    topBarView:{
        paddingLeft:"20rem",
        paddingRight:"20rem",
    },

    //View with close button, players title and player quantity
    topView:{
        justifyContent: 'space-between',
        marginTop:"4rem",
    },

    //Empty view to put "Players" title at center
    leftView:{
        width:"100rem",
    },

    //Graduation text
    rightText:{
        width:"100rem",
        textAlign:'right',
    },

    //FlatList of players
    flatList:{
        maxHeight: "360rem",
    },
    
    //Bottom button to add players
    addPlayerButton:{
        paddingBottom:"10rem",
        marginBottom:0,
    },
})

export default styles;
