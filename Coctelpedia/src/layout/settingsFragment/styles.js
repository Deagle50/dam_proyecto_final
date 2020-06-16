import {Dimensions} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import * as colors from '../../constants/colors'
EStyleSheet.build({$rem: Dimensions.get('window').width / 380});

const styles = EStyleSheet.create({
    //View at top (may change position in future)
    emailView:{
        marginTop:"4rem",        
        alignSelf: 'center',
    },

    //View that cointains stars for rating
    starView:{
        marginTop:"5rem",
        paddingLeft:"50rem",
        paddingRight:"50rem",
        justifyContent: 'space-around',
    },

    //Email
    emailText:{
        marginLeft:"16rem",
        marginRight:"16rem",
        alignSelf: 'center',
        
    },

    //Input text for phrase
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
