import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';
import { Contact } from '../Contact';
import { List } from './ContactList.styled';

export function ContactList() {
  let contacts = useSelector(state => state.contacts.values);
  const filter = useSelector(state => state.filters);
  const dispatch = useDispatch();

  const setDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const normalizedFilter = filter.toLowerCase();

  let contactFilter = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <List>
      {contactFilter.map(({ id, name, number }) => (
        <Contact
          key={id}
          id={id}
          name={name}
          number={number}
          onDelete={setDeleteContact}
        />
      ))}
    </List>
  );
}
