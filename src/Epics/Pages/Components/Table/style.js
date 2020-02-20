import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

export const LoaderComponent = styled.div`
  height: 12.3125rem;
  width: 1330px;
  position: relative;
  margin: 0 auto;
`;

export const Loader = styled(CircularProgress)`
  position: absolute;
  left: 50%;
  top: 50%;
  max-height: 20px;
  max-width: 20px;
`;
export const InputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: space-between;
  justify-content: flex-end;
`;

export const SelectElement = styled.div`
  margin: 10px;
`;

export const SearchElement = styled.div`
  margin: 10px;
`;

export const Banks = styled.div`
  margin: 10px;
`;
