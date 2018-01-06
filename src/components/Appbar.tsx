import * as React from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import FlatButton from 'material-ui/FlatButton'

class TweakAppBar extends React.Component<any, any> {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <AppBar
          title={<span>Amazing Light Show 🙈🙉🙊</span>}
          iconElementLeft={
            <IconButton>
              <NavigationClose />
            </IconButton>
          }
          iconElementRight={<FlatButton label="Save" />}
        />
      </div>
    )
  }
}

export default TweakAppBar
