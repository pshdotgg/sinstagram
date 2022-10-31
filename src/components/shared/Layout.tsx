import React from 'react'
import SEO from './Seo'
import Navbar from './Navbar'

const Layout = ({ children, title }) => {
  return (
    <section>
      <SEO title={title} />
      <Navbar />
      <main className='p-0 min-h-[calc(100vh-64px)] md:p-5 bg-base-200'>
        <section>
          <div>{children}</div>
        </section>
      </main>
    </section>
  )
}

export default Layout
