import styled from "styled-components";
import Select from "react-select";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

export const SelectContainer = styled.div`
  width: 100%;
  flex: 0;
  border: 2px solid grey;
  border-radius: 8px;
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  align-items: center;
`;

export const SelectWrapper = styled(Select)`
  width: 150px;
`

export const Content = styled.div`
  flex: 1;
  border: 2px solid grey;
  border-radius: 8px;
`;
