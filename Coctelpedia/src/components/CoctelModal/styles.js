import {Dimensions} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import * as colors from '../../constants/colors'
EStyleSheet.build({$rem: Dimensions.get('window').width / 380});

const styles = EStyleSheet.create({
    //Bar view at top, above title and graduation
    topBarView:{
        paddingLeft:"20rem",
        paddingRight:"20rem",
    },

    //Top view with title, graduation and drink type
    topView:{
        justifyContent: 'space-between',
        marginTop:"4rem",
    },

    //View at mid with image, price and checkboxes
    middleView:{
        marginTop:"16rem",
    },

    //View at right of middleView, with info about price and chekcboxes
    rightInfoView:{
        padding:'10rem',
        width:"190rem",
    },

    //View of description and making
    bottomView:{
        padding:"20rem",
    },

    //Price text and price, separation between them
    textView:{
        justifyContent: 'space-between',
    },

    //Coctel image
    image:{        
        width:"160rem",
        height:"160rem",
        borderRadius:"8rem",
        borderColor:colors.cardBorder,
        borderWidth:"2rem",
        overflow: 'hidden',
    },

    //Image card, to put background if image has transparency
    imageCard:{
        marginLeft:"20rem",
        borderRadius:"8rem",        
        width:"160rem",
        height:"160rem",
        backgroundColor:colors.cardBackground,
    },

    //Close button, iOS style
    button:{        
        paddingTop:"10rem",
        paddingLeft:"20rem",
        marginBottom:"6rem",
        paddingRight:"20rem",
    },

    //Close button text, iOS style
    buttonText:{
        color:"#0B7EF3",
    },

    //Graduation text, at topView
    leftText:{
        marginTop:"4rem",
        minWidth: "100rem",
    },
    //Coctel type text, at topView
    rightText:{
        marginTop:"4rem",
        minWidth: "100rem",
        textAlign:'right',
    },
    
    //Vegetarian checkbox
    topCheckbox:{
        marginTop:"8rem",
    },

    //Description and making titles
    italicText:{
        marginTop:"6rem",
        fontStyle:'italic',
    },

    //Description and making texts
    longText:{
        marginLeft:"8rem",
        marginTop:"4rem",
        marginBottom:"8rem",
    },    

    //Separator bar
    bar:{
        alignSelf: 'center',
        height:"2rem",
        width:"100%",
        backgroundColor:colors.cardBackground,
    },
})

export default styles;