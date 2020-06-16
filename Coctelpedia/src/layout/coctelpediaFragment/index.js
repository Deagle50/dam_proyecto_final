import React from 'react'
import { 
    SafeAreaView,
    ScrollView,
    View, 
    Text,
    Picker,    
    ActionSheetIOS,
    TouchableOpacity,
    Platform,
    YellowBox,
} from 'react-native'
import CheckBox from 'react-native-check-box'
import CoctelView from '../../components/coctelView'
import CoctelModal from '../../components/CoctelModal'
import TricksModal from '../../components/TricksModal'
import styles from './styles'
import globalStyles from '../../constants/globalStyles'
import * as colors from "../../constants/colors"
import * as constants from '../../constants/constants'

YellowBox.ignoreWarnings([
	'VirtualizedLists should never be nested', // TODO: Remove when fixed, shouldn't be a flatlist inside a scrollview, issue #7 https://github.com/Deagle50/ceit-practicas/issues/7
])

var randomCoctel;
var self;
    
class CoctelpediaFragment extends React.Component{    
    constructor(){
        super();
        //Initial order and drink type        
        this.state={
            ordenar:constants.ordenar,//All sorts
            orden:constants.ordenar[0],//Selected sort
            tipos:constants.tipos,//All drink types
            tipo:constants.tipos[0],//Selected drink type
            isCheckedVegan:false,//Vegan filter checkbox
            isCheckedVegetarian:false,//Vegetarian filter checkbox
            visible:true,//Coctel modal
            tricksModalVisible:false,
        }
        self = this;

        //Gets a initial coctel to load it on the modal. 
        //Otherway, it would crash, as coctel would be null
        randomCoctel=this.getInitialCoctel;
    }

    

    UNSAFE_componentWillMount(){        
        randomCoctel=this.getRandomCoctel();
    }

    changeStateVegan(){
        
        if(self.state.isCheckedVegan)
        {
            self.setState({isCheckedVegan:false});
        }else
        {//If put vegan to true, put vegetarian to true also            
            self.setState({isCheckedVegan:true});
            self.setState({isCheckedVegetarian:true});
        }
    }

    changeStateVegetarian(){
        if(self.state.isCheckedVegetarian&&self.state.isCheckedVegan)
        {
            //Can't change vegetarian if it's vegan
        }else
        {
            self.setState({isCheckedVegetarian:!self.state.isCheckedVegetarian})            
        }
    }

    getInitialCoctel=()=>{
        //By calling this on the first load, it gets a coctel and DOESN'T open the modal
        var x = Math.floor((Math.random() * constants.coctels.length) + 0);
        while(randomCoctel==constants.coctels[x])
        {
            x = Math.floor((Math.random() * constants.coctels.length) + 0);
        }
        randomCoctel=constants.coctels[x];
        return randomCoctel;
    }

    getRandomCoctel = () => {
        //TO-DO: try this with StringHelper, it should work
        //Get a random coctel and open the modal
        var x = Math.floor((Math.random() * constants.coctels.length) + 0);
        while(randomCoctel==constants.coctels[x])
        {
            x = Math.floor((Math.random() * constants.coctels.length) + 0);
        }
        randomCoctel=constants.coctels[x];
        this.toggleModal();
        return randomCoctel;
    }

    //Show/Hide modal (random coctel)
    toggleModal = () => {
        this.setState({ visible: !this.state.visible });
    };

    //Show/hidemodal (tricks)
    toggleTricksModal = () =>{
        this.setState({tricksModalVisible: !this.state.tricksModalVisible});
    }

    render(){    
        //Depending on the platform (iOS, Android) it will load a different render    
        return Platform.select({
            ios: () => this.renderIos(),
            android: () => this.renderAndroid(),
        })();        
    }
    
//#region iOS Render

    //iOS renderer (different picker)
    renderIos =() => {
        return(
            <SafeAreaView style={globalStyles.container}>
                <ScrollView>
                    <View style={[globalStyles.card, styles.card]}>
                        <Text style={[globalStyles.text,{fontWeight:'bold'}]}>Filtros</Text>
                        {/* Order by picker */}
                        <View style={globalStyles.rowView}>
                            <Text style={[globalStyles.text,styles.text]}>Ordenar por:</Text>
                            <TouchableOpacity onPress={this.showIosPickerOrderBy}>
                                <Text style={[globalStyles.text, styles.text, {textAlign:"right",}]}>{this.state.orden}</Text>
                            </TouchableOpacity>
                        </View>
                        {/* Drink types picker */}
                        <View style={globalStyles.rowView}>
                            <Text style={[globalStyles.text,styles.text]}>Tipo de bebida:</Text>
                            <TouchableOpacity onPress={this.showIosPickerDrinkTypes}>
                                <Text style={[globalStyles.text, styles.text, {textAlign:"right",}]}>{this.state.tipo}</Text>
                            </TouchableOpacity>
                        </View>
                        {/* Checkboxes */}
                        <View style={[globalStyles.rowView, styles.checkboxView]}> 
                        <View style={{flex:1}}>
                                <CheckBox
                                    style={[globalStyles.CheckBox, globalStyles.checkboxLeft]}
                                    onClick={this.changeStateVegetarian}
                                    isChecked={this.state.isCheckedVegetarian}
                                    rightText={"Vegetariano"}
                                    rightTextStyle={globalStyles.text} 
                                    checkBoxColor={"gray"}
                                    checkedCheckBoxColor={colors.checkBoxChecked}
                                />
                            </View>
                            <View style={{flex:1}}>
                                <CheckBox
                                    style={[globalStyles.CheckBox, globalStyles.checkboxRight]}
                                    onClick={this.changeStateVegan}
                                    isChecked={this.state.isCheckedVegan}
                                    rightText={"Vegano"}
                                    rightTextStyle={globalStyles.text}
                                    checkBoxColor={"gray"}                        
                                    checkedCheckBoxColor={colors.checkBoxChecked}
                                />
                            </View>
                        </View>
                    </View>
                    {/* Card bottom buttons */}
                    <View style={globalStyles.rowView}>
                        <TouchableOpacity style={[globalStyles.button, styles.button, styles.leftButton]}
                                            onPress={this.getRandomCoctel}>
                            <Text style={[globalStyles.centeredText, styles.buttonText]}>Bebida aleatoria</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[globalStyles.button, styles.button, styles.rightButton]} onPress={this.toggleTricksModal}>
                            <Text style={[globalStyles.centeredText, styles.buttonText]}>Trucos y consejos</Text>
                        </TouchableOpacity>
                    </View>
                    {/* Coctel list */}
                    <CoctelView 
                    vegetarian={this.state.isCheckedVegetarian} 
                    vegan={this.state.isCheckedVegan}
                    type={this.state.tipo}
                    order={this.state.orden}
                    onRef={ref => (this.Option = ref)}/>
                </ScrollView>
                {/* Random coctel info loader */}
                <CoctelModal 
                    onRef={ref => (this.Option = ref)}
                    cocktail={randomCoctel}
                    visible={this.state.visible}
                    onCloseModal={this.toggleModal}/>
                <TricksModal 
                    onRef={ref => (this.Option = ref)}
                    visible={this.state.tricksModalVisible}
                    onCloseModal={this.toggleTricksModal}/>
            </SafeAreaView>
        )
    } 
    
    //iOS picker orderby
    showIosPickerOrderBy = () => {
        ActionSheetIOS.showActionSheetWithOptions(
          {
              //The options to put on the list
            options: [...this.state.ordenar]
          },
          (buttonIndex) => {
              this.setState({
                  orden:this.state.ordenar[buttonIndex]
              })
          },
        );        
    }

    //iOS picker drink type
    showIosPickerDrinkTypes = () => {
        ActionSheetIOS.showActionSheetWithOptions(
            {
                //The options to put on the list
            options: [...this.state.tipos]
            },
            (buttonIndex) => {
                this.setState({
                    tipo:this.state.tipos[buttonIndex]
                })
            },
        );        
    } 
//#endregion

    //#region Android render
    renderAndroid =() =>{
        return(
            <SafeAreaView style={globalStyles.container}>
                <ScrollView>
                    <View style={[globalStyles.card, styles.card]}>
                        <Text style={[globalStyles.text,{fontWeight:'bold'}]}>Filtros</Text>
                        {/* Order by picker */}
                        <View style={[globalStyles.rowView]}>{/* FlexDirection:'row' */}
                            <Text style={[globalStyles.text,styles.text, styles.pickerLeftText]}>Ordenar por:</Text> 
                            <Picker style={[globalStyles.text, styles.picker]}
                                selectedValue={this.state.orden}
                                onValueChange={(itemValue)=>{this.setState({orden:itemValue})}}>

                                {this.state.ordenar.map(element => {
                                    return(<Picker.Item label={element} value={element} key={element}/>)
                                })}
                                
                            </Picker>
                        </View>                        
                        {/* Drink types picker */}
                        <View style={globalStyles.rowView}>
                            <Text style={[globalStyles.text,styles.text, styles.pickerLeftText]}>Tipo de bebida:</Text>
                            <Picker style={[globalStyles.text, styles.picker]}
                                selectedValue={this.state.tipo}
                                onValueChange={(itemValue)=>{this.setState({tipo:itemValue})}}
                                >
                                {this.state.tipos.map(element => {
                                    return(<Picker.Item label={element} value={element} key={element}/>)
                                })}
                                
                                
                            </Picker>
                        </View>
                        {/* Checkboxes */}
                        <View style={[globalStyles.rowView, styles.checkboxView]}>                        
                            <View style={{flex:1}}>
                                <CheckBox
                                    style={[globalStyles.CheckBox, globalStyles.checkboxLeft]}
                                    onClick={this.changeStateVegetarian}
                                    isChecked={this.state.isCheckedVegetarian}
                                    rightText={"Vegetariano"}
                                    rightTextStyle={globalStyles.text}    
                                    checkBoxColor={"gray"}                        
                                    checkedCheckBoxColor={colors.checkBoxChecked}
                                />
                            </View>
                            <View style={{flex:1}}>
                                <CheckBox
                                    style={[globalStyles.CheckBox, globalStyles.checkboxRight]}
                                    onClick={this.changeStateVegan}
                                    isChecked={this.state.isCheckedVegan}
                                    rightText={"Vegano"}
                                    rightTextStyle={globalStyles.text}
                                    checkBoxColor={"gray"}                        
                                    checkedCheckBoxColor={colors.checkBoxChecked}
                                />  
                            </View>
                        </View>                    
                    </View>
                    {/* Card bottom buttons */}
                    <View style={globalStyles.rowView}>
                        <TouchableOpacity style={[globalStyles.button, styles.button]}
                                            onPress={this.getRandomCoctel}>
                            <Text style={[globalStyles.centeredText, styles.buttonText]}>Bebida aleatoria</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[globalStyles.button, styles.button, {marginLeft:0}]} onPress={this.toggleTricksModal}>
                            <Text style={[globalStyles.centeredText, styles.buttonText]}>Trucos y consejos</Text>
                        </TouchableOpacity>
                    </View>
                    {/* Coctel list */}
                    <CoctelView 
                    onRef={ref => (this.Option = ref)}
                    vegetarian={this.state.isCheckedVegetarian} 
                    vegan={this.state.isCheckedVegan}
                    type={this.state.tipo}
                    order={this.state.orden}
                    />
                </ScrollView>
                
                {/* Random coctel info loader */}
                <CoctelModal 
                    onRef={ref => (this.Option = ref)}
                    cocktail={randomCoctel}
                    visible={this.state.visible}
                    onCloseModal={this.toggleModal}/>
                {/* Tricks modal */}
                <TricksModal 
                    onRef={ref => (this.Option = ref)}
                    visible={this.state.tricksModalVisible}
                    onCloseModal={this.toggleTricksModal}/>
            </SafeAreaView>
        )
    }

    //#endregion

};

export default CoctelpediaFragment;