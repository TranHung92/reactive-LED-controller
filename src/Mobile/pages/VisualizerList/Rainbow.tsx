import * as React from 'react'

import SliderPopover from '../../components/SliderPopover'

import Store from '../../../store'
import { setVar } from '../../../helpers'

interface Props {
  isActive: boolean
}

interface States {}

class Rainbow extends React.Component<Props, States> {
  constructor(props) {
    super(props)
  }

  public componentWillReceiveProps(nextProps) {
    if (
      nextProps.isActive !== this.props.isActive &&
      nextProps.isActive === true
    ) {
      Store.generalVal = '4'
      Store.octaveVal = 'A'
    }
  }

  private onRainbowSpeedChange = (newVal: number): void => {
    Store.var1 = setVar(newVal)
  }

  public render() {
    if (!this.props.isActive) {
      return (
        <div
          style={{ width: '100%', height: '100%', backgroundColor: 'yellow' }}
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
          <SliderPopover
            value={parseInt(Store.var1)}
            onChange={this.onRainbowSpeedChange}
          />
        </div>
      )
    }
  }
}

export default Rainbow
