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

const gridData = ([...Array(10000)].map((_, i) => {
  return {
    name: "Naman"+i,
    age: i
  }
}))

console.log(gridData)

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
      <Grid gridRowsData={gridData} gridHeaderData={gridHeader}></Grid>
    </div>
  );
}

export default App;
