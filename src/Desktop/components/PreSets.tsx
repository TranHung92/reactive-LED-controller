import * as React from 'react'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'

class PreSets extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      collapse: true
    }
  }

  private handleCollapse = () => {
    this.setState(prev => ({ collapse: !prev.collapse }))
  }

  public render(): JSX.Element {
    return (
      <Paper style={{ margin: 40, height: '100%', flexGrow: 1 }}>
        <div
          style={{
            height: 56,
            backgroundColor: '#e8e8e8',
            display: 'flex',
            justifyContent: 'space-between'
          }}
          onClick={this.handleCollapse}
        >
          <p>PreSets</p>

          <IconButton touch={true}>
            <NavigationExpandMoreIcon />
          </IconButton>
        </div>
        <div
          style={{
            transition: 'max-height 600ms ease-in-out 0ms',
            maxHeight: this.state.collapse ? 500 : 0,
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              // transition: 'max-height 800ms ease-in-out 0ms',
              // maxHeight: this.state.collapse ? 500 : 0,
              overflow: 'hidden'
            }}
          >
            <RadioButtonGroup name="shipSpeed">
              <RadioButton
                style={{ marginBottom: 16 }}
                value="1"
                label="Simple"
              />
              <RadioButton
                style={{ marginBottom: 16 }}
                value="2"
                label="Selected by default"
              />
              <RadioButton
                style={{ marginBottom: 16 }}
                value="3"
                label="Selected by default"
              />
              <RadioButton
                style={{ marginBottom: 16 }}
                value="4"
                label="Selected by default"
              />
              <RadioButton
                style={{ marginBottom: 16 }}
                value="5"
                label="Selected by default"
              />
            </RadioButtonGroup>
          </div>
        </div>
      </Paper>
    )
  }
}

export default PreSets
