import * as React from 'react'
import { observer } from 'mobx-react'
import { Route, BrowserRouter, Redirect } from 'react-router-dom'
import { spring, AnimatedSwitch } from 'react-router-transition'
import MaterialThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

// import Toolbar from '../components/Mobile/Toolbar'
// import Item from '../components/Mobile/Item'

import Connect from '../components/Mobile/pages/Connect'
import Home from '../components/Mobile/pages/Home'
import VisualizerList from '../components/Mobile/pages/VisualizerList'
import LoopList from '../components/Mobile/pages/LoopList'

import Store from '../store'

const theme = getMuiTheme({
  datePicker: {
    selectTextColor: '#fff'
  }
})

const mapStyles = styles => {
  return {
    opacity: styles.opacity,
    transform: `translateY(${styles.offset}px)`
  }
}

const zoom = val => {
  return spring(val, {
    stiffness: 135,
    damping: 15
  })
}

const switchConfig = {
  atEnter: {
    opacity: 0,
    offset: -50
  },
  atLeave: {
    opacity: 0,
    offset: zoom(50)
  },
  atActive: {
    opacity: 1,
    offset: zoom(0)
  }
}

class Mobile extends React.Component<any, any> {
  constructor(props) {
    super(props)
  }

  public render() {
    return (
      <MaterialThemeProvider muiTheme={theme}>
        <BrowserRouter>
          <AnimatedSwitch
            {...switchConfig}
            mapStyles={mapStyles}
            className="route-wrapper"
          >
            <Route
              exact
              path="/"
              render={() =>
                Store.isConnected ? <Redirect to="/home" /> : <Connect />
              }
            />
            <Route path="/home" component={Home} />
            <Route path="/visualizer" component={VisualizerList} />
            <Route path="/loop" component={LoopList} />
          </AnimatedSwitch>
        </BrowserRouter>
      </MaterialThemeProvider>
    )
  }
}

export default observer(Mobile)
