import React, { Component } from 'react';
import { 
    Modal, 
    View, 
    Text, 
    Image,
    TouchableOpacity
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CheckBox from 'react-native-check-box';
import globalStyles from '../../constants/globalStyles';
import styles from './styles'

import * as colors from '../../constants/colors'

//Fragment that shows from above to show information about coctels, and also used in "Random Drink" game

export default class CoctelModal extends Component {
constructor(props){
    super(props)
    this.state={
        img: null,
    }
}

componentDidMount() {
    this.props.onRef(this);    
}

componentDidUpdate(prevProps) {
    //Change image if coctel changes
    if (prevProps.cocktail.image !== this.props.cocktail.image) {
        this.setState({img:this.props.cocktail.image})
    }
  }

componentWillUnmount() {
    this.props.onRef(undefined)
}

UNSAFE_componentWillMount(){
    this.setState({img:this.props.cocktail.image})
}

  render() {
    const { onCloseModal } = this.props;
    return (
        <Modal
            visible={this.props.visible}
            onRequestClose={onCloseModal}
            transparent={true}
            animationType="slide"
        >
            {/* Top view, transparent, to close modal onPress */}
            <View style={globalStyles.modalTopContainer}>
                <TouchableOpacity onPress={onCloseModal} style={{height:"100%", width:"100%"}}>
                </TouchableOpacity>
            </View>
            <View style={globalStyles.modalContainer}>                
                {/* Close button */}
                <View style={[globalStyles.rowView, {justifyContent: 'flex-end',}]}>
                    <TouchableOpacity style={globalStyles.closeButton} onPress={onCloseModal}>                    
                        <Text style={[globalStyles.text, globalStyles.closeButtonText]}>Cerrar</Text>
                    </TouchableOpacity>                    
                </View>
                {/* Add a bar at the top, as a separator */}
                <View style={styles.topBarView}>                
                {/* Graduation, Title,  Type*/}
                <View style={[globalStyles.rowView, styles.topView]}>
                    <Text style={[globalStyles.text, styles.leftText]}>{this.props.cocktail.graduation} º</Text>
                    <Text style={[globalStyles.title]}>{this.props.cocktail.name}</Text>
                    <Text style={[globalStyles.text, styles.rightText]}>{this.props.cocktail.type}</Text>
                </View>
                {/* Separator */}
                <View style={globalStyles.barView}></View>
                </View>
                <ScrollView>
                    {/* Image */}
                    <View style={[styles.middleView, globalStyles.rowView]}>
                        {/* Cardview to round images borders */}
                        <View style={styles.imageCard}>
                            <Image  style={styles.image} source={this.state.img}/>
                        </View>
                        {/* Price at home, at pubs, vegetarian and vegan */}
                        <View style={styles.rightInfoView}>
                            <Text style={[globalStyles.text, styles.topCheckbox]}>Precio</Text>
                            <View style={[globalStyles.rowView, styles.textView]}>
                                <Text style={[globalStyles.text, styles.priceText]}>en casa:</Text>
                                <Text style={globalStyles.text}>{this.props.cocktail.priceH} €</Text>
                            </View>
                            <View style={[globalStyles.rowView, styles.textView]}>
                                <Text style={[globalStyles.text, styles.priceText]}>en los bares:</Text>
                                <Text style={globalStyles.text}>{this.props.cocktail.priceB} €</Text>
                            </View>
                            {/* Vegetarian and vegan checkboxes */}
                            <CheckBox
                                style={[globalStyles.CheckBox, styles.topCheckbox]}
                                onClick={() => {this.setState({});}}
                                isChecked={this.props.cocktail.vegetarian}
                                rightText={"Vegetariano"}
                                rightTextStyle={globalStyles.text}    
                                checkBoxColor={"gray"}                        
                                checkedCheckBoxColor={colors.checkBoxChecked}/>
                            <CheckBox
                                style={[globalStyles.CheckBox]}
                                onClick={() => {this.setState({});}}
                                isChecked={this.props.cocktail.vegan}
                                rightText={"Vegano"}
                                rightTextStyle={globalStyles.text}    
                                checkBoxColor={"gray"}                        
                                checkedCheckBoxColor={colors.checkBoxChecked}/>
                        </View>
                    </View>
                    {/* Description and making text */}
                    <View style={styles.bottomView}>
                        {/* Separator */}
                        <View style={globalStyles.barView}></View>
                            {/* Description */}
                            <Text style={[globalStyles.text, styles.italicText]}>Descripción:</Text>
                            <Text style={[globalStyles.text, styles.longText]}>{this.props.cocktail.description}</Text>
                        {/* Separator */}
                        <View style={globalStyles.barView}></View>
                            {/* Making */}
                        <Text style={[globalStyles.text, styles.italicText]}>Elaboración:</Text>
                            <Text style={[globalStyles.text, styles.longText]}>{this.props.cocktail.making}</Text>                    
                    </View>

                </ScrollView>
            </View>
      </Modal>
    );
  }
}
