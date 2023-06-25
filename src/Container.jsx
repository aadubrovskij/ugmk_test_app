import React, {useContext} from 'react';
import {Outlet} from 'react-router-dom';
import {DataContext} from "./App";
import styled from 'styled-components';

export const StyledContainer = styled.div`
  width: calc(100vw - 16px);
  height: calc(100vh - 16px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = () => {
  const parsedData = useContext(DataContext);

  return (
    <StyledContainer>
      {parsedData ? (
        <Outlet/>
      ) : (
        <div>Идёт загрузка, пожалуйста, подождите...</div>
      )}
    </StyledContainer>
  )
}