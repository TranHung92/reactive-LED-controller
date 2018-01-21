import * as React from 'react'
import Paper from 'material-ui/Paper'

const Item = () => {
  return (
    <Paper
      style={{
        margin: 20,
        height: 120,
        background:
          'linear-gradient(70deg, #fff810  30%, rgba(0,0,0,0) 30%), linear-gradient(30deg, #63e89e 60%, #ff7ee3 60%)'
      }}
    >
      <div>This is Multi-color BG </div>
    </Paper>
  )
}

export default Item
