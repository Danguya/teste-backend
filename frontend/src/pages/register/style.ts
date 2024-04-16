import { styled } from '@mui/material'

export const Wrapper = styled('div')`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: #fff;
  padding-top: 30px;
  padding: 40px 24px;

  form {
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    max-width: 350px;
    width: 100%;
    .TextField {
      width: 100%;
    }
    h2 {
      color: #0d0c22;
      width: 100%;
      margin-bottom: 8px;
    }
  }

  @media (min-width: 425px) {
    padding: 40px;
  }
`
