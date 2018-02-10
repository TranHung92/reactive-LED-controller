import * as React from 'react'
import { observer } from 'mobx-react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Spinner from 'react-spinkit'

import Store from '../../store'

class Connect extends React.Component<any, any> {
  constructor(props) {
    super(props)
  }

  public componentWillMount() {
    Store.getSocketIp()
  }

  private handleIpChange = (e, newVal) => {
    Store.ip = newVal
  }

  private handleClick = () => {
    Store.connect(Store.ip)
  }

  public render() {
    return (
      <div>
        <TextField
          hintText="Hint Text"
          floatingLabelText="Floating Label Text"
          value={Store.ip || ''}
          onChange={this.handleIpChange}
        />
        <RaisedButton
          primary={true}
          label="connect"
          onClick={this.handleClick}
        />
        {Store.isLoading && (
          <Spinner
            style={{ backgroundColor: 'red' }}
            name="pacman"
            color="orange"
          />
        )}
      </div>
    )
  }
}

export default observer(Connect)
