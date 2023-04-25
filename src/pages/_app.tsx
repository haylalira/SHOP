
import { globalStyle } from '../styles/global'
import type { AppProps } from 'next/app'
import React from 'react'
import Image from 'next/image'
import logosvg from '../assets/logo.svg'
import { Container, Header } from '../styles/pages/App'

globalStyle()

export default function App({ Component, pageProps }: AppProps) {
 
  return (

    <Container>

     <Header>
     <Image
      src={logosvg}
      alt=""
      width={90}
      height={90}
    />

     </Header>


      <Component {...pageProps} />


    </Container>
  
  )
}
