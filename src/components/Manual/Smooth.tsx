import * as React from 'react'
import { observer } from 'mobx-react'

import { CirclePicker } from 'react-color'

import Slider from 'material-ui/Slider'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import Store from '../../store'

class Smooth extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      octave: 0,
      midOctave: 0,
      octaveError: '',
      midOctaveError: '',
      currentColor: undefined
    }
  }

  private handleOpen = (colorNumber: string) => {
    this.setState({ open: true, currentColor: colorNumber })
  }

  private handleClose = () => {
    this.setState({ open: false })
  }

  private onMidOctaveChange = (e, newVal) => {
    if (newVal >= 0 && newVal <= 100) {
      this.setState({ midOctave: newVal, midOctaveError: '' })
    } else {
      this.setState({
        midOctave: newVal,
        midOctaveError: 'Enter a number between 0-100'
      })
    }
  }

  private handleColorPicker = color => {
    Store.color = {
      ...Store.color,
      [this.state.currentColor]: color.rgb
    }
  }

  private onOctaveChange = (e, newVal) => {
    if (newVal >= 0 && newVal <= 7) {
      Store.octaveVal = newVal
      this.setState({ octave: newVal, octaveError: '' })
    } else {
      this.setState({
        octaveError: 'Enter a number between 0-7'
      })
    }
  }

  public rgbaToString = (rgba): string => {
    return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`
  }

  public render(): JSX.Element {
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />
    ]

    return (
      <div style={{ padding: 20, display: 'flex' }}>
        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 2 }}>
          <RaisedButton
            backgroundColor={this.rgbaToString(Store.color['1'])}
            label="Color 1"
            onClick={() => this.handleOpen('1')}
          />
          <RaisedButton
            backgroundColor={this.rgbaToString(Store.color['2'])}
            label="Color 2"
            onClick={() => this.handleOpen('2')}
          />
          <RaisedButton
            backgroundColor={this.rgbaToString(Store.color['3'])}
            label="Color 3"
            onClick={() => this.handleOpen('3')}
          />
        </div>
        <div style={{ display: 'flex', flexGrow: 1 }}>
          <div>
            <Slider
              style={{ height: 200 }}
              min={0}
              max={7}
              step={1}
              axis="y"
              onChange={this.onOctaveChange}
              value={this.state.octave}
            />
            <TextField
              type="number"
              style={{ width: 50 }}
              defaultValue={Store.octaveVal}
              value={Store.octaveVal}
              errorText={this.state.octaveError}
              onChange={this.onOctaveChange}
            />
            <p>Octave (0-All)</p>
          </div>
          <div>
            <Slider
              min={0}
              max={100}
              step={1}
              axis="y"
              onChange={this.onMidOctaveChange}
              value={this.state.midOctave}
              style={{ height: 200 }}
            />
            <TextField
              type="number"
              style={{ width: 50 }}
              defaultValue={this.state.midOctave}
              value={this.state.midOctave}
              errorText={this.state.midOctaveError}
              onChange={this.onMidOctaveChange}
            />
            <p>Mid-Octave1 (%)</p>
          </div>
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

export default observer(Smooth)
