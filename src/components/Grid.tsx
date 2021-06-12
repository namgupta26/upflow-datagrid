import React, { useCallback, useEffect, useRef, useState } from 'react';
import GridHeader from './GridHeader';
import { HeaderItemType } from './GridHeaderItem';
import GridRow from './GridRow';

const GridHeaderContext = React.createContext(new Array<HeaderItemType>());

const Grid = ({gridRowsData, gridHeaderData}: {gridRowsData: Array<object>, gridHeaderData: Array<HeaderItemType>}) =>  {  
    
    
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [gridData, setGridData] = useState(new Array())
    const [gridHeader, setGridHeaderData] = useState(gridHeaderData)

    //number of items to show in DOM
    const maxRowsPerFetch= 1000;
    //the index from end at which to load more items, so load more items when 300th item is visible
    const loadMoreIndexFromEnd= 30;

    const observer = useRef<any>();
    const loadNextRowRef = useCallback(node => {
        if (loading) return
        if (observer.current) 
            observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {

        if (entries[0].isIntersecting && hasNextPage) {
            console.log("HERE")
            addNextFewRows()
        }
        })
        if (node) observer.current.observe(node)
    },[loading,hasNextPage])
    
    
    useEffect(()=>{
        addNextFewRows();
    }, [])


    const addNextFewRows = () => {
        setLoading(true)
        const newRows = getNextFewRows();
        console.log(newRows)
        setGridData( gridData => {
            return (gridData.concat([...newRows]))
        })
        setPageNumber(pageNumber+1);
        if(gridData.length >= gridRowsData.length)
            setHasNextPage(false);

        setLoading(false)
    }

    const getNextFewRows = () => {
        const newRows = gridRowsData.slice(pageNumber*maxRowsPerFetch,(pageNumber*maxRowsPerFetch)+maxRowsPerFetch)
        return newRows;
    }
    
    return (
    <div className="grid-container">
    <GridHeader headerRowData={gridHeader}></GridHeader>
    <GridHeaderContext.Provider value={gridHeader}>
        { 
            gridData.map((rowData: any, index: number) => {
                if(index + 1 === gridData.length - loadMoreIndexFromEnd){
                    return <GridRow nextPageRef={loadNextRowRef} key={rowData.name} rowData={rowData}></GridRow>
                }
                else
                    return <GridRow key={rowData.name} rowData={rowData}></GridRow>
            })
        }
    </GridHeaderContext.Provider>
    </div>
  );
}

export  { Grid, GridHeaderContext }