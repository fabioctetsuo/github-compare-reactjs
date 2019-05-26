import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
`;

export const Form = styled.form`
  margin-top: 20px;
  width: 100%;
  max-width: 400px;
  display: flex;

  input {
    flex: 1;
    height: 55px;
    padding: 0 20px;
    border: 0;
    font-size: 18px;
    color: #444;
    border-radius: 3px;

    border: ${({ hasError }) => (hasError ? '2px solid #F00' : 0)}

    &:disabled {
      background-color: #d9d9d9;
      cursor: not-allowed;
    }
  }

  button {
    height: 55px;
    padding: 0 20px;
    margin-left: 10px;
    background-color: #63f5b8;
    color: #fff;
    border: 0;
    font-size: 20px;
    font-weight: bold;
    border-radius 3px;
    width: 200px;

    &:hover {
      cursor: pointer;
      background-color: #52d89f;
    }
  }
`;
