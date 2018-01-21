import * as React from 'react'
import MaterialThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import Toolbar from '../components/Mobile/Toolbar'
import Item from '../components/Mobile/Item'

const theme = getMuiTheme({
  datePicker: {
    selectTextColor: '#fff'
  }
})

class Mobile extends React.Component<any, any> {
  constructor(props) {
    super(props)
  }

  public render() {
    return (
      <MaterialThemeProvider muiTheme={theme}>
        <Toolbar />
        <Item />
      </MaterialThemeProvider>
    )
  }
}

export default Mobile
