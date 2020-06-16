import {Dimensions} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
EStyleSheet.build({$rem: Dimensions.get('window').width / 380});
import * as constants from '../../constants/constants'

const Styles = EStyleSheet.create({
    //Container
    container:{
        paddingTop:"10rem",
    },

    //Buttons at top
    topView:{
        justifyContent: 'space-between',
        paddingRight:"14rem",        
    },

    //Card
    card:{
        marginTop:"12rem",
        marginBottom:"12rem",
        paddingBottom:"30rem",
        minHeight: "450rem",
    },

    //Bottons at bottom
    buttonView:{
        justifyContent: 'space-between',
    },

    //Bottom buttons, and random drink one
    button:{
        paddingLeft:"3rem",
        paddingRight:"3rem",
        width:"45%",
    },

    //Challenge game title
    bigTitle:{
        marginTop:'30rem',
        marginBottom:'30rem',
        flex:3,
    },

    //Chalenge text
    centeredText:{
        margin:'30rem',
        maxWidth: "300rem",
        fontWeight:'normal',
        flex:7
    },
});

export default Styles;