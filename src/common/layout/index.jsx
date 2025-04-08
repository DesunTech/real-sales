import React from 'react'
import Header from './header'
import Footer from './footer'
import SessionModes from '../modals/SessionModes'
import DemoMeeting from '../modals/DemoMeeting'
import TryRealsales from '../modals/TryRealsales'

const Layout = ({children}) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <SessionModes />
      <DemoMeeting />
      <TryRealsales />
    </>
  )
}

export default Layout