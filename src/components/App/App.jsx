import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  sellectError,
  sellectFilteredContacts,
  sellectIsLoading,
  sellectIsPhonebookEmpty,
} from 'redux/selectors';

import { message } from 'components/settings';
import { Box } from 'components/Box';
import Section from 'components/Section';
import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList';
import Notification from 'components/Notification';

import { AppStyled, AppTitleStyled } from './App.styled';
import { fetchContacts } from 'redux/contacts/contactsOperations';

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(sellectIsLoading);
  const error = useSelector(sellectError);
  const filteredContacts = useSelector(sellectFilteredContacts);
  const isPhonebookEmpty = useSelector(sellectIsPhonebookEmpty);
  const isFilteredContactsEmpty = filteredContacts.length === 0;
  const { isEmptyBook, noMatches } = message;

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  //=========== render ==============================================

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      fontSize="l"
      color="primary"
    >
      <AppTitleStyled>My phonebook</AppTitleStyled>

      <AppStyled>
        <Section title="Contacts editor">
          <ContactForm />
        </Section>

        <Box display="block" height="20px" textAlign="center" color="red">
          {isLoading && <div>Loading</div>}
        </Box>

        {!error && (
          <Section title="Contacts">
            {isPhonebookEmpty ? (
              <Notification message={isEmptyBook} />
            ) : (
              <>
                <Filter />

                {isFilteredContactsEmpty ? (
                  <Notification message={noMatches} />
                ) : (
                  <ContactList />
                )}
              </>
            )}
          </Section>
        )}
      </AppStyled>
    </Box>
  );
};
