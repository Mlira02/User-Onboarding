import React from 'react';
import UserForm from './UserForm';
import './App.css';


class App extends React.Component {

  render() {
    return ( 
      <div className="App">
        <h1>Please Fill out your User Form below</h1>
        <UserForm />
      </div>
     );
  }
}
 
export default App;