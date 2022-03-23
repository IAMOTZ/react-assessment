import React from 'react';
import { useDispatch } from 'react-redux';
import Modal from '../../../components/Modal';
import { deleteUser } from '../../../store/users/actions';


const DeleteUserModal = ({ closeModal, userToDelete }) => {
  const dispatch = useDispatch();

  const confirmUserDelete = () => {
    dispatch(deleteUser(userToDelete.id))
    closeModal();
  };

  return (
    <Modal>
      <h2>Are you sure you want to delete this user?</h2>
      <button onClick={confirmUserDelete}>Yes</button>
      <button onClick={closeModal}>No</button>
    </Modal>
  )
};


export default DeleteUserModal;