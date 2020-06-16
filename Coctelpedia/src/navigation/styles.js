import {Dimensions} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
EStyleSheet.build({$rem: Dimensions.get('window').width / 400});
import * as colors from '../constants/colors'
import * as constants from '../constants/constants'

const styles = EStyleSheet.create({
    tabBar:{
        height:constants.navSize,
        backgroundColor:colors.navMenuBackground,
    },
    navBarText:{
        fontSize:"12rem",
        paddingBottom:"3rem",
    },
    tab:{
        paddingTop:"1rem",
        backgroundColor:colors.navMenuBackground,
    },
})

export default styles;
