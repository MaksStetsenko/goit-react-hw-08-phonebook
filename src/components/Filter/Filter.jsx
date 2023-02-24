import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { inputFilterReducer } from '../../redux/filter/filterSlice';
import { sellectFilter } from '../../redux/filter/filter.selectors';
import SearchIcon from '@mui/icons-material/Search';

import { Search, SearchIconWrapper, StyledInputBase } from './Filter.styled';

const Filter = () => {
  const dispatch = useDispatch();

  const filter = useSelector(sellectFilter);

  const handleChangeFilter = event => {
    dispatch(inputFilterReducer(event.currentTarget.value));
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        value={filter}
        onChange={handleChangeFilter}
      />
    </Search>
  );
};

export default Filter;

Filter.propTypes = {
  filter: PropTypes.element,
  onChange: PropTypes.func,
  clearFilter: PropTypes.func,
};
