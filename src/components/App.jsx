// import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from './Layout';
import { ContactList } from './ContactList';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { changeFilter } from '../redux/filterSlice';
import { addContact, deleteContact } from '../redux/contactsSlice';

export const App = () => {
  const filter = useSelector(state => state.filters);
  let contacts = useSelector(state => state.contacts.values);
  const dispatch = useDispatch();

  const setContact = newContact => {
    if (
      contacts.some(
        item => item.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      alert(`${newContact.name} is already in contacts`);
      return false;
    }

    dispatch(addContact(newContact));
    return true;
  };

  const setDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const setFilter = evt => {
    dispatch(changeFilter(evt.currentTarget.value));
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <Layout
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm onSubmit={setContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={setFilter} />
      <ContactList
        contacts={getVisibleContacts()}
        onDelete={setDeleteContact}
      />
    </Layout>
  );
};
