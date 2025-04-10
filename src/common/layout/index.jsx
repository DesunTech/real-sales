import React from 'react'
import { useRouter } from 'next/router'
import Header from './header'
import Footer from './footer'
import SessionModes from '../modals/SessionModes'
import DemoMeeting from '../modals/DemoMeeting'
import TryRealsales from '../modals/TryRealsales'
import WaitAMinute from '../modals/WaitAMinute'
import ChatEndModal from '../modals/ChatEndModal'
import UploadYourDocModal from '../modals/UploadYourDocModal'

const Layout = ({children}) => {
  const router = useRouter()
  const isChatPage = router.pathname.startsWith('/chat')

  return (
    <>
      {!isChatPage && <Header />}
      {children}
      {!isChatPage && <Footer />}
      <SessionModes />
      <DemoMeeting />
      <TryRealsales /> 
      <WaitAMinute />
      <ChatEndModal />
      <UploadYourDocModal />
    </>
  )
}

export default Layout