import {Dimensions} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
EStyleSheet.build({$rem: Dimensions.get('window').width / 400});

const styles = EStyleSheet.create({
    //Top cardView
    card:{
        borderWidth:"4rem",
        marginBottom:"8rem",
    },

    //Checkboxes
    checkboxView:{
        marginTop:"8rem",
    },

    text:{
        marginTop:"8rem",
        flex:0.9,
    },

    //Picker Android?
    picker:{
        flex:1.5,
        maxHeight: '35rem',
        //backgroundColor:'blue',
    },

    //Random drink and important info buttons
    button:{
        padding:"5rem",
        paddingTop:"9rem",
        paddingBottom:"9rem",
        width:"44%",
        marginStart:"20rem",
    },

    //Left button, random drink
    leftButton:{
        marginEnd:"3rem",
    },

    //Right button, info
    rightButton:{
        marginStart:"3rem",
    },

    //Buttons text
    buttonText:{
        fontSize:"13rem",
    },

    //Text at left of pickers
    pickerLeftText:{
        marginTop:"5rem",
    },

});

export default styles;