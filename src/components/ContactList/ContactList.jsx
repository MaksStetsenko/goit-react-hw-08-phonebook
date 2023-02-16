import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Contact from 'components/Contact';
import { sellectFilteredContacts } from 'redux/selectors';

const ContactList = () => {
  const filteredContacts = useSelector(sellectFilteredContacts);

  return (
    <ul>
      {filteredContacts.map(({ id, name, phone }) => (
        <Contact key={id} contactId={id} name={name} phone={phone} />
      ))}
    </ul>
  );
};

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    })
  ),
  onDeleteContact: PropTypes.func,
};
