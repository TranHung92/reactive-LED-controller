import * as React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

import Store from '../../../../store'

const ColorPicker = ({ handleOpen, rgbaToString, index }) => {
  let title
  if (index === '4') {
    title = 'Color Top'
  } else {
    title = 'Color ' + index
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        lineHeight: '100%',
        margin: '20px'
      }}
    >
      <div>{title}</div>
      <RaisedButton
        backgroundColor={rgbaToString(Store.color[index])}
        onClick={() => handleOpen(index)}
        style={{ height: 36 }}
        // buttonStyle={{ height: '100%' }}
      />
    </div>
  )
}

export default ColorPicker
