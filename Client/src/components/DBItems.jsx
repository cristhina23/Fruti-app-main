import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Tooltip } from '@mui/material';
import { deleteAProducts, getAllProducts as fetchProducts } from '../api';
import { setAllProducts } from '../context/actions/productActions';
import { alertNull, alertSuccess } from '../context/actions/alertActions';

const DBItems = () => {
  const products = useSelector((state) => state.products || []);
  const dispatch = useDispatch();

  // ✅ Cargar los productos al inicio
  useEffect(() => {
    fetchProducts().then((data) => {
      if (data) dispatch(setAllProducts(data));
    });
  }, [dispatch]);

  const handleEdit = (rowData) => {
    console.log('Editar producto:', rowData);
    // Aquí podrías abrir un modal o redirigir a otra ruta para editar
  };

  const handleDelete = (rowData) => {
    if (window.confirm('¿Seguro que quieres eliminar este producto?')) {
      deleteAProducts(rowData.productId).then((res) => {
        dispatch(alertSuccess('Producto eliminado exitosamente'));
        setTimeout(() => dispatch(alertNull()), 3000);
        // ✅ Actualizar lista después de borrar
        fetchProducts().then((data) => {
          if (data) dispatch(setAllProducts(data));
        });
      });
    }
  };

  const actionColumn = {
    id: 'actions',
    header: 'Acciones',
    enableColumnActions: false,
    enableSorting: false,
    size: 100,
    Cell: ({ row }) => (
      <div className="flex gap-2">
        <Tooltip title="Editar">
          <IconButton
            onClick={() => handleEdit(row.original)}
            sx={{ color: '#555', '&:hover': { color: '#1976d2' } }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Eliminar">
          <IconButton
            onClick={() => handleDelete(row.original)}
            sx={{ color: '#555', '&:hover': { color: 'red' } }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </div>
    ),
  };

  const columns = [
    actionColumn,
    {
      accessorKey: 'product_image',
      header: 'Imagen',
      Cell: ({ cell }) => (
        <img
          src={cell.getValue()}
          alt="item"
          className="w-32 h-16 object-contain rounded-md"
        />
      ),
    },
    {
      accessorKey: 'product_name',
      header: 'Nombre',
    },
    {
      accessorKey: 'product_category',
      header: 'Categoría',
    },
    {
      accessorKey: 'product_price',
      header: 'Precio',
      Cell: ({ cell }) => (
        <p className="text-xl font-semibold text-textColor flex items-center gap-2">
          <span className="text-red-400">$</span>
          {parseFloat(cell.getValue() || 0).toFixed(2)}
        </p>
      ),
    },
  ];

  const table = useMaterialReactTable({
    columns,
    data: products,
    renderTopToolbarCustomActions: () => (
      <div className="px-4 py-2 text-lg font-semibold">Lista de Productos</div>
    ),
  });

  return (
    <div className="flex items-center justify-center gap-2 pt-6 w-full">
      {products.length > 0 ? (
        <ThemeProvider theme={createTheme()}>
          <MaterialReactTable table={table} />
        </ThemeProvider>
      ) : (
        <div className="text-center text-gray-500 text-lg py-12">
          No hay productos para mostrar 🥺
        </div>
      )}
    </div>
  );
};

export default DBItems;
