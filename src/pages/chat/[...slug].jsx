import React from 'react'
import Chat from '../../container/Chat'
import { useRouter } from 'next/router'

const ChatPage = () => {
    const router = useRouter()
    const { slug } = router.query

    return (
        <>
            <Chat slug={slug?.length ? slug[0] : null} />
        </>
    )
}

export default ChatPage