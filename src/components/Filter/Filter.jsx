import React from 'react';
import { TiDelete } from 'react-icons/ti';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { inputFilterReducer, clearFilterReducer } from 'redux/filterSlice';
import { sellectFilter } from 'redux/selectors';

import { Box } from 'components/Box';

import { LabelStyled, InputStyled, ButtonStyled } from './Filter.styled';

const Filter = () => {
  const dispatch = useDispatch();

  const filter = useSelector(sellectFilter);

  const handleChangeFilter = event => {
    dispatch(inputFilterReducer(event.currentTarget.value));
  };

  const clearFilter = () => {
    dispatch(clearFilterReducer());
  };

  return (
    <Box mb="4">
      <LabelStyled htmlFor="filter">Find contacts by name</LabelStyled>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mt="2"
      >
        <InputStyled
          type="text"
          name="filter"
          id="filter"
          value={filter}
          onChange={handleChangeFilter}
        />

        <ButtonStyled
          type="button"
          aria-label="Clear filter"
          onClick={clearFilter}
        >
          <TiDelete size="36" />
        </ButtonStyled>
      </Box>
    </Box>
  );
};

export default Filter;

Filter.propTypes = {
  filter: PropTypes.element,
  onChange: PropTypes.func,
  clearFilter: PropTypes.func,
};
