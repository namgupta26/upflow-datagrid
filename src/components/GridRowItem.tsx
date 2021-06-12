import React, { FC } from 'react';

export type RowItemType = {
  data: any,
};

interface  RowItemProps {
  rowItem: RowItemType,
}


const GridRowItem : FC<RowItemProps> = ({rowItem}) => {
  return (
    <div className="row-item">
    {rowItem.data}
    </div>
  );
}

export default GridRowItem;