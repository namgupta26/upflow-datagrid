import React from 'react';
import GridHeaderItem, { HeaderItemType } from './GridHeaderItem';

const GridHeader = ({headerRowData}: {headerRowData: Array<HeaderItemType>}) =>  {
  return (
    <div className="header row p-2">
        { 
           headerRowData.map( (header: HeaderItemType) => (
            <GridHeaderItem 
                key={header.id}
                headerItem={header}> 
            </GridHeaderItem>
          ))
        }
    </div>
  );
}

export default GridHeader
 