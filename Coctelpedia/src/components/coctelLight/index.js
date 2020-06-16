import React from 'react'
import {
    View,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native'
import CheckBox from 'react-native-check-box'

import globalStyles from '../../constants/globalStyles'
import styles from './styles'
import * as colors from '../../constants/colors'
import CoctelModal from '../CoctelModal'

//MiniCoctel View for "RecyclerView" on CoctelpediaFragment

class CoctelLight extends React.Component{
    constructor(){
        super()

        this.state={
            //The modal by default is not visible
            visible:false,
            //At load, image must be empty, it loads later
            img:null,
        }
    }

    componentDidMount() {
        this.props.onRef(this)        
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    UNSAFE_componentWillMount(){
        //Image loads now
        this.setState({img:this.props.cocktail.image})
    }

    //Show/Hide modal (more information about coctel)
    toggleModal = () => {
        this.setState({ visible: !this.state.visible });
      };

    render(){
        return(
            //Can click everywhere on the card to show more information
            <TouchableOpacity onPress={this.toggleModal}>
                <View style={[globalStyles.card, styles.card]}>            
                    <View style={globalStyles.rowView}>
                        {/* Image */}
                        <View style={styles.leftView}>
                            <Image
                            source={this.state.img} 
                            style={styles.image}/>
                        </View>
                        
                        <View style={styles.rightView}>
                            {/* Name, graduation */}
                            <View style={[{flexDirection:'row', justifyContent:'space-between'}]}>
                                <Text style={[globalStyles.title, styles.bigTitle]}>{this.props.cocktail.name}</Text>
                                <Text style={[styles.graduation]}>{this.props.cocktail.graduation} º</Text>
                            </View>
                            {/* Type */}
                                <Text style={globalStyles.text}>{this.props.cocktail.type}</Text>
                            {/* Price at home */}
                            <View style={[{flexDirection:'row', justifyContent:'space-between'}]}>
                                <Text style={globalStyles.text}>Precio en casa:</Text>
                                <Text style={globalStyles.text}>{this.props.cocktail.priceH} €</Text>
                            </View>
                            {/* Price at pubs */}
                            <View style={[{flexDirection:'row', justifyContent:'space-between'}]}>
                                <Text style={globalStyles.text}>Precio en bar:</Text>
                                <Text style={globalStyles.text}>{this.props.cocktail.priceB} €</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bottomView}>
                        {/* Vegan and vegetarian checkboxes */}
                        <View style={{flex:1}}>
                            {/* Vegetarian checkbox */}
                            <CheckBox onClick={() => {this.setState({});}}
                                isChecked={this.props.cocktail.vegetarian}
                                rightText={"Vegetariano"}
                                rightTextStyle={globalStyles.text}
                                checkBoxColor={"gray"}                        
                                checkedCheckBoxColor={colors.checkBoxChecked}
                                style={[globalStyles.CheckBox, globalStyles.checkboxLeft]}
                                />
                        </View>
                        <View style={{flex:1}}>
                            {/* Vegan checkbox */}
                            <CheckBox onClick={() => {this.setState({});}}
                                isChecked={this.props.cocktail.vegan}
                                rightText={"Vegano"}
                                rightTextStyle={globalStyles.text}
                                checkBoxColor={"gray"}                        
                                checkedCheckBoxColor={colors.checkBoxChecked}
                                style={[globalStyles.CheckBox, globalStyles.checkboxRight]}
                            />  
                        </View>
                    </View>
                    {/* Fragment that appears from above to show more information about coctels */}
                    <CoctelModal 
                        onRef={ref => (this.Option = ref)}
                        cocktail={this.props.cocktail}
                        visible={this.state.visible}
                        onCloseModal={this.toggleModal}/>
                </View>      
            </TouchableOpacity>  
        )
    }
    
}

export default CoctelLight;