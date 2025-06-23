import React from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const DataTable = ({ columns, data, title }) => {
  const defaultMaterialTheme = createTheme();

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowActions: true,
    renderRowActions: ({ row }) => (
      <button
        onClick={() => alert(`You saved ${row.original.name}`)}
        style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px', borderRadius: '5px' }}
      >
        Delete
      </button>
    ),
  });

  return (
    <div className="flex items-center justify-center gap-2 pt-6 w-full">
      <ThemeProvider theme={defaultMaterialTheme}>
        <MaterialReactTable table={table} />
      </ThemeProvider>
    </div>
  );
};

export default DataTable;
