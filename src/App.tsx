import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Grid } from './components/Grid';
import { AlignmentEnum } from './components/GridHeaderItem';

let gridHeader = [
  {
    name: "Name",
    id:"name",
    sortable: true,
    align: AlignmentEnum['center']
  },
  {
    name: "Name2",
    id:"name2",
    sortable: true,
    align: AlignmentEnum['center']
  },
  {
    name: "Age",
    id:"age",
    sortable: true
  },
  {
    name: "Age2",
    id:"age2",
    sortable: true
  }
];

const gridData: any = ([...Array(500)].map((_, i) => {
  return {
    name: "NamanNamanNamanNamanNamanNamanNamanNamanNamanNaman"+i,
    name2: "NamanNamanNamanNamanNamanNamanNamanNamanNamanNaman"+i,
    age: parseInt(((Math.random()*100)+1).toString()),
    age2: parseInt(((Math.random()*100)+1).toString())
  }
}))

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
