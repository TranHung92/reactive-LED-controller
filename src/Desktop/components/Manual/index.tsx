import * as React from 'react'
import Paper from 'material-ui/Paper'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import { Tabs, Tab } from 'material-ui/Tabs'
import SwipeableViews from 'react-swipeable-views'

import Smooth from './Smooth'
import Rough from './Rough'

class Manual extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      slideIndex: 0,
      open: false,
      color: '#d7384a'
    }
  }

  private handleChange = value => {
    this.setState({
      slideIndex: value
    })
  }

  public render(): JSX.Element {
    return (
      <Paper style={{ margin: 40, flexGrow: 1 }}>
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <ToolbarTitle text="Manual" />
          </ToolbarGroup>
          <ToolbarGroup>
            <IconButton touch={true}>
              <NavigationExpandMoreIcon />
            </IconButton>
          </ToolbarGroup>
        </Toolbar>
        <div>
          <Tabs onChange={this.handleChange} value={this.state.slideIndex}>
            <Tab label="Smooth" value={0} />
            <Tab label="Rough" value={1} />
            <Tab label="Top" value={2} />
          </Tabs>
          <Tabs onChange={this.handleChange} value={this.state.slideIndex}>
            <Tab label="Rainbow" value={3} />
            <Tab label="Config 1" value={4} />
            <Tab label="Config 2" value={5} />
          </Tabs>

          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleChange}
          >
            <div>
              <Smooth />
            </div>
            <div>
              <Rough />
            </div>
            <div>slide n°3</div>
            <div>Rainbow</div>
            <div>Config</div>
            <div>Config</div>
          </SwipeableViews>
        </div>
      </Paper>
    )
  }
}

export default Manual
