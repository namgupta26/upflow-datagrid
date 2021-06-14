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
    // stores the dataset and headers currently rendered
    const [gridData, setGridData] = useState(new Array())
    const [gridHeader, setGridHeaderData] = useState(gridHeaderData)
    const [sorting, setSorting] = useState({field: "", order: ""})

    //number of items to show in DOM per page
    const maxRowsPerFetch= 1000;
    //the index from end at which to load more items, so load more items when 300th item is visible
    const loadMoreIndexFromEnd= 100;

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
        
        
    }, [sorting])

    useEffect(()=>{
        setGridHeaderData(gridHeaderData)
    },[gridHeaderData])

    useEffect(()=>{
        
        setGridAllData(gridRowsData)
    },[gridRowsData])

    useEffect(()=>{
        if(gridAllData.length==0)
            setLoading(true)
        resetGridData()
    },[gridAllData])


    // add rows like its the first time
    const resetGridData = () => {
        addRows(true);
    }

    
    // reset and add rows, or only add subsequent rows
    const addRows = (reset: boolean = false) => {
        if(gridAllData.length!=0){
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
        loading ? <div className="loader-container" ><svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
        width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" >
       <path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
         s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
         c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
       <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
         C22.32,8.481,24.301,9.057,26.013,10.047z">
         <animateTransform attributeType="xml"
           attributeName="transform"
           type="rotate"
           from="0 20 20"
           to="360 20 20"
           dur="0.5s"
           repeatCount="indefinite"/>
         </path>
       </svg></div>:
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