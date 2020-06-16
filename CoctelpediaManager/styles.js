import {Dimensions, Platform} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
EStyleSheet.build({$rem: Dimensions.get('window').width / 400});
import * as colors from './colors'
import Constants from 'expo-constants'


const styles = EStyleSheet.create({

    container:
    {
        //Put padding on status bar on android
        paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : null,
        backgroundColor: colors.appBackground,
        //flex:1,
        width:'100%',
        height:'100%',
    },

    //Simple view with row direction
    rowView:{
        flexDirection:'row',        
    },

    //Material style card view
    card:{
        flexDirection:'column',
        margin:"20rem",
        padding: "12rem",
        backgroundColor: colors.cardBackground,
        borderRadius: 12,
        borderColor: colors.cardBorder,
        borderWidth: 2,        
    },

    button:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },

    updateButton:{
        marginTop:'25rem',
        flex:3,
    },


    //Input text for phrase
    textInput:{
        flex:4,
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

    //Picker Android?
    picker:{
        //flex:4,
        maxHeight: '35rem',
        alignSelf:'center',
    },

    
    //Title
    title:{
        flex:8,
        color: colors.textWhite,
        alignSelf:'center',
        fontSize: "20rem",
        fontWeight: "bold",
        paddingBottom:"8rem",
        marginTop:'30rem',
    },

    //Text around the app
    text:{
        color: colors.textWhite,
        fontSize: "17rem",
    },    

    //Text around the app
    boldText:{
        color: colors.textWhite,
        fontSize: "17rem",
        fontWeight:'bold'
    },  
    
    //Same as previous, but centered XD
    centeredText:{
        color: colors.textWhite,
        textAlign:'center',
        fontSize: "17rem",
    }, 
    
  
})

export default styles;