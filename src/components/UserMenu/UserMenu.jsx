import { Button } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, selectIsRefreshing, selectUser } from 'redux/auth';
import { StyledUserContainer, StyledUserNick } from './UserMenu.styled';

export const UserMenu = () => {
  const { name } = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isRefreshing = useSelector(selectIsRefreshing);

  const handlerLogout = () => {
    dispatch(logout());

    if (!isRefreshing) {
      navigate('/');
    }
  };

  return (
    <StyledUserContainer>
      <StyledUserNick>{name}</StyledUserNick>

      <Button
        type="button"
        fullWidth={true}
        variant="outlined"
        onClick={handlerLogout}
      >
        Logout
      </Button>
    </StyledUserContainer>
  );
};
