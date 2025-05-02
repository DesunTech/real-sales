import React from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import Header from './header'
import Footer from './footer'
import SessionModes from '../modals/SessionModes'
import DemoMeeting from '../modals/DemoMeeting'
import TryRealsales from '../modals/TryRealsales'
import WaitAMinute from '../modals/WaitAMinute'
import ChatEndModal from '../modals/ChatEndModal'
import UploadYourDocModal from '../modals/UploadYourDocModal'
import PersonaTypeModal from '../modals/PersonaTypeModal'
import InteractionModal from '../modals/InteractionModal'
import IdealPersonaModal from '../modals/IdealPersonaModal'
import ShortlistedPersonaModal from '../modals/ShortlistedPersonaModal'
import { 
  PersonaTypeValue, 
  InteractionValue, 
  IdealPersonaValue, 
  ShortlistedPersonaValue 
} from '../../redux/OpenModal'
import PaymentConfirmation from '../modals/PaymentConfirmation'

const Layout = ({children}) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const isChatPage = router.pathname.startsWith('/chat')

  // Modal state handlers
  const handlePersonaTypeNext = () => {
    dispatch(PersonaTypeValue(false))
    dispatch(InteractionValue(true))
  }

  const handleInteractionNext = () => {
    dispatch(InteractionValue(false))
    dispatch(IdealPersonaValue(true))
  }

  const handleIdealPersonaNext = () => {
    dispatch(IdealPersonaValue(false))
    dispatch(ShortlistedPersonaValue(true))
  }

  const handleShortlistedPersonaNext = () => {
    dispatch(ShortlistedPersonaValue(false))
    router?.push("/pricing")
  }

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
      <PaymentConfirmation />
      
      {/* Persona Flow Modals */}
      <PersonaTypeModal onNext={handlePersonaTypeNext} />
      <InteractionModal onNext={handleInteractionNext} />
      <IdealPersonaModal onNext={handleIdealPersonaNext} />
      <ShortlistedPersonaModal onNext={handleShortlistedPersonaNext} />
    </>
  )
}

export default Layout