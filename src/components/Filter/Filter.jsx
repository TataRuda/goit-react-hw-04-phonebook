import PropTypes from 'prop-types';
import css from './Filter.module.css'

export const Filter = ({filter, onChange}) => {
    return (
        <label className={css.filterBox}> Find contacts by name
          <input className={css.filterInput}
            type="text"
            name="filter"
            value={filter}
            onChange={onChange}
            placeholder="Search..."
          />
        </label>  
    );
   
}

Filter.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}