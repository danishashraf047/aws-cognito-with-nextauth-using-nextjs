import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { RouteGuard } from './components/route-guard';

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <RouteGuard>
        <Component {...pageProps} />
      </RouteGuard>
    </SessionProvider>
  )
}

export default MyApp;