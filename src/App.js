import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Authentication from './components/Authentication/Authentication';
import Login from './components/Authentication/Login';
import Header from './components/Header/Header';
import { Component } from 'react';
import ViewStudent from './components/ViewStudent/ViewStudent';
import AddStudent from './components/AddStudent/AddStudent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Router>
          <Routes>
            <Route exact path="/" element={<Authentication />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/view-student" element={<ViewStudent />} />
            <Route exact path="/add-student" element={<AddStudent />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
