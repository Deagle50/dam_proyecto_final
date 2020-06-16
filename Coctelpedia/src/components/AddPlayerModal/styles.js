import {Dimensions} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import * as colors from '../../constants/colors'
EStyleSheet.build({$rem: Dimensions.get('window').width / 380});

const styles = EStyleSheet.create({
    //Background view
    container:{
        flex:1,
        backgroundColor:"rgba(0,0,0,0.5)",
        justifyContent: 'center',
    },

    //Front view
    modal:{
        width:"75%",
        alignSelf: 'center',
        borderRadius:"12rem",
        backgroundColor:colors.navMenuBackground,
        paddingTop:"20rem",
    },

    //Separator view
    barView:{
        height:1,
        marginTop:"4rem",
        backgroundColor:"rgba(104,104,104,0.5)"
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
    
    //Save player button
    savePlayerButton:{
        paddingBottom:"10rem",
        paddingBottom:"10rem",
    },
    
    //Save player button text
    savePlayerButtonText:{
        textAlign:'center',
    },
    
})

export default styles;
