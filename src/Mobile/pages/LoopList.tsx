import * as React from 'react'
import { Link } from 'react-router-dom'

class LoopList extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      containerPosition: 'absolute'
    }
  }

  public render() {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          position: this.state.containerPosition,
          backgroundColor: 'yellow'
        }}
      >
        <Link
          to="/home"
          onClick={() => this.setState({ containerPosition: 'absolute' })}
        >
          LoopLIST
        </Link>
      </div>
    )
  }
}

export default LoopList
