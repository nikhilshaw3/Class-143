import React,{Component} from "react";
import {View,Text,StyleSheet,Image,TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Header,AirbnbRating,Icon} from 'react-native-elements';
import axios from 'axios';

export default class Home extends React.Component{
constructor(){
super()
this.state = {
    movie_details : {}
}
}

componentDidMount(){
this.get_movie()
}

get_movie=()=>{
const url = "http://localhost:5000/get-movie"
axios
.get(url)
.then(response=>{
    let details = response.data.data
    details["duration"] = this.timeConvert(details.duration)
    this.setState({
        movie_details:details
    })
})
.catch(error=>{
    console.log(error.message)
})
}

timeConvert(num){
var hours = Math.float(num/60)
var minutes = num%60
return `${hours} hrs ${minutes} mins`;
}

liked_movie=()=>{
const url = "http://localhost:5000/liked-movie"
axios
.post(url)
.then(response=>{
    this.get_movie()
})
.catch(error=>{
    console.log(error.message)
})
}

unliked_movie=()=>{
const url = "http://localhost:5000/unliked-movie"
axios
.post(url)
.then(response=>{
    this.get_movie()
})
.catch(error=>{
    console.log(error.message)
})
}

not_watched_movie=()=>{
const url = "http://localhost:5000/not-watched-movie"
axios
.post(url)
.then(response=>{
    this.get_movie()
})
.catch(error=>{
    console.log(error.message)
})
}

render(){
const {movie_details} = this.state

if(movie_details.poster_link){
const {
    poster_link,
    title,
    release_data,
    duration,
    overview,
    rating
} = movie_details
.
return(
<View style = {styles.container}>
<View style = {styles.headerContainer}>
    <Header 
    centerComponent = {{text:"Movie Recommended" , style:styles.headerTitle}}
    rightComponent = {{icon:"search" , color:"#fff"}}
    backgroundColor = {'#d500f9'}
    containerStyle = {{flex:1}}
    />
</View>
<View style = {styles.subContainer}>
<View style = {styles.subTopContainer}>
    <Image style = {styles.posterImage}
    source = {{uri: poster_link}}
    />
</View>
<View style = {styles.subBottomContainer}>
<View style = {styles.upperBottomContainer}>
    <Text style = {styles.title}>{title}</Text>
    <Text style = {styles.subtitle}>{`${release_data.split("-")[0]}|${duration}`}</Text>
</View>
<View style = {styles.middleBottomContainer}>
<View style = {{flex:0.3}}>
    <AirbnbRating
    count = {10}
    reviews = {["","","",""]}
    defaultRating = {rating}
    isDisabled = {true}
    size = {RFValue(25)}
    starContainerStyle = {{marginTop:-30}}
    />
</View>
<View style = {{flex:0.7 , padding:15}}>
    <Text style = {styles.overview}>{overview}</Text>
</View>
</View>
<View style = {styles.lowerBottomContainer}>
<View style = {styles.iconButtonContainer}>
<TouchableOpacity onPress={this.liked_movie}>
    <Icon
    reverse
    name = {"check"}
    type = {"entypo"}
    size = {RFValue(30)}
    color = {"#76ff03"}
    />
</TouchableOpacity>

<TouchableOpacity onPress={this.unliked_movie}>
    <Icon
    reverse
    name = {"cross"}
    type = {"entypo"}
    size = {RFValue(30)}
    color = {"#ff1744"}
    />
</TouchableOpacity>

</View>
<View style = {styles.buttonCotainer}>

<TouchableOpacity style = {styles.button} onPress={this.not_watched_movie}>
<Text style = {styles.buttonText}>Did not Watch</Text>
</TouchableOpacity>

</View>
</View>
</View>
</View>
</View>
)
}

return null;

}
}

const styles = StyleSheet.create({ 
    
    container: { flex: 1 }, 
    headerContainer: { flex: 0.1 }, 
    headerTitle: { color: "#fff", fontWeight: "bold", fontSize: RFValue(18) }, 
    subContainer: { flex: 0.9 }, 
    subTopContainer: { flex: 0.4, justifyContent: "center", alignItems: "center" }, 
    posterImage: { width: "60%", height: "90%", resizeMode: "stretch", borderRadius: RFValue(30), marginHorizontal: RFValue(10) }, 
    subBottomContainer: { flex: 0.6 }, 
    upperBottomContainer: { flex: 0.2, alignItems: "center" },
    title: { fontSize: RFValue(20), fontWeight: "bold", textAlign: "center" }, 
    subtitle: { fontSize: RFValue(14), fontWeight: "300" }, 
    middleBottomContainer: { flex: 0.35 }, 
    overview: { fontSize: RFValue(13), textAlign: "center", fontWeight: "300", color: "gray" }, 
    lowerBottomContainer: { flex: 0.45 }, 
    iconButtonContainer: { flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }, 
    buttonCotainer: { justifyContent: "center", alignItems: "center" }, 
    button: { width: RFValue(160), height: RFValue(50), borderRadius: RFValue(20), justifyContent: "center", alignItems: "center", borderWidth: 1, marginTop: RFValue(15) }, 
    buttonText: { fontSize: RFValue(15), fontWeight: "bold" } });