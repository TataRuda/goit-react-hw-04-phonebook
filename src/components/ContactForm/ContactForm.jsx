import PropTypes from 'prop-types'; 
import React from 'react';
import css from './ContactForm.module.css';


export class ContactForm extends React.Component {
    state = {
        name: '',
        number: '',
    }

    handleChange = e => {
        const { name, value } = e.currentTarget;
        this.setState({ [name]: value });
    };
    
    handleSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state);
        this.reset();
    };
    
    reset = () => {
      this.setState({ name: '', number: '' });
    };
    
    render() {
        const { name, number } = this.state;
        return (<form className={css.form}
            onSubmit={this.handleSubmit}>
            <label htmlFor={this.nameId}>Name</label>
            <input
            type="text"
            value={name}
            onChange={this.handleChange}
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required/>
              <label htmlFor={this.numberId}>Number</label>
            <input
            type="tel"
            value={number}
            onChange={this.handleChange}
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required/>
            <button className={css.button} type="submit">Add contact</button>
          </form>        
        );
      }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}