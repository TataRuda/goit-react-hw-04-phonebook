import React, { useState, useEffect} from 'react';
import { nanoid } from "nanoid";
import { ContactList } from 'components/ContactList/ContactList';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Section } from 'components/Section/Section';
import { Filter } from 'components/Filter/Filter';

const INITIAL_CONTACTS = [
  {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
  {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
  {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
  {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'}, 
]
export const App = () => {
  const [ contacts, setContacts ] = useState(INITIAL_CONTACTS);
  const [ filter, setFilter] = useState('');
  
  // load from LocalStorage
  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    } 
  }, []);
  
  // save in localStorage 
  useEffect(() => {
      localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // add contact in list
  const addContact = ({name, number}) => {
 // Check if there is a contact with the same name  
  const isDuplicate = contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase());
  const isDuplicateNumber = contacts.some(contact => contact.number === number);
  if (isDuplicate) {
    alert( `${name} already exists!`);
    return;
  }
  else if (isDuplicateNumber) {
    alert( `${number} already exists in the contacts!`);
    return;
  }
  setContacts(contacts => [ {name, number, id: nanoid()}, ...contacts]);
  };

 // delete contact 
  const deleteContact = id  => {
  setContacts( contacts => contacts.filter(contact => contact.id !== id),
  );
  };

  const getContacts = () => {
    const filteredContacts = contacts.filter(contact =>
     contact.name.toLowerCase().includes(filter.toLowerCase())
     );
    return filteredContacts;
  };

  const handleFilter = e => {
    setFilter(e.currentTarget.value);
  } 

  const visibleContacts = getContacts();
  
  return (
    <> 
      <Section title='Phonebook'>
        <ContactForm onSubmit={addContact}/>
      </Section>
      <Section title='Contacts'>
        <Filter value={filter}
        onChange={handleFilter}/>
        <ContactList contacts={visibleContacts}
        onDeleteContact={deleteContact}/>
      </Section>
    </>
  )
};
