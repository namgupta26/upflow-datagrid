import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Grid } from './components/Grid';

let gridHeader = [
  {
    name: "Name",
    id:"name"
  },
  {
    name: "Age",
    id:"age"
  },
];

let gridData = [
  {
    name: "Naman",
    age: 12
  },
  {
    age: 15,
  },
  {
    name: "Naman2",
    age: 11
  },
];

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Grid gridData={gridData} gridHeader={gridHeader}></Grid>
    </div>
  );
}

export default App;
