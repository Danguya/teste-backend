import {
  Dialog as DialogMUI,
  DialogActions as DialogActionsMUI,
  styled,
} from '@mui/material'

export const Dialog = styled(DialogMUI)`
  padding: 0;
  .MuiModal-backdrop {
    background-color: #fff;
  }
  .MuiDialog-paper {
    width: 100%;
    max-width: 400px;
    border-radius: 8px;
    display: flex;
    padding: 32px 8px;
    box-shadow: none;
    position: relative;
    min-width: 100%;
    width: 100%;

    .MuiDialogContent-root {
      form {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }
    }
  }

  @media (min-width: 425px) {
    .MuiModal-backdrop {
      background-color: rgba(0, 0, 0, 0.5);
    }
    .MuiDialog-paper {
      min-width: inherit;
      padding: 40px 24px;
    }
  }
`

export const DialogActions = styled(DialogActionsMUI)`
  display: flex;
  flex-direction: column;

  .button_close {
    background-color: transparent;
    color: #0d0c22;
    &:hover {
      background-color: transparent;
      color: #ccc;
    }
  }

  @media (min-width: 425px) {
    flex-direction: row-reverse;
  }
`
