import { styled } from '@mui/material'

export const Wrapper = styled('div')`
  font-size: 14px;
  font-weight: 500;
  padding: 16px 0;
  color: #fff;
  background-color: #fa5252;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  transition:
    top 0.4s ease-in-out,
    opacity 3s ease;

  &.hidden {
    top: -50px;
    opacity: 0;
  }

  &.show {
    top: 0;
    opacity: 1;
  }
`
