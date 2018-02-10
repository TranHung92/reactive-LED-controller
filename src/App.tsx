import * as React from 'react'

import Mobile from './Mobile'
import Desktop from './Desktop'

const App = () => {
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
    navigator.userAgent.toLowerCase()
  )
  return isMobile ? <Mobile /> : <Desktop />
}

export default App
