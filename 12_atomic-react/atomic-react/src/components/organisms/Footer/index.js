import React from 'react'
import styled from 'styled-components'
import { palette } from 'styled-theme'

import { Paragraph, Link, Icon } from '../..'

const Wrapper = styled.div`
  background-color: ${palette('grayscale', 1, true)};
`

const Credits = styled(Paragraph)`
  vertical-align: center;
  text-align: center;
  margin: 0;
`

const Footer = (props) => {
  return (
    <Wrapper {...props}>
      <Credits>
        Made with
        {' '}
        <Icon icon="heart" />
        {' '}
        by
        {' '}
        <Link href="https://github.com/uriyang">uriyang</Link>
      </Credits>
    </Wrapper>
  )
}

export default Footer
