import { ReactNode } from 'react'
import { Wrapper } from './style'

type MessageProps = {
  children: ReactNode
  show: boolean
}

export default function Message({ children, show }: MessageProps) {
  return <Wrapper className={`${show ? 'show' : 'hidden'}`}>{children}</Wrapper>
}
