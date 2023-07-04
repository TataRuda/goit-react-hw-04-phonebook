import React from 'react';
import { nanoid } from "nanoid";
import { ContactList } from 'components/ContactList/ContactList';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Section } from 'components/Section/Section';
import { Filter } from 'components/Filter/Filter';

export class App extends React.Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
    name: '',
    number: ''
  };

  // save in localStorage 
  componentDidUpdate() {
    const { contacts } = this.state;
    localStorage.setItem('contacts', JSON.stringify(contacts));
  };

  // load from LocalStorage
  componentDidMount() {
    const storedConatacts = localStorage.getItem('contacts');
    if (storedConatacts) {
      this.setState({contacts: JSON.parse(storedConatacts)})
    }
  };

 // add contact in list
 addContact = ({name, number}) => {
  const { contacts } = this.state;
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
  this.setState(prevState => ({
    contacts: [{ name, number, id: nanoid() }, ...prevState.contacts],
  }));
 };

 // delete contact 
 deleteContact = id  => {
  this.setState(prevState => ({
    contacts: prevState.contacts.filter(contact => contact.id !== id),
  }));
};

 getContacts = () => {
  const { contacts, filter } = this.state;
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  return filteredContacts;
 };

 handleFilter = e => {
  const { value } = e.currentTarget;
  this.setState({ filter: value });
 };
  
  render() {
    const { filter } = this.state;
     const visibleContacts = this.getContacts();
    return (
      <> 
      <Section title='Phonebook'>
        <ContactForm onSubmit={this.addContact}/>
      </Section>
      <Section title='Contacts'>
        <Filter value={filter}
        onChange={this.handleFilter}/>
        <ContactList contacts={visibleContacts}
        onDeleteContact={this.deleteContact}/>
      </Section>
      
      </>
    )
  }

};
