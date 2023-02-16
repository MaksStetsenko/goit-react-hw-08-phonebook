import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { sellectContacts } from 'redux/selectors';
import { clearFilterReducer } from 'redux/filterSlice';
import { deleteContact } from 'redux/contacts/contactsOperations';

import { MdDelete } from 'react-icons/md';

import { Box } from 'components/Box';

import { ContactButtonStyled } from './Contact.styled';

const Contact = ({ contactId, name, phone }) => {
  const dispatch = useDispatch();

  const contacts = useSelector(sellectContacts);

  const deleteHandler = contactId => {
    dispatch(deleteContact(contactId));

    if (contacts.length === 1) {
      dispatch(clearFilterReducer());
    }
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      {name}: {phone}
      <ContactButtonStyled
        type="button"
        onClick={() => deleteHandler(contactId)}
      >
        <MdDelete size="30" />
      </ContactButtonStyled>
    </Box>
  );
};

export default Contact;

Contact.propTypes = {
  contactId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};
