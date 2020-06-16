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

    midView:{
        padding:'20rem',
    },
    
})

export default styles;
