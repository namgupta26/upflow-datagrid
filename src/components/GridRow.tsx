import { library } from '@fortawesome/fontawesome-svg-core';
import React, { useContext } from 'react';
import { GridHeaderContext } from './Grid';
import { HeaderItemType } from './GridHeaderItem';
import GridRowItem, { RowItemType } from './GridRowItem';




const GridRow = ({rowData, id, nextPageRef, rowStyle, onTriggerDelete}: {rowData: any, id: number, nextPageRef?: any, rowStyle: object, onTriggerDelete: any}) =>  {

    const headerRowData: Array<HeaderItemType> = useContext(GridHeaderContext)

    //generates RowItems based on sequence of cell based in table's header.
    const generateRowEntries = () =>{
        const jsx: Array<any> = Array(headerRowData.length).fill(undefined)
        
        //generates all cells which were part of header, based on sequence
        headerRowData.forEach((headerItem: HeaderItemType, index: number) => {   
            if(rowData[headerItem.id]){
                let rowItemWithData: any = {data: rowData[headerItem.id]};
                jsx[index] = (<GridRowItem key={index} rowItem={rowItemWithData} align={headerItem.align}></GridRowItem>)    
            }
            else{
                let emptyRowItem: RowItemType = {data: ""};
                jsx[index] = (<GridRowItem key={"c"+index} rowItem={emptyRowItem}></GridRowItem>)
            }
        });

        return jsx;
    }
    
    return (
        <div className="row p-2" ref={nextPageRef}  style={rowStyle}>
        { generateRowEntries() }
        <div className="row-item text-center">
            <span onClick={() => onTriggerDelete(id)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 9H16V19H8V9ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5Z" fill="#F68217"/>
                </svg>
            </span>
        </div>
        </div>
    );
}

export default React.memo(GridRow)
 