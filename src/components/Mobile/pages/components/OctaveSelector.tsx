import * as React from 'react'
import { observer } from 'mobx-react'
import RaisedButton from 'material-ui/RaisedButton'
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'

import Store from '../../../../store'

class OctaveSelector extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  public handleClick = event => {
    // This prevents ghost click.
    event.preventDefault()

    this.setState({
      open: !this.state.open,
      anchorEl: event.currentTarget
    })
  }

  public handleRequestClose = () => {
    this.setState({
      open: false
    })
  }

  public onItemClick = value => {
    Store.octaveVal = value
    this.handleRequestClose()
  }

  public render() {
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
        <div>{'Octave'}</div>
        <RaisedButton
          onClick={this.handleClick}
          label={Store.octaveVal === 'A' ? 'All' : Store.octaveVal}
          style={{ height: 36 }}
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
          animation={PopoverAnimationVertical}
        >
          <Menu onChange={(event, value) => this.onItemClick(value)}>
            <MenuItem primaryText="All" value={'A'} />
            <MenuItem primaryText="1" value={'1'} />
            <MenuItem primaryText="2" value={'2'} />
            <MenuItem primaryText="3" value={'3'} />
            <MenuItem primaryText="4" value={'4'} />
            <MenuItem primaryText="5" value={'5'} />
            <MenuItem primaryText="6" value={'6'} />
            <MenuItem primaryText="7" value={'7'} />
          </Menu>
        </Popover>
      </div>
    )
  }
}

export default observer(OctaveSelector)
