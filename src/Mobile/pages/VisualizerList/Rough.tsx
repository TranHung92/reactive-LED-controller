import * as React from 'react'
import { observer } from 'mobx-react'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import { CirclePicker } from 'react-color'

import OctaveSelector from '../../components/OctaveSelector'
import ColorPicker from '../../components/ColorPicker'
import SliderPopover from '../../components/SliderPopover'

import Store from '../../../store'
import { setVar } from '../../../helpers'

interface Props {
  isActive: boolean
}

interface States {
  open: boolean
  currentColor: any
}

class Rough extends React.Component<Props, States> {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      currentColor: undefined
    }
  }

  public componentDidMount() {
    Store.generalVal = '1'
    Store.octaveVal = 'A'
  }

  private handleOpen = (colorNumber: string) => {
    this.setState({ open: true, currentColor: colorNumber })
  }

  private handleClose = () => {
    this.setState({ open: false })
  }

  private handleColorPicker = color => {
    if (this.state.currentColor === '4' && Store.generalVal !== '3') {
      Store.generalVal = '3'
    } else if (this.state.currentColor !== '4' && Store.generalVal !== '1') {
      Store.generalVal = '1'
    }

    Store.color = {
      ...Store.color,
      [this.state.currentColor]: {
        r: setVar(color.rgb.r),
        g: setVar(color.rgb.g),
        b: setVar(color.rgb.b),
        a: color.rgb.a
      }
    }
  }

  private rgbaToString = (rgba): string => {
    return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`
  }

  private onMidOctaveChange = (e, value) => {
    Store.var1 = setVar(value)
  }

  public render() {
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />
    ]

    if (!this.props.isActive) {
      return (
        <div
          style={{ width: '100%', height: '100%', backgroundColor: 'green' }}
        />
      )
    } else {
      return (
        <div>
          <div
            style={{
              width: '100%',
              height: '150px',
              backgroundColor: 'purple'
            }}
          >
            Top
          </div>
          <div style={{ overflow: 'scroll' }}>
            <OctaveSelector />
            <ColorPicker
              handleOpen={this.handleOpen}
              rgbaToString={this.rgbaToString}
              index={'1'}
            />
            <ColorPicker
              handleOpen={this.handleOpen}
              rgbaToString={this.rgbaToString}
              index={'2'}
            />
            <ColorPicker
              handleOpen={this.handleOpen}
              rgbaToString={this.rgbaToString}
              index={'3'}
            />
            <ColorPicker
              handleOpen={this.handleOpen}
              rgbaToString={this.rgbaToString}
              index={'4'}
            />
            <SliderPopover
              value={parseInt(Store.var1)}
              onChange={this.onMidOctaveChange}
            />
          </div>
          <Dialog
            title="Dialog With Actions"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            <CirclePicker
              color={
                this.state.currentColor
                  ? this.rgbaToString(Store.color[this.state.currentColor])
                  : null
              }
              onChangeComplete={this.handleColorPicker}
            />
          </Dialog>
        </div>
      )
    }
  }
}

export default observer(Rough)
