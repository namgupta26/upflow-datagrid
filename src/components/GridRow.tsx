import React, { useContext } from 'react';
import { GridHeaderContext } from './Grid';
import { HeaderItemType } from './GridHeaderItem';
import GridRowItem, { RowItemType } from './GridRowItem';

const GridRow = ({rowData, nextPageRef}: {rowData: any, nextPageRef?: any}) =>  {

    const headerRowData: Array<HeaderItemType> = useContext(GridHeaderContext)

    //generates RowItems based on sequence of cell based in table's header.
    const generateRowEntries = () =>{
        const jsx: Array<any> = Array(headerRowData.length).fill(undefined)
        
        //generates all cells which were part of header, based on sequence
        headerRowData.forEach((headerItem: HeaderItemType, index: number) => {   
            if(rowData[headerItem.id]){
                let rowItemWithData: any = {data: rowData[headerItem.id]};
                jsx[index] = (<GridRowItem key={rowData[headerItem.id]} rowItem={rowItemWithData}></GridRowItem>)    
            }
        });

        //sets remaining columns as blank
        jsx.forEach((element, index) => {
            let emptyRowItem: RowItemType = {data: ""};
            if(element===undefined)
                jsx[index] = (<GridRowItem key={"c"+index} rowItem={emptyRowItem}></GridRowItem>)    
        });

        return jsx;
    }

    
    return (
        <div className="row p-2" ref={nextPageRef}>
        { generateRowEntries() }
        </div>
    );
}

export default React.memo(GridRow)
 