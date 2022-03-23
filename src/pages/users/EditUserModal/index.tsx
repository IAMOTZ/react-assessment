import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from '../../../components/Modal';
import { editUser } from '../../../store/users/actions';
import { User } from '../../../store/users/typings';

export interface EditUserModalProps {
  closeModal: () => void;
  userToEdit: User;
}

interface ValidationResult {
  firstNameError?: string | null;
  lastNameError?: string | null;
  emailError?: string | null
}


const EditUserModal = ({ closeModal, userToEdit }: EditUserModalProps) => {
  const [firstName, setFirstName] = useState(userToEdit.first_name);
  const [lastName, setLastName] = useState(userToEdit.last_name);
  const [email, setEmail] = useState(userToEdit.email);

  const [validationResult, setValidationResult] = useState<ValidationResult>({ firstNameError: null, lastNameError: null, emailError: null });

  const validateInputs = () => {
    const errors: ValidationResult = {};
    if (!firstName) errors.firstNameError = 'First name is required';
    if (!lastName) errors.lastNameError = 'Last name is required';
    // @todo-improvement: Validate email format
    if (!email) errors.emailError = 'Email is required';

    setValidationResult(errors);
  }

  const { firstNameError, lastNameError, emailError } = validationResult;

  const dispatch = useDispatch();

  const confirmUserEdit = () => {
    dispatch(editUser({
      ...userToEdit,
      first_name: firstName,
      last_name: lastName,
      email: email,
    }))
    closeModal();
  };

  return (
    <Modal>
      <h2>You are editing user with ID: {userToEdit.id}</h2>
      <div className="input-field first-name">
        <input value={firstName} onChange={e => setFirstName(e.target.value)} onBlur={validateInputs} />
        {firstNameError && <p className='error-text'>{firstNameError}</p>}
      </div>
      <div className="input-field last-name">
        <input value={lastName} onChange={e => setLastName(e.target.value)} onBlur={validateInputs} />
        {lastNameError && <p className='error-text'>{lastNameError}</p>}
      </div>

      <div className="input-field email">
        <input value={email} onChange={e => setEmail(e.target.value)} onBlur={validateInputs} />
        {emailError && <p className='error-text'>{emailError}</p>}
      </div>

      <div className="actions">
        <button onClick={confirmUserEdit} disabled={!!firstNameError || !!lastNameError || !!emailError}>Update</button>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </Modal>
  )
};


export default EditUserModal;