import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { Grid } from './components/Grid';
import { AlignmentEnum } from './components/GridHeaderItem';

const API_URL = "http://localhost:4000/"

const App = () => {

  const [gridData, setGridData] = useState(new Array())
  const [gridHeaderData, setHeaderData] = useState(new Array())

  useEffect(()=>{
    loadData();
  },[])
  
  const loadData = async () => {
    const response = await fetch(API_URL);
    let data = await response.json();
    console.log(data);
    setGridData(data);
    setHeaderData(autoGenerateHeader(data[0]))
  }

  const autoGenerateHeader = (rowItem: any) => {
    const headerAr = [];
    for(let prop in rowItem){
      let headerItem = {
        name: prop[0].toUpperCase() + prop.slice(1),
        id:prop,
        sortable: true,
        align: AlignmentEnum['center']
      };
      headerAr.push(headerItem)
    }
    return headerAr;
  }

  
  return (
    <div className="App">
      
      <Grid gridRowsData={gridData} gridHeaderData={gridHeaderData}></Grid>
    </div>
  );
}

export default App;
