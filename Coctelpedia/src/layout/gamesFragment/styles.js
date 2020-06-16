import {Dimensions} from 'react-native'
import * as colors from '../../constants/colors'
import EStyleSheet from 'react-native-extended-stylesheet'
EStyleSheet.build({$rem: Dimensions.get('window').width / 380});

const styles= EStyleSheet.create({
    //Buttons cardview
    card:{
        paddingBottom:'45rem',
        //minHeight: '400rem',
        //justifyContent: 'space-around',
    },
    
    //Top buttons, games ones
    topButton:{
        marginLeft:'20%',
        marginRight:'20%',
        alignSelf:'center',
        marginTop:'15rem',
        marginBottom:'15rem',
        paddingTop:'13rem',
        paddingBottom:'13rem',
        //width:'220rem',
    },

    //Players button
    playersButton:{
        width:"30%",
        alignSelf:'flex-end',
        marginTop:"5rem",
        marginEnd:"20rem",
    }
})

export default styles;