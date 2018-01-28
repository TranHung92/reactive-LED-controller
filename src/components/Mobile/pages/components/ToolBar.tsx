import * as React from 'react'

class ToolBar extends React.Component<any, any> {
  constructor(props) {
    super(props)
  }

  public render() {
    return (
      <div
        style={{
          width: '100vw',
          height: 64,
          backgroundColor: '#00bcd4',
          position: 'absolute'
        }}
      />
    )
  }
}

export default ToolBar
