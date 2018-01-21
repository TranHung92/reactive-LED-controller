import * as React from 'react'
import AppBar from 'material-ui/AppBar'

class Toolbar extends React.Component<any, any> {
  constructor(props) {
    super(props)
  }

  public render() {
    return (
      <div>
        <AppBar
          title="Title"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
      </div>
    )
  }
}

export default Toolbar
