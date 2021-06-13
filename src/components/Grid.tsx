import React, { useCallback, useEffect, useRef, useState } from 'react';
import GridHeader from './GridHeader';
import { HeaderItemType } from './GridHeaderItem';
import GridRow from './GridRow';

const GridHeaderContext = React.createContext(new Array<HeaderItemType>());

const Grid = ({gridRowsData, gridHeaderData}: {gridRowsData: Array<object>, gridHeaderData: Array<HeaderItemType>}) =>  {  
    
    // const gridContainer = useRef();
    
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(true);
    //stores the entire data set
    const [gridAllData, setGridAllData] = useState(gridRowsData)
    // stores the dataset currently rendered
    const [gridData, setGridData] = useState(new Array())
    const [gridHeader, setGridHeaderData] = useState(gridHeaderData)
    const [sorting, setSorting] = useState({field: "", order: ""})

    //number of items to show in DOM
    const maxRowsPerFetch= 100;
    //the index from end at which to load more items, so load more items when 300th item is visible
    const loadMoreIndexFromEnd= 30;

    // intersection observer to load more data on scroll
    const observer = useRef<any>();
    const loadNextRowRef = useCallback(node => {
        if (loading) return
        if (observer.current) 
            observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasNextPage) {
                addRows()
            }
        })
        if (node) observer.current.observe(node)
    },[loading,gridAllData,pageNumber,hasNextPage])
    
    
    // whenever sorting state changes 
    useEffect(()=>{
        if(sorting.field){
            const reversed = sorting.order == "0" ? 1 : -1;
            const sortedGridData =  gridAllData.sort(
                (a:any,b:any) =>
                    reversed * (a[sorting.field]>(b[sorting.field])?1:-1)
            );
            setGridAllData(sortedGridData);
            resetGridData();
        }
        else{
            addRows();
        }
        
    }, [sorting])


    // add rows like its the first time
    const resetGridData = () => {
        addRows(true);
    }

    
    // reset and add rows, or only add subsequent rows
    const addRows = (reset: boolean = false) => {
        
        setLoading(true)
        var newRows = new Array()
        if(reset){
            newRows = getNextFewRows(0,maxRowsPerFetch);
            setGridData([...newRows])
            setPageNumber(st=> 1);
        }
        else{
            newRows = getNextFewRows(pageNumber,maxRowsPerFetch);
            setGridData( gridData => {
                return (gridData.concat([...newRows]))
            })
            setPageNumber(st=> st+1);
        }
        
        if(gridData.length >= gridRowsData.length)
            setHasNextPage(false);
        else
            setHasNextPage(true);
        setLoading(false)
    }

    // get next few rows to add to mainGrid based on params
    const getNextFewRows = (pageNo:number, maxRowPer:number) => {
        const newRows = gridAllData.slice(pageNo*maxRowPer,(pageNo*maxRowPer)+maxRowPer)
        return newRows;
    }


    const handleOnDelete = (rowId:number) => {
        console.log(rowId)
        
        let temp = [...gridData]
        temp.splice(rowId, 1)
        setGridData(temp)
        temp = [...gridAllData]
        temp.splice(rowId, 1)
        setGridAllData(temp)
    }

    // workaround - calculates Column Width based on first 100 items
    const calculateColumnWidths = () => {
        let avgLength:any = {}
        let currentRows = gridRowsData.slice(0,100)
        currentRows.forEach((row: any, index: number) => {
            gridHeaderData.forEach((header: any) => {
                if(index == 0)
                    avgLength[header.id] = 0;
                avgLength[header.id] += parseInt(row[header.id].toString().length)
            });
        });
        let columnFr = ""
        gridHeaderData.forEach((header: any) => {
            columnFr += "minMax(100px,"+Math.floor(Math.sqrt(avgLength[header.id]/currentRows.length)) + "fr) ";
        });

        columnFr += " minMax(100px, 1fr)"
        return {gridTemplateColumns: columnFr}
        
    }

    
    return (
    <div className="grid-container" >
        <GridHeader 
            headerRowData={gridHeader} 
            onSorting={ (field: string, order: string) =>  
                setSorting({field, order})
            }            
            rowStyle={calculateColumnWidths()}
        />
        <GridHeaderContext.Provider value={gridHeader}>
            { 
                gridData.map((rowData: any, index: number) => {
                    if(index + 1 === gridData.length - loadMoreIndexFromEnd){
                        return <GridRow 
                        nextPageRef={loadNextRowRef} 
                        key={rowData.name} 
                        id={index} 
                        rowData={rowData}
                        rowStyle={calculateColumnWidths()}
                        onTriggerDelete = {handleOnDelete}
                        ></GridRow>
                    }
                    else{
                        return <GridRow 
                        key={rowData.name} 
                        id={index} 
                        rowData={rowData}
                        rowStyle={calculateColumnWidths()}
                        onTriggerDelete = {handleOnDelete}
                        ></GridRow>
                    }
                })
            }
        </GridHeaderContext.Provider>
    </div>
  );
}

export  { Grid, GridHeaderContext }