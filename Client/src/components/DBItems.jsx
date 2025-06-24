import React from 'react';
import DataTable from './DataTable';

const DBItems = () => {
  const columns = [
    {
      accessorKey: 'image',
      header: 'image',
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'price',
      header: 'Price',
    },
  ];

  const data = [];

  return (
    <div className='flex items-center justify-self-center gap-2 pt-6 w-full'>
      <DataTable columns={columns} data={data} title="Fruits Table" />
    </div>
  );
};

export default DBItems;
