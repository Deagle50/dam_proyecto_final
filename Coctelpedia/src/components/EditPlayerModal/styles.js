import {Dimensions} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import * as colors from '../../constants/colors'
EStyleSheet.build({$rem: Dimensions.get('window').width / 380});

const styles = EStyleSheet.create({
    //Background container
    container:{
        flex:1,
        backgroundColor:"rgba(0,0,0,0.5)",
        justifyContent: 'center',
    },

    //Front, the modal itself
    modal:{
        width:"75%",
        //height:"20%",
        alignSelf: 'center',
        borderRadius:"12rem",
        backgroundColor:colors.navMenuBackground,
        paddingTop:"20rem",
    },

    //Horizontal separator below input text
    barView:{
        height:"2rem",//It looks better with double rem than vertical separator
        marginTop:"4rem",
        backgroundColor:"rgba(104,104,104,0.5)"
    },

    //Vertical separator between buttons
    buttonSeparator:{
        height:'100%',
        backgroundColor:colors.cardBorder,
        width:"1rem",
    },

    //Both delete and save buttons
    playerButton:{
        paddingBottom:"10rem",
    },

    //Delete and save buttons text
    playerButtonText:{
        textAlign:'center',
    },

    //Input text
    textInput:{
        margin:"8rem",
        marginLeft:"20rem",
        marginRight:"20rem",
        borderRadius:"2rem",
        borderColor:colors.cardBorder,
        borderWidth:1,
        paddingLeft:"8rem",
        paddingRight:"4rem",
        color:colors.textWhite,
        height:"40rem",
    },
})

export default styles;