import React, { FC } from 'react';
import { AlignmentEnum } from './GridHeaderItem';

export type RowItemType = {
  data: any,
};

interface  RowItemProps {
  rowItem: RowItemType,
  align?: AlignmentEnum,
}


const GridRowItem : FC<RowItemProps> = ({rowItem, align}) => {

  let alignClass = AlignmentEnum['left'];
  if (align) {
    alignClass += align as AlignmentEnum;
  }

  return (
    <div className={"row-item text-"+AlignmentEnum[alignClass]}>
    {rowItem.data}
    </div>
  );
}

export default GridRowItem;