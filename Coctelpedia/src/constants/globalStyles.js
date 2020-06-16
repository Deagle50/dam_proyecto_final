import {Dimensions, Platform} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
EStyleSheet.build({$rem: Dimensions.get('window').width / 400});
import * as colors from './colors'
import Constants from 'expo-constants'


const globalStyles = EStyleSheet.create({
    // #region Views and containers

    //Usual container
    container:
    {
        //Put padding on status bar on android
        paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : null,
        backgroundColor: colors.appBackground,
        //flex:1,
        width:'100%',
        height:'100%',
    },

    //Modals top container to close modals
    modalTopContainer:{
        height:"20%",
    },

    //Modal rounded container
    modalContainer:{
        flex:1,
        backgroundColor:colors.navMenuBackground,
        borderTopLeftRadius: "15rem",
        borderTopRightRadius: "15rem",
    },

    //Material style card view
    card:{
        margin:"20rem",
        padding: "12rem",
        backgroundColor: colors.cardBackground,
        borderRadius: 12,
        borderColor: colors.cardBorder,
        borderWidth: 2,
    },

    //Simple view with row direction
    rowView:{
        flexDirection:'row',
    },

    //Separator bar for modals
    barView:{
        alignSelf: 'center',
        height:"2rem",
        width:"100%",
        backgroundColor:colors.cardBorder,
    },

    // #endregion
    
    //#region Text

    //Bigtitle
    bigTitle:{
        color: colors.textWhite,
        alignSelf:'center',
        fontSize:'30rem',
        fontWeight: "bold",
        
        margin:'15rem',
    },

    //Title
    title:{
        color: colors.textWhite,
        alignSelf:'center',
        fontSize: "20rem",
        fontWeight: "bold",
        paddingBottom:"8rem",
    },

    //Text around the app
    text:{
        color: colors.textWhite,
        fontSize: "17rem",
    },    

    boldText:{
        color: colors.textWhite,
        fontSize: '17rem',
        fontWeight:'bold',
    },
    
    //Same as previous, but centered XD
    centeredText:{
        color: colors.textWhite,
        textAlign:'center',
        fontSize: "17rem",
    }, 
    
    //Close button text style on modals
    closeButtonText:{
        color:"#0B7EF3",
        textAlign:'right',
    },

    //#endregion

    //#region Buttons, Checkboxes

    //Button style, blue color
    button:{
        margin:"7rem",
        padding:"10rem",
        backgroundColor:colors.primaryColor,
        borderRadius:8,
        width:"60%",     
    },

    //Close button style for modals
    closeButton:{        
        paddingTop:"10rem",
        paddingLeft:"20rem",
        paddingBottom:"10rem",
        paddingRight:"20rem",
    },

    //Just to appear checkboxes and their text
    checkbox:{
        flex:1,
    },

    //Checkboxes at the left (when appear vegan and vegetarian together on the same row)
    checkboxLeft:{
        marginLeft:"17%",
    },

    //Checkboxes at the right (when appear vegan and vegetarian together on the same row)
    checkboxRight:{
        marginLeft:"30%",
    },

    //#endregion
})

export default globalStyles;