import styled from 'styled-components';

export const StyledUserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  max-width: 120px;
  position: absolute;
  top: 0;
  right: 0;
  gap: ${p => p.theme.space[4]}px;
  @media (min-width: 768px) {
    max-width: 300px;
    gap: ${p => p.theme.space[4]}px;
    flex-direction: row;
    justify-content: flex-start;
  }
  /* background-color: azure; */
`;

export const StyledUserNick = styled.p`
  margin: ${p => p.theme.space[0]}px;
  text-align: center;
`;
