import { styled } from "@mui/material";

export const Wrapper = styled('div')`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: #f1f3f5;
  form {
    background-color: #fff;
    padding: 32px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    max-width: 300px;
    width: 100%;

    h2 {
      text-align: center;
    }
  }
`;
