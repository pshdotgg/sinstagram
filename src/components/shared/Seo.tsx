import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'

const Seo = ({ title }) => {
  const tileText = title ? `${title} · Instagram` : 'Instagram'

  return (
    <HelmetProvider>
      <Helmet>
        <title>{tileText}</title>
      </Helmet>
    </HelmetProvider>
  )
}

export default Seo
