import React from 'react'
import SEO from './Seo'
import Navbar from './Navbar'

const Layout = ({ children, title }) => {
  return (
    <section>
      <SEO title={title} />
      <Navbar />
      <main>
        <section>
          <div>{children}</div>
        </section>
      </main>
    </section>
  )
}

export default Layout
