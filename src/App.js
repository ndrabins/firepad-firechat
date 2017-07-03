import React, { Component } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyB9gclsrvRm1NZMtF0QQfBCuL7eBH9FJms",
    authDomain: "firepad-firebase-demo.firebaseapp.com",
    databaseURL: "https://firepad-firebase-demo.firebaseio.com",
    projectId: "firepad-firebase-demo",
    storageBucket: "",
    messagingSenderId: "894365192921"
};

firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/Firepad">Firepad</Link></li>
              <li><Link to="/Firechat">Firechat</Link></li>
            </ul>

            <hr/>

            <Route exact path="/" component={Home}/>
            <Route path="/firepad" component={Firepad}/>
            <Route path="/firechat" component={Firechat}/>
          </div>
        </Router>
      </div>
    );
  }
}

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

class Firepad extends Component {
    componentDidMount() {
    // Get Firebase Database reference.
    let firepadRef = firebase.database().ref();

    // Create CodeMirror (with lineWrapping on).
    var codeMirror = CodeMirror(document.getElementById('firepad'), { lineWrapping: true });

    // Create Firepad (with rich text toolbar and shortcuts enabled).
    var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror,
        {richTextShortcuts: true, richTextToolbar: true, defaultText: "Let's get coding!"});
  }


  render() {
    return (
      <div id="firepad">
        firepad
      </div>
    );
  }
}

class Firechat extends Component {
  componentDidMount(){
    // Get a Firebase Database ref
    var chatRef = firebase.database().ref("chat");

    // Create a Firechat instance
    var chat = new FirechatUI(chatRef, document.getElementById("firechat-wrapper"));
  }

  render() {
    return (
      <div id="firechat-wrapper"></div>
    );
  }
}


export default App;
