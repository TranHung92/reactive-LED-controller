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
      <div style={{ padding: 20 }}>
        <div style={{ display: 'flex' }}>
          <p>Octave (0-All)</p>
          <TextField
            type="number"
            defaultValue={Store.octaveVal}
            value={Store.octaveVal}
            errorText={this.state.octaveError}
            onChange={this.onOctaveChange}
          />
          <Slider
            style={{ width: 400 }}
            min={0}
            max={7}
            step={1}
            onChange={this.onOctaveChange}
            value={this.state.octave}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
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
        <div style={{ display: 'flex' }}>
          <p>Mid-Octave1 (%)</p>
          <TextField
            type="number"
            defaultValue={this.state.midOctave}
            value={this.state.midOctave}
            errorText={this.state.midOctaveError}
            onChange={this.onMidOctaveChange}
          />
          <Slider
            min={0}
            max={100}
            step={1}
            onChange={this.onMidOctaveChange}
            value={this.state.midOctave}
            style={{ width: 400 }}
          />
          <p>{Store.ip}</p>
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
