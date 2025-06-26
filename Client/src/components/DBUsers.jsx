import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAllUserDetails } from '../context/actions/setAllUserActions';
import { createTheme, ThemeProvider } from '@mui/material';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { getAllUsers } from '../api';
import Avatar  from '../img/avatar.png';

const DBUsers = () => {
  const allUsers = useSelector(state => state.allUsers?.users);

  const users = allUsers || [];



  const dispatch = useDispatch();
  console.log("allUsers desde el store:", allUsers);

  useEffect(() => {
  if (users.length === 0) {
    getAllUsers().then((data) => {
      dispatch(setAllUserDetails(data));
    });
  }
}, [users, dispatch]);

  const handleEdit = (rowData) => {
      console.log('Editar producto:', rowData);
      // Aquí podrías abrir un modal o redirigir a otra ruta para editar
    };
  
    /** const handleDelete = (rowData) => {
      if (window.confirm('¿Seguro que quieres eliminar este producto?')) {
        deleteAProducts(rowData.productId).then((res) => {
          dispatch(alertSuccess('Producto eliminado exitosamente'));
          setTimeout(() => dispatch(alertNull()), 3000);
          // ✅ Actualizar lista después de borrar
          fetchProducts().then((data) => {
            if (data) dispatch(setAllUserDetails(data));
          });
        });
      }
    }; */
  
    /**
     * const actionColumn = {
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
     */
  
    const columns = [
      //actionColumn,
      {
        accessorKey: 'photoURL',
        header: 'Imagen',
        Cell: ({ cell }) => (
          <img
            src={cell.getValue() ? cell.getValue() : Avatar}
            alt="item"
            className="w-32 h-16 object-contain rounded-md"
          />
        ),
      },
      {
        accessorKey: 'Name',
        header: 'dispalyName',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'emailVerified',
        header: 'Verified',
        Cell: ({ cell }) => (
          <p className={`px-2 py-1 w-32 text-center text-primary rounded-md ${cell.isVerified ? 'bg-green-400' : 'bg-red-400'}`}>
            <span className="text-red-400">$</span>
            {cell.isVerified ? 'Verified' : 'Not Verified'}
          </p>
        ),
      },
    ];
  
    const table = useMaterialReactTable({
      columns,
      data: users,
      renderTopToolbarCustomActions: () => (
        <div className="px-4 py-2 text-lg font-semibold">List Of Users</div>
      ),
    });
  
    return (
      <div className="flex items-center justify-center gap-2 pt-6 w-full">
        {users?.length > 0 ? (
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

export default DBUsers