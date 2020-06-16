import {Dimensions} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import * as colors from '../../constants/colors'
EStyleSheet.build({$rem: Dimensions.get('window').width / 380});

const styles = EStyleSheet.create({
    //Container, the card itself
    card:{
        padding: "7rem",
        marginTop:"8rem",
        marginBottom:"8rem",
    },

    //Imageview
    leftView:{
        flex:1,
        borderRadius:5,
    },

    //Right view, with title, coctel type and price
    rightView:{
        flex:2,
    },

    //Checkboxes
    bottomView:{
        marginTop:"4rem",
        flexDirection:'row',
    },    

    //Title
    bigTitle:{
        alignSelf: 'flex-start',
    },

    //Image
    image:{        
        width:"100rem",
        height:"100rem",
        borderRadius:"4rem",
    },

    
    //Graduation text
    graduation:{
        fontSize: "20rem",
        color: colors.textWhite,
        marginEnd:"3rem",
    }
})

export default styles;