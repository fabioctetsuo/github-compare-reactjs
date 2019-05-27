import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  margin-top: 50px;
`;

export const Repository = styled.div`
  width: 250px;
  background: #fff;
  border-radius: 3px;

  display: flex;
  flex-direction: column;
  margin: 0 10px;

  .actions {
    text-align: right;
    display: flex;
    flex-direction: column;

    button {
      margin: 0 10px 10px 10px;
      padding: 5px;
      font-size: 15px;
      color: white;
      font-weight: bold;
      border-radius: 3px;
      border: none;

      &.refresh {
        background-color: #63f5b8;
      }
      &.remove {
        background-color: #ea7782;
      }

      &:hover {
        cursor: pointer;
        filter: brightness(85%);
      }
    }
  }

  header {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 64px;
    }

    strong {
      font-size: 24px;
      margin-top: 10px;
    }

    small {
      font-size: 16px;
      color: #666;
    }
  }

  ul {
    list-style: none;

    li {
      font-weight: bold;
      padding: 12px 20px;

      small {
        font-weight: normal;
        font-size: 12px;
        color: #999;
        font-style: italic;
      }

      &:nth-child(2n - 1) {
        background: #f5f5f5;
      }
    }
  }
`;
