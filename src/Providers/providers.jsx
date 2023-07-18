import { SessionProvider } from 'next-auth/react'
import React from 'react'

const providers = ({children}) => {
    return <SessionProvider>{children}</SessionProvider>
}

export default providers