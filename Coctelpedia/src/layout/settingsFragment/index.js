import React from 'react'
import { 
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Share,
    TextInput,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { ScrollView} from 'react-native-gesture-handler';
import IconM from "react-native-vector-icons/MaterialCommunityIcons";
import Toast, {DURATION} from 'react-native-easy-toast';
import * as MailComposer from 'expo-mail-composer';

import globalStyles from '../../constants/globalStyles';
import styles from './styles'
import * as colors from '../../constants/colors'
import * as constants from '../../constants/constants'

const imageSize = 25 //Size for email, share-variant and star icons
const stars = [0,1,2,3,4]
class SettingsFragment extends React.Component{
    constructor(){
        super()

        this.state={
            //Initial color for "share" button stars
            starColor:[colors.textWhite, colors.textWhite, colors.textWhite, colors.textWhite, colors.textWhite],
            text:'',
        }
    }

    emailPress(sub){
        //Compose email with the subject given
        MailComposer.composeAsync({
            recipients:['deagle50uu@gmail.com'],
            subject:sub,            
        })
    }

    sharePress(){
        try {
            //Share intent with the message above
            Share.share({
              message: 'Coctelpedia: una aplicación para divertirte bebiendo con tus amigos y leer información sobre las bebidas más conocidas. Descárgala en: ' + constants.appUrl,
              url:constants.appUrl,
            });     
            
          } catch (error) {
            console.log(error.message);
          }
    }

    starPress(i){
        //Put yellow color on stars from 0 to selected star
        //Save this with async storage
        let sColor=this.state.starColor;

        for(let j = 0; j < stars.length ; j++)
        {
            if(j<=i)
            {
                sColor[j]='yellow';
            }
            else{
                sColor[j]=colors.textWhite;
            }
        }
        this.setState({starColor:sColor});

        this.postRatingToApi(i+1);

        this.refs.toast.show('Gracias por tu valoración');
        //Request review from store. on iOS, Linking.openURL, on android, StoreReview.requestReview()
        //Platform.OS==='ios'? Linking.openURL(constants.iosAppUrl+"?action=write-review"):StoreReview.requestReview()
    }

    postRatingToApi = (i) => {
        //Posts the rating pressed on the stars buttons to the api
        let details = {
            'rating':i,
        }
        var formBody = [];
        for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");


        //Post rating to api
        fetch(constants.API_DIRECTION+'/api/ratings',
        {
            method:'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody,            
        })
    }

    postPhraseToApi = () => {
        //Posts the phrase to the api
        if(this.state.text.length<10)
            this.refs.toast.show('La frase es demasiado corta');
        else
        {
            let details = {
            'text':this.state.text.toString(),
            }

            var formBody = [];

            for (var property in details) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }            
            formBody = formBody.join("&");
            //Post phrase to api
            fetch(constants.API_DIRECTION+'/api/temp_phrases',
            {
                method:'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formBody,            
            })
            console.log(formBody);
            this.refs.toast.show('La frase se ha subido correctamente');
            this.setState({text:''});
        }
        
    }

    render(){
        return(
            <SafeAreaView style={globalStyles.container}>                
                <ScrollView>                    
                    <KeyboardAvoidingView behavior={Platform.OS==='ios'?'position':''}>{/**/}

                    {/* Contact */}
                    <View style={globalStyles.card}>
                        <Text style={globalStyles.title}>Contacto</Text>
                        <Text style={globalStyles.centeredText}>Si tienes cualquier duda, sugerencia o aporte, no dudes en comunicárnoslo a los desarrolladores:</Text>
                        {/* Email icons and email address */}
                        <TouchableOpacity onPress={()=>this.emailPress("")}>
                            <View style={[globalStyles.rowView, styles.emailView]}>
                                <IconM name="email" size={imageSize} color={colors.textWhite} />
                                <Text selectable={true} style={[globalStyles.closeButtonText, styles.emailText]}>deagle50uu@gmail.com</Text>
                                <IconM name="email" size={imageSize} color={colors.textWhite} />
                            </View>
                        </TouchableOpacity>
                        {/* Bugs, new translation, translation issue... */}
                        <TouchableOpacity onPress={()=>this.emailPress("Error en la aplicación")} style={{maxWidth: 250, alignSelf:'center'}}>
                            <View style={[globalStyles.rowView, styles.emailView]}>
                                <Text style={[globalStyles.closeButtonText, styles.emailText]}> Reportar error</Text>
                            </View>
                        </TouchableOpacity>
                        
                    </View>
                    {/* Share */}
                    <TouchableOpacity activeOpacity={0.7} style={{width:'100%',}} onPress={this.sharePress}>
                    <View style={[globalStyles.card, {alignItems: 'center',}]}>
                        
                        <Text style={globalStyles.title}>Comparte la aplicación</Text>
                        <IconM name="share-variant" size={imageSize} color={colors.textWhite} />
                        
                    </View>
                    </TouchableOpacity>

                    {/* Rating */}
                    <View style={globalStyles.card}>
                        <Text style={globalStyles.title}>Deja tu valoración</Text>
                        <View style={[globalStyles.rowView, styles.starView]}>
                            {stars.map((element)=>{
                                return(
                                    <TouchableOpacity onPress={()=>this.starPress(element)} key={element}>
                                        <IconM name="star" size={imageSize} color={this.state.starColor[element]} />
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                    {/* Phrase */}
                    <View style={globalStyles.card}>
                        <Text style={globalStyles.title}>Sube tus propias frases</Text>
                        <TextInput
                            onChangeText={(text) => this.setState({text})}
                            value={this.state.text}
                            style={styles.textInput}
                            placeholder={"Introduce la frase a enviar"}//Hint
                            placeholderTextColor={colors.textWhite}
                            autoCompleteType='name'
                            keyboardAppearance='dark'//iOS only, change keyboard to dark, according to app's theme
                            maxLength={300}
                            clearButtonMode={'always'}//iOS only, button to delete phrase
                            onSubmitEditing={()=>{this.postPhraseToApi()}}
                            returnKeyType='go'
                        />

                    </View>

                    </KeyboardAvoidingView>
                    <Toast ref="toast"/>
                </ScrollView>                
            </SafeAreaView>
        )
    }
}

export default SettingsFragment;