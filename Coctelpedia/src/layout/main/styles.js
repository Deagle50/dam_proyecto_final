import {Platform, Dimensions} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
EStyleSheet.build({$rem: Dimensions.get('window').width / 380});

const styles = EStyleSheet.create({

    image:{
      alignSelf:'center',
      width:"260rem",
      height:"260rem",
    },
  });

  export default styles;

  //module.exports = styles;