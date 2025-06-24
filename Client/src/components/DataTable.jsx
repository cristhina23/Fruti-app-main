import React from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import {
  ThemeProvider,
  createTheme,
  IconButton,
  Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; // ✅ Import correcto

const DataTable = ({ columns, data, title, onDelete }) => {
  const actionColumn = {
    accessorKey: 'actions',
    header: '',
    size: 40,
    enableSorting: false,
    enableColumnFilter: false,
    Cell: ({ row }) => ( // ✅ Aquí se define correctamente "row"
      <Tooltip title="Delete">
        <IconButton onClick={() => onDelete(row.original)} color="error">
          <DeleteIcon /> {/* ✅ Icono sí está definido */}
        </IconButton>
      </Tooltip>
    ),
  };

  const table = useMaterialReactTable({
    columns: [actionColumn, ...columns], // ✅ Agrega columna al inicio
    data,
    renderTopToolbarCustomActions: () => (
      <div className="px-4 py-2 text-lg font-semibold">{title}</div>
    ),
  });

  return (
    <ThemeProvider theme={createTheme()}>
      <MaterialReactTable table={table} />
    </ThemeProvider>
  );
};

export default DataTable;
