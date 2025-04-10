import React from 'react'
import Chat from '../../container/Chat'
import { useRouter } from 'next/router'

const ChatPage = () => {
    const router = useRouter()
    const { slug } = router.query

    return (
        <>
            <Chat slug={slug[0]} />
        </>
    )
}

export default ChatPage