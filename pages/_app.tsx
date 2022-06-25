import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { RouteGuard } from '../components/route-guard';

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    // it uses to provide the session variable to all the child components
    <SessionProvider session={session}>
      {/* it uses to secure private pages */}
      <RouteGuard>
        <Component {...pageProps} />
      </RouteGuard>
    </SessionProvider>
  )
}

export default MyApp;