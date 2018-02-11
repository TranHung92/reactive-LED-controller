import * as React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import Store from '../../store'

interface Props {}

interface States {
  open: boolean
}

class SavingButton extends React.Component<Props, States> {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  private handleClose = () => {
    this.setState({ open: false })
  }

  private handleOpen = () => {
    this.setState({ open: true })
  }

  private onSave = () => {
    Store.savePattern(1)
    this.handleClose()
  }

  public render() {
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
      <FlatButton
        label="Save"
        primary={true}
        keyboardFocused={true}
        onClick={this.onSave}
      />
    ]

    return (
      <div>
        <button onClick={this.handleOpen}>Hit me</button>
        <Dialog
          title="Save Pattern"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <h1>helloworld</h1>
        </Dialog>
      </div>
    )
  }
}

export default SavingButton
