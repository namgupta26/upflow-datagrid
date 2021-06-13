
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import React, { FC } from 'react';

library.add(faArrowDown, faArrowUp)

export type HeaderItemType = {
    name: string,
    id: string, 
    sortable?: boolean
  };

export enum SortOrderENum {
  "asc",
  "desc",
  "none"
}

export type HeaderSortStatusType = {
    active: boolean,
    order: SortOrderENum
};

interface  GridHeaderItemProps {
    headerItem: HeaderItemType,
    sortStatus: HeaderSortStatusType
    onSortTrigger: any,
}

const GridHeaderItem: FC<GridHeaderItemProps> = ({headerItem, sortStatus, onSortTrigger}) => {

  
  return (
    <div className="header-item" onClick={() => 
      headerItem.sortable? onSortTrigger(headerItem.id): null
    }>
      {headerItem.name}
      <span>{sortStatus.active && (
        <FontAwesomeIcon icon={
          sortStatus.order === SortOrderENum["asc"] ? "arrow-down": "arrow-up"
        }/>
      )}</span>
  
    </div>
  )
}

export default GridHeaderItem;

