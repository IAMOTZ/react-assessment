import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../../store/users/actions'
import { setPaginationInfo } from '../../store/users'
import Table from '../../components/Table';
import EditUserModal from './EditUserModal';
import DeleteUserModal from './DeleteUserModal';
import Pagination from '../../components/Pagination';

const Users = () => {
  const users = useSelector((state) => state.users.users)
  const isFetchingUsers = useSelector((state) => state.users.isFetchingUsers)
  const fetchingUsersError = useSelector((state) => state.users.fetchingUsersError)
  const paginationInfo = useSelector((state) => state.users.paginationInfo)

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  const [userToEdit, setUserToEdit] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);


  const startEditAction = (user) => {
    setEditModalOpen(true);
    setUserToEdit(user);
  }

  const startDeleteAction = (user) => {
    setDeleteModalOpen(true);
    setUserToDelete(user);
  }

  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'first_name', headerName: 'First Nam ' },
    { field: 'last_name', headerName: 'Last Name' },
    { field: 'email', headerName: 'Email' },
    {
      headerName: 'Actions',
      valueGetter: (row) => (
        <>
          <button onClick={() => startDeleteAction(row)}>Delete User</button>
          <button onClick={() => startEditAction(row)}>Edit User</button>
        </>
      )
    },
  ];

  const dispatch = useDispatch();

  const pageSize = 20;

  const { limit, offset, total } = paginationInfo;

  const onPageChange = useCallback((page) => {
    const newOffset = page * pageSize;
    dispatch(setPaginationInfo({ limit: 20, offset: newOffset }))
  }, [pageSize, dispatch])

  useEffect(() => {
    dispatch(fetchUsers({ limit, offset }));
  }, [limit, offset, dispatch])


  // @todo: Handle fetch user error case
  // @todo: Add a spinner for loading case

  return (
    <>
      {editModalOpen && <EditUserModal closeModal={() => setEditModalOpen(false)} userToEdit={userToEdit} />}
      {deleteModalOpen && <DeleteUserModal closeModal={() => setDeleteModalOpen(false)} userToDelete={userToDelete} />}
      <Table columns={columns} rows={users} />
      <Pagination onPageChange={onPageChange} totalDataCount={total} pageSize={pageSize} />
    </>
  )

}

export default Users;

