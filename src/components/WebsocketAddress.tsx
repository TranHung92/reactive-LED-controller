import * as React from 'react'
import { observer } from 'mobx-react'
import Spinner from 'react-spinkit'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import Store from '../store'

class WebsocketAddress extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      socketIp: ''
    }
  }

  private handleClick = () => {
    Store.connect(Store.ip)
  }

  private handleIpChange = (e, newVal) => {
    Store.ip = newVal
  }

  private onSubmitMode = () => {
    // bigString2Vars('3A128249255255255000255000000050050')
    // Store.sendPattern()
    // bigString2Vars('4A000255000255255000255000000050050')
    Store.sendPattern()
  }

  public render(): JSX.Element {
    return (
      <div>
        <TextField
          hintText="Hint Text"
          floatingLabelText="Floating Label Text"
          value={Store.ip || ''}
          onChange={this.handleIpChange}
        />
        <RaisedButton
          secondary={true}
          label="xin chào"
          onClick={this.handleClick}
        />
        <RaisedButton
          primary={true}
          label="submit"
          onClick={this.onSubmitMode}
        />
        {Store.isLoading && <Spinner name="pacman" color="orange" />}
      </div>
    )
  }
}

export default observer(WebsocketAddress)
