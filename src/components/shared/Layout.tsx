import React from 'react'
import SEO from './Seo'
import Navbar from './Navbar'

const Layout = ({ children, title }) => {
  return (
    <section>
      <SEO title={title} />
      <Navbar />
      <main className='min-h-screen p-5 bg-base-200'>
        <section className='md:mt-16 max-w-5xl mx-auto'>
          <div>{children}</div>
        </section>
      </main>
    </section>
  )
}

export default Layout
