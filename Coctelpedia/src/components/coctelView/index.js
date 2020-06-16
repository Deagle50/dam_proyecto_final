import React from 'react'
import {Text, View, FlatList} from 'react-native'
import CoctelLight from '../coctelLight/'
import * as consts from '../../constants/constants'
import globalStyles from '../../constants/globalStyles'

//Android style RecyclerView, just a "flatlist" with coctels as data

class CoctelView extends React.Component{
    constructor(props){
        super(props)
        this.state=({
            coctelList:consts.coctels,
        })
        
    }
    componentDidMount() {
        this.props.onRef(this);    
    }
        
    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    componentDidUpdate(prevProps){
        if(this.props && prevProps && this.props!=prevProps)
        {   
            let copyCoctels=Object.assign(consts.coctels, {});


            if(this.props.order===consts.ordenar[0]){  
                copyCoctels=copyCoctels.sort();
            }//Default order, do nothing
            else if(this.props.order===consts.ordenar[1])
                copyCoctels=copyCoctels.sort((a, b)=>(a.name<b.name?-1:1))
            else if(this.props.order===consts.ordenar[2])
                copyCoctels=copyCoctels.sort((a, b)=>(a.name>b.name?-1:1))
            else if(this.props.order===consts.ordenar[3])
                copyCoctels=copyCoctels.sort((a, b)=>(a.priceH<b.priceH?-1:1))
            else if(this.props.order===consts.ordenar[4])
                copyCoctels=copyCoctels.sort((a, b)=>(a.priceH>b.priceH?-1:1))
            else if(this.props.order===consts.ordenar[5])
                copyCoctels=copyCoctels.sort((a, b)=>(a.priceB<b.priceB?-1:1))
            else if(this.props.order===consts.ordenar[6])
                copyCoctels=copyCoctels.sort((a, b)=>(a.priceB>b.priceB?-1:1))
            else if(this.props.order===consts.ordenar[7])
                copyCoctels=copyCoctels.sort((a, b)=>(a.type<b.type?-1:1))
            else if(this.props.order===consts.ordenar[8])
                copyCoctels=copyCoctels.sort((a, b)=>(a.type>b.type?-1:1))
            else if(this.props.order===consts.ordenar[9])
                copyCoctels=copyCoctels.sort((a, b)=>(a.graduation<b.graduation?-1:1))
            else if(this.props.order===consts.ordenar[10])
                copyCoctels=copyCoctels.sort((a, b)=>(a.graduation>b.graduation?-1:1))


            // //Show vegetarian/vegan depending on prop value
            if(this.props.vegan)
            {
                copyCoctels=copyCoctels.filter(c=>c.vegan);
                
            }else
            if(this.props.vegetarian)
            {
                copyCoctels=copyCoctels.filter(c=>c.vegetarian);
            }
            //Show coctels by coctel type
            if(this.props.type===consts.tipos[0])
            {

            }else
            for(let i=0;i<consts.tipos.length;i++)
            {
                if(this.props.type===consts.tipos[i])
                    copyCoctels=copyCoctels.filter(c=>c.type===consts.tipos[i])    
            }
            
           


            this.setState({coctelList:copyCoctels});
        }        
    }

    render(){
        return(
            //Coctel list
            <View style={{marginBottom:16}}>            
                <FlatList 
                    data={this.state.coctelList}
                    keyExtractor={c=>c.name}
                    renderItem={({item})=>(
                    <CoctelLight
                        cocktail={item}
                        onRef={ref=>(this.Option=ref)}/>
                    )}
                    ListEmptyComponent={
                        <Text style={globalStyles.centeredText}>No hay bebidas con esos filtros</Text>
                    }
                />         
            </View>
            
        )
    }
    
}

export default CoctelView;