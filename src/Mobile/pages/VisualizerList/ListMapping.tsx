import * as React from 'react'

import Smooth from './Smooth'
import Rough from './Rough'
import Rainbow from './Rainbow'

export default isActive => {
  return {
    0: <Smooth isActive={isActive} />,
    1: <Rough isActive={isActive} />,
    2: <Rainbow isActive={isActive} />,
    3: <Rainbow isActive={isActive} />
  }
}
