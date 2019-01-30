import React from 'react'

import {
  PageTemplate, Header, Footer, Paragraph, Heading,
} from '../..'

const SamplePage = () => {
  return (
    <PageTemplate header={<Header />} footer={<Footer />}>
      <Heading>Heading</Heading>
      <Paragraph>
        Paragraph
      </Paragraph>
    </PageTemplate>
  )
}

export default SamplePage
