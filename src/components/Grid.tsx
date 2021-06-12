import React from 'react';
import GridHeader from './GridHeader';
import { HeaderItemType } from './GridHeaderItem';
import GridRow from './GridRow';

const GridHeaderContext = React.createContext(new Array<HeaderItemType>());

const Grid = ({gridData, gridHeader}: {gridData: Array<object>, gridHeader: Array<any>}) =>  {  
    
    return (
    <div className="grid-container">
    <GridHeader headerRowData={gridHeader}></GridHeader>
    <GridHeaderContext.Provider value={gridHeader}>
        { 
            gridData.map((rowData: any) => {
                return <GridRow key={rowData.name} rowData={rowData}></GridRow>
            })
        }
    </GridHeaderContext.Provider>
    </div>
  );
}

export  { Grid, GridHeaderContext }