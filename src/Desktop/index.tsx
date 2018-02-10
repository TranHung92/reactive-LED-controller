import * as React from 'react'
// import { Provider } from 'mobx-react'
import MaterialThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import '../App.css'
import Appbar from './components/Appbar'
import WebsocketAddress from './components/WebsocketAddress'
import PreSets from './components/PreSets'
import Manual from './components/Manual'

import Store from '../store'

const theme = getMuiTheme({
  datePicker: {
    selectTextColor: '#fff'
  }
})

class Desktop extends React.Component<any, any> {
  private store
  constructor(props) {
    super(props)
  }

  public componentDidMount() {
    this.store = Store
  }
  render() {
    return (
      <MaterialThemeProvider muiTheme={theme}>
        <div>
          <div>
            <Appbar />
          </div>
          <WebsocketAddress />
          <div style={{ display: 'flex', flex: '1 1 auto' }}>
            <PreSets />
            <Manual />
          </div>
        </div>
      </MaterialThemeProvider>
    )
  }
}

export default Desktop
