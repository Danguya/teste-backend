import { ButtonBase, styled } from '@mui/material'

export const Button = styled(ButtonBase)`
  background-color: #0d0c22;
  width: 100%;
  padding: 18px 8px;
  border-radius: 30px;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  transition: 0.3s ease;
  &:hover {
    background-color: #339af0;
  }
  &:disabled {
    background-color: #343a40;
  }
`
