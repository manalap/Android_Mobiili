/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  StatusBar,
  View,
  Image,
  TouchableHighlight
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';


class MovieListItem extends React.Component {
  render() {
    let IMAGEPATH = 'http://image.tmdb.org/t/p/w500'
    let imageurl = IMAGEPATH + this.props.movie.poster_path;
    return (
      <View style={styles.movieItem}>
        <View style={styles.movieItemImage}>
          <Image source={{uri: imageurl}} style={{width: 99, height: 146}} />
        </View>
        <View style={{marginRight: 50}}>
          <Text style={styles.movieItemTitle}>{this.props.movie.title}</Text>
          <Text style={styles.movieItemText}>{this.props.movie.release_date}</Text>
          <Text numberOfLines={6} ellipsizeMode="tail" style={styles.movieItemText}>{this.props.movie.overview}</Text>
        </View> 
      </View>
    )
  
  }
}


class MoviesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { movies: null};
  }

  itemPressed = (index) => {
    this.props.navigation.navigate('MovieDetails');
  }
  componentDidMount(){
    this.getMovies();
  }

  async getMovies() {
    let APIKEY = 'a108a2c1cbd18482dae5b4cdba2dc3ad';
    let BASEURL = 'https://api.themoviedb.org/3/movie/now_playing';
    let url = BASEURL+'?api_key='+APIKEY;
    let response = await fetch(url);
    let data = await response.json();
    this.setState( {movies: data.results} );
    // check console - a movie data should be visible there
    //console.log(data.results);
  }

  
  render() {
   
    if (this.state.movies == null){
     return (
        <View style={{flex: 1, padding: 20}}>
          <Text>Loading, please wait...</Text>
        </View>
      )
    }
    var items = this.state.movies.map(function(movie,index){
      return(
        <TouchableHighlight onPress={_ => this.itemPressed(index)} 
        underlayColor="lightgray" key={index}>
        <MovieListItem movie={movie} key={index}/>
      
        </TouchableHighlight>
      )
    }.bind(this));
    return (
      <ScrollView>
        {items}
      </ScrollView>
    );
    
  }
}




const MovieListScreen: () => React$Node = ({navigation}) => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <MoviesList />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  movieItem: {
    margin: 5,
    flex: 1,
    flexDirection: 'row'
  },
  movieItemImage: {
    marginRight: 5
  },
  movieItemTitle: {
    fontWeight: 'bold',
  },
  movieItemText: {
    flexWrap: 'wrap'
  },
  
});

export default MovieListScreen;
