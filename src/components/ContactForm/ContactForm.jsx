import { useSelector, useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsSlice';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import {
  Form,
  FormField,
  ButtonSubmit,
  Field,
  ErrorMessage,
} from './ContactForm.styled';

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(25, 'Too long!')
    .required('Required'),

  number: Yup.string().required('Required'),
});

export function ContactForm({ onSubmit }) {
  let contacts = useSelector(state => state.contacts.values);
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={ContactSchema}
      onSubmit={(values, actions) => {
        let newContact = {
          ...values,
          id: nanoid(),
        };

        if (
          contacts.some(
            item => item.name.toLowerCase() === newContact.name.toLowerCase()
          )
        ) {
          alert(`${newContact.name} is already in contacts`);
          return;
        }

        dispatch(addContact(newContact));

        actions.resetForm();
      }}
    >
      <Form>
        <FormField>
          <Field
            type="text"
            name="name"
            placeholder="Name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          />
          <ErrorMessage name="name" component="span" />
        </FormField>
        <FormField>
          <Field
            type="tel"
            name="number"
            placeholder="Number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          />
          <ErrorMessage name="number" component="span" />
        </FormField>
        <ButtonSubmit type="submit">Add contact</ButtonSubmit>
      </Form>
    </Formik>
  );
}
