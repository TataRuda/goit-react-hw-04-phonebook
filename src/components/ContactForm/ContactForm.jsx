import PropTypes from 'prop-types'; 
import React, {useState} from 'react';
import { nanoid } from "nanoid";
import css from './ContactForm.module.css';

export const ContactForm = ({onSubmit}) => {
  const [ name, setName ] = useState('');
  const [ number, setNumber ] = useState('');

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };
    
  const reset = () => {
    setName('');
    setNumber('');
  }; 

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({  name: name, number: number, id: nanoid() });
    reset();
  };
  const nameId = nanoid();
  const numberId = nanoid();
 
  return (
    <form className={css.form}
      onSubmit={handleSubmit}>
      <label htmlFor={nameId}>Name</label>
      <input
        id={nameId}
        type="text"
        value={name}
        onChange={handleChange}
        pattern="[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        name="name"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required/>
      <label htmlFor={numberId}>Number</label>
      <input
        id={numberId}
        type="tel"
        value={number}
        onChange={handleChange}
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
         required/>
      <button className={css.button} type="submit">Add contact</button>
    </form>        
    );
}


ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}