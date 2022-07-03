import { Toaster } from 'react-hot-toast'
import MetaMaskAccountProvider from '../components/meta-mask-account-provider'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps })=> (
  <MetaMaskAccountProvider>
    <Toaster />
    <Component {...pageProps} />
  </MetaMaskAccountProvider>
)

export default MyApp
