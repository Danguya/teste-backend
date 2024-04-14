import { styled } from "@mui/material";

export const Wrapper = styled('header')`
  background-color: #1864ab;
  height: 71px;
  color:#fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 20px;
  .logo{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 24px;
  }
  h3 {
    cursor: pointer;
  }
  .cta {
    display: flex;
    gap: 8px;
    button {
      padding: 8px;
      background-color: transparent;
      border: none;
      color: #fff;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: 0.3s ease-in-out;
    }
    button.add_task{
      background: #202020;
      border-radius: 4px;
      padding: 8px 16px;
      &:hover{
        background-color: #181818;
      }
    }
  }

`;

export const User = styled('div')`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border-radius: 9px;
  transition: 0.3s ease;
  cursor: pointer;
  &:hover{
    background-color: #339af0;
  }

  .avatar{
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background-color: #fff;
    img{
      width: 100%;
      object-fit: cover;
      border-radius: 100%;
    }
  }
  .username {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 2px;
    max-width: 200px;
  }
`
