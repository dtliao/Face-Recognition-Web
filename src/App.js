import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';

const particlesChoices = {
   particles: {
    number: {
      value: 20,
      density:{
        enable: true,
        value_area: 800
      }
    }
  }
}
const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0, 
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }
  
  loadUser = (data) => {
    this.setState({user: {
      id: data.id, 
      name: data.name, 
      email: data.email, 
      entries: data.entries, 
      joined: data.joined
    }})
  }
  
  displayFaceBox = (data) => { 
    const regions = data.outputs[0].data.regions;
    const boxes = regions.map(region => {
      const clarifaiFace = region.region_info.bounding_box;
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height, 
        rightCol: width - (clarifaiFace.right_col * width), 
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
    })
    this.setState({boxes: boxes});
  }


  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onPictureSubmit = () => {
    this.setState({imageUrl: this.state.input});
      fetch('https://radiant-river-39942.herokuapp.com/imageUrl', {
        method: 'post', 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({
          input: this.state.input
        })   
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://radiant-river-39942.herokuapp.com/image', {
            method: 'put', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({
              id: this.state.user.id
            })   
          })
          .then(response => response.json())
          .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
          })
          .catch(console.log)
        }
        this.displayFaceBox(response);
      })
      .catch(console.log);
  }
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
      this.setState ({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route:route});
  }
  
  render() {
    const { user, isSignedIn, imageUrl, route, boxes } = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesChoices}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { route === 'home'
            ? <div>
                <Logo />
                <Rank name={user.name} entries={user.entries}/>
                <ImageLinkForm onInputChange={this.onInputChange} onPictureSubmit={this.onPictureSubmit} />
                <FaceRecognition boxes={boxes} imageUrl={imageUrl}/>
              </div>
            :(
                route === 'signin'
               ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
               : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              )
        }
      </div>
    );
  }
}

export default App;



