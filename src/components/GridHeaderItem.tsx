import React, { FC } from 'react';

export type HeaderItemType = {
    name: string,
    id: string,
  };

interface  GridHeaderItemProps {
    headerItem: HeaderItemType,
}

const GridHeaderItem: FC<GridHeaderItemProps> = ({headerItem}) => {
  return (
    <div className="header-item">
    {headerItem.name}
    </div>
  );
}

export default GridHeaderItem;