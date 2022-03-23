import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../../store/users/actions'
import { setPaginationInfo } from '../../store/users'
import Table from '../../components/Table';
import EditUserModal from './EditUserModal';
import DeleteUserModal from './DeleteUserModal';
import Pagination from '../../components/Pagination';
import { User } from '../../store/users/typings';
import { RootState } from '../../store';
import './styles.scss';
import { DeleteIcon, EditIcon } from '../../icons';

const Users = () => {
  const { users, paginationInfo } = useSelector((state: RootState) => ({
    users: state.users.users,
    paginationInfo: state.users.paginationInfo,
  }));

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const dispatch = useDispatch();

  const { limit, offset, total } = paginationInfo;

  useEffect(() => {
    dispatch(fetchUsers({ limit, offset }));
  }, [limit, offset, dispatch])

  const pageSize = 20;
  const onPageChange = useCallback((page) => {
    const newOffset = page * pageSize;
    dispatch(setPaginationInfo({ limit: 20, offset: newOffset }))
  }, [pageSize, dispatch])

  const startEditAction = (user: User) => {
    setEditModalOpen(true);
    setUserToEdit(user);
  }

  const startDeleteAction = (user: User) => {
    setDeleteModalOpen(true);
    setUserToDelete(user);
  }

  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'first_name', headerName: 'First Name ' },
    { field: 'last_name', headerName: 'Last Name' },
    { field: 'email', headerName: 'Email' },
    {
      field: '',
      headerName: 'Actions',
      valueGetter: (row: User) => (
        <>
          <EditIcon className="user-edit-icon" onClick={() => startEditAction(row)} />
          <DeleteIcon className="user-delete-icon" onClick={() => startDeleteAction(row)} />
        </>
      )
    },
  ];


  // @todo: Handle fetchUser error state
  // @todo: Handle isFetchingUser loading state

  return (
    <div className='page-users'>
      {editModalOpen && <EditUserModal closeModal={() => setEditModalOpen(false)} userToEdit={userToEdit as User} />}
      {deleteModalOpen && <DeleteUserModal closeModal={() => setDeleteModalOpen(false)} userToDelete={userToDelete as User} />}
      <Table columns={columns} rows={users} />
      <Pagination onPageChange={onPageChange} totalDataCount={total} pageSize={pageSize} />
    </div>
  )

}

export default Users;

