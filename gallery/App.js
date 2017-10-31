import React from 'react';
import { StyleSheet, 
        Text, 
        View, 
        AppRegistry, 
        Image,
        ScrollView,
      ActivityIndicator,
    Dimensions,
    TouchableHighlight,
    Modal,
    Alert,
    Button,
    ViewPagerAndroid,
   } from 'react-native';


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading:true,
      modalVisible: false,
      imageArray: [<Text>"Hello World"</Text>],
      biArray : [],
      currentModalElement: 0
    }
    this._onPressButton = this._onPressButton.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
   
  }
 
 

 componentDidMount() {

  let shotId  = [
    "3872570-Floating-buttons",
    "3905149-Timer-App-Prototype",
    "3905639-Dream-of-Amsterdam",
    "3906066-The-City-of-Cats",
    "160781-Olimp-006",
    "618406-Cassette",
    "2685421-Tmnt-manhole",
    "1508295-Captain-America",
    "998546-Gibson-Les-Paul",
    "2380018-Explorer-Club-Laguna",
    "465033-The-Batman",
    "3603170-Rains",
    "2603483-Batman-v-Superman-Man-of-Steel",
    "3608590-REI-4th-of-July",
    "1338582-Bold-As-Love",
    "1760599-Island",
    "2983146-Practice-3",
    "2314695-Haunted",
    "2400607-Console-Gaming",
    "2549267-Mystery-Project-76-1",
    ];
    let tempImageArray = []; 
    let tempBIArray = [];
    let sequenceArray = [];
      shotId.forEach(function(element) {
        return fetch('https://api.dribbble.com/v1/shots/'+element+'?access_token=343a27a5a71a4ed9d29030354cde2b630030eeba9b73a8785b100ceef966bbe5')
        .then((response) => response.json())
        .then((responseJson) => {
         
          this.setState({
            isLoading: false,
            dataSource: responseJson.images.normal,
          }, function() {
            sequenceArray.push(element);
            tempImageArray.push(<TouchableHighlight key = {sequenceArray.indexOf (element)}  onPress={()=>this._onPressButton(sequenceArray.indexOf (element))}  underlayColor="black">            
            <Image   source={{uri : this.state.dataSource}} style={styles.thumbnail}/>
            </TouchableHighlight>);

            tempBIArray.push(
            <View key = {sequenceArray.indexOf (element)} style={styles.pageStyle}>
               <ScrollView  minimumZoomScale  = {1} maximumZoomScale = {3} centerContent = {true}> 
              <Image   source={{uri : this.state.dataSource}} style={styles.bigImage}/>
              </ScrollView>
            </View>);

            this.setState({
                imageArray: tempImageArray,
                biArray: tempBIArray
            });
          });
        })
        .catch((error) => {
          console.error(error);
        });
      }, this);                
}
  


  _onPressButton (num)
  {
       this.setState({
         currentModalElement : num
       })
      this.setModalVisible(true);    
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  
  render() {

         
   if (this.state.isLoading) {
    return (
      <View style={{flex: 1, paddingTop: 20}}>
        <ActivityIndicator />
      </View>
    );
  }


  if(this.state.modalVisible)
  {
    return (


      <View style = {{flex : 1, backgroundColor: 'black'}} >
          <TouchableHighlight onPress={()=>this.setModalVisible(false)}> 
          <Image style = {{height: 40,width:40, marginTop:20}} source = {require('./assets/Images/cross.png')}/>
          </TouchableHighlight>
          <ViewPagerAndroid
          style={styles.viewPager}
          initialPage={this.state.currentModalElement}>
          
          {this.state.biArray}
          
        </ViewPagerAndroid>
        </View>
    );
  }
    
    return (      

      
      <ScrollView style = {styles.scoller}>
           
      <View style={styles.container}>         
      
       {this.state.imageArray}

     </View>
      </ScrollView>
      
     
    );

   
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 2,
    marginTop: 30,

  },
  scoller:{
    flex:1,
    backgroundColor: 'steelblue',
    
  },
  thumbnail: {
    height: 170,
    margin:2,
    width : Dimensions.get('window').width/2 - 6,
    justifyContent: 'center',
    alignItems: 'center'

  },
  heading:{
   margin:20,
   justifyContent: 'center',
   alignItems: 'center',
   fontSize:40,
  },     

  mod:{
    marginTop: 22
  },

  bigImage:{
    width : Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.6,
  },
  pageStyle: {
    
    padding: 20,  
  },
  viewPager:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  }

  

});
