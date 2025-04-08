import React from 'react'
import Header from './header'
import Footer from './footer'
import SessionModes from '../modals/SessionModes'
import DemoMeeting from '../modals/DemoMeeting'
import TryRealsales from '../modals/TryRealsales'
import WaitAMinute from '../modals/WaitAMinute'

const Layout = ({children}) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <SessionModes />
      <DemoMeeting />
      <TryRealsales />
      <WaitAMinute />
    </>
  )
}

export default Layout