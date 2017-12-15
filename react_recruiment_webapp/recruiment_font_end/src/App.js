import React, { Component } from 'react';
import './App.css';
import Routes from './routes/routes'
import { Provider } from 'react-redux'
import configStore from './store/store'
const store = configStore();
class App extends Component {

  render() {
    return (
        <div className="App">
            <Provider store={store}>
                <Routes></Routes>
            </Provider>
        </div>
    );
  }
}

export default App;
