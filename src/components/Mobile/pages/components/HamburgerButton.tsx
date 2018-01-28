import * as React from 'react'

import './HamburgerStyle.css'

interface Props {
  toggle: () => void
  back: () => void
  isSidebarOpen: boolean
  isBackwardArrow: boolean
}

class HamburgerButton extends React.Component<Props, any> {
  constructor(props) {
    super(props)
  }

  public render() {
    const { isSidebarOpen, toggle, isBackwardArrow, back } = this.props
    console.log('isbabcbascbas', isBackwardArrow)

    return (
      <div
        className="col"
        style={{ position: 'fixed' }}
        onClick={isBackwardArrow ? back : toggle}
      >
        <div className="con">
          <div
            className={`bar ${
              isSidebarOpen ? 'top-active' : 'top'
            } ${isBackwardArrow && 'arrow-top'}`}
          />
          <div
            className={`bar ${
              isSidebarOpen ? 'middle-active' : 'middle'
            } ${isBackwardArrow && 'arrow-middle'}`}
          />
          <div
            className={`bar ${
              isSidebarOpen ? 'bottom-active' : 'bottom'
            } ${isBackwardArrow && 'arrow-bottom'}`}
          />
        </div>
      </div>
    )
  }
}

export default HamburgerButton
