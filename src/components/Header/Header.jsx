import { Container } from 'components/common/Container.styled';
import { UserMenu } from 'components/UserMenu/UserMenu';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectIsRefreshing } from 'redux/auth';
import {
  StyledHeader,
  StyledRegisterBlock,
  StyledRegistredLinks,
  StyledTab,
  StyledTabsContainer,
  StyledUserBlock,
  Wraper,
} from './Header.styled';

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);

  return (
    <StyledHeader>
      <Container>
        <Wraper>
          <StyledTabsContainer>
            <StyledTab to="/">Home</StyledTab>
            {isLoggedIn && !isRefreshing && (
              <StyledTab to="/contacts">Contacts</StyledTab>
            )}
          </StyledTabsContainer>

          <StyledUserBlock>
            {isLoggedIn ? (
              <UserMenu />
            ) : (
              <StyledRegisterBlock>
                <StyledRegistredLinks to="/register">
                  Register
                </StyledRegistredLinks>
                <StyledRegistredLinks to="/login">Login</StyledRegistredLinks>
              </StyledRegisterBlock>
            )}
          </StyledUserBlock>
        </Wraper>
      </Container>
    </StyledHeader>
  );
};

export default Header;
