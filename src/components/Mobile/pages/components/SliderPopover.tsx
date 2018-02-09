import * as React from 'react'
import { observer } from 'mobx-react'
import RaisedButton from 'material-ui/RaisedButton'
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover'
import Slider from 'material-ui/Slider'

interface Props {
  value: number
  onChange: any
}

interface States {
  open: boolean
  anchorEl: any
}

class SliderPopover extends React.Component<Props, States> {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      anchorEl: undefined
    }
  }

  public togglePopover = () => {
    this.setState(prev => ({ open: !prev.open }))
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
        <div>{'Mid-Octave'}</div>
        <RaisedButton
          onClick={this.handleClick}
          label={this.props.value}
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
          <div style={{ width: 200, height: 60 }}>
            <Slider
              // style={{ height: 200 }}
              value={this.props.value}
              min={0}
              max={100}
              step={1}
              onChange={this.props.onChange}
            />
          </div>
        </Popover>
      </div>
    )
  }
}

export default observer(SliderPopover)
