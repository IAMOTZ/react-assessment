import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Modal from '../../../components/Modal';
import { deleteUser } from '../../../store/users/actions';
import { User } from '../../../store/users/typings';

export interface DeleteUserModalProps {
  closeModal: () => void;
  userToDelete: User
}

const DeleteUserModal = ({ closeModal, userToDelete }: DeleteUserModalProps) => {
  const dispatch = useDispatch();

  const confirmUserDelete = () => {
    dispatch(deleteUser(userToDelete.id))
    closeModal();
  };

  return (
    <Modal>
      <h2>Are you sure you want to delete user with ID {userToDelete.id}?</h2>
      <div className="actions">
        <button onClick={confirmUserDelete}>Yes</button>
        <button onClick={closeModal}>No</button>
      </div>
    </Modal>
  )
};

DeleteUserModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  userToDelete: PropTypes.object.isRequired,
}

export default DeleteUserModal;