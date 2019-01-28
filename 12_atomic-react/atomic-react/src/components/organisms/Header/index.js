import React from 'react'
import styled from 'styled-components'
// import { size } from 'styled-theme'

import { Block } from '../..'

const Wrapper = styled(Block)`
  display: flex;
  justify-content: center;
  padding: 1rem;
  @media screen and (max-width: 640px) {
    padding: 0.5rem;
  }
`

const Header = (props) => {
  return (
    <Wrapper opaque reverse {...props}>
      Header
    </Wrapper>
  )
}

export default Header
