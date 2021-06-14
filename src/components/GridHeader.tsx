import React, { useState } from 'react';
import GridHeaderItem, { HeaderItemType, HeaderSortStatusType, SortOrderENum } from './GridHeaderItem';

const GridHeader = ({headerRowData, onSorting, rowStyle}: {headerRowData: Array<HeaderItemType>, onSorting: any, rowStyle: object}) =>  {

  const [sortingField, setSortingField] = useState("")
  const [sortingOrder, setSortingOrder] = useState(SortOrderENum["asc"])
  
  const handleSortTrigger = (field: string) => {
    const order = 
      field === sortingField && sortingOrder ===  SortOrderENum["asc"] ? SortOrderENum["desc"] : SortOrderENum["asc"];
    setSortingField(field)
    setSortingOrder(order)
    onSorting(field,order)
  }
   

  return (
    <div className="header row p-2" style={rowStyle}>
        { 
           headerRowData.map( (header: HeaderItemType) => { 
            
            let sortStatus: HeaderSortStatusType = {active: false, order: SortOrderENum["none"]}
            if(header.id === sortingField){
              sortStatus.active = true; 
              sortStatus.order = sortingOrder as SortOrderENum;
            }


            return (
            <GridHeaderItem 
                key={header.id}
                headerItem={header}
                onSortTrigger={handleSortTrigger}
                sortStatus={sortStatus}
                > 
            </GridHeaderItem>
            
            )
          })
        }
        
     <div className="header-item">Options</div>
    </div>
  );
}

export default GridHeader

