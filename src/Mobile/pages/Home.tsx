import * as React from 'react'
import ReactSwipe from 'react-swipe'
import { Link } from 'react-router-dom'

import Store from '../../store'

interface Props {}

interface States {
  itemStyle: { [index: number]: React.CSSProperties }
  containerPosition: string
}

class Home extends React.Component<Props, States> {
  private itemDefaultStyle = {
    transition: 'all 0.3s',
    transform: 'translateX(15px)'
  }

  private itemEnterStyle = {
    0: {
      transition: 'all 0.3s',
      transform: 'translateX(-600px)'
    },
    1: {
      transition: 'all 0.3s',
      transform: 'translateX(600px)'
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      itemStyle: {
        0:
          Store.activeSlide === 0
            ? this.itemDefaultStyle
            : this.itemEnterStyle[0],
        1:
          Store.activeSlide === 1
            ? this.itemDefaultStyle
            : this.itemEnterStyle[1]
      },
      containerPosition: 'absolute'
    }
  }

  public onSwipe = percent => {
    const xAxis = 15 - 600 * percent

    this.setState({
      itemStyle: {
        ...this.state.itemStyle,
        [Store.activeSlide]: {
          transition: 'none',
          transform: `translateX(${xAxis}px)`
        }
      }
    })
  }

  public onCallback = activeItem => {
    const other = activeItem === 0 ? 1 : 0
    Store.activeSlide = activeItem
    this.setState({
      itemStyle: {
        [activeItem]: this.itemDefaultStyle,
        [other]: this.itemEnterStyle[other]
      }
    })
  }

  public onTouchEnd = index => {
    if (
      Store.activeSlide === index &&
      this.state.itemStyle[index] !== this.itemDefaultStyle
    ) {
      this.setState({
        itemStyle: {
          ...this.state.itemStyle,
          [Store.activeSlide]: this.itemDefaultStyle
        }
      })
    }
  }

  public render() {
    return (
      <ReactSwipe
        swipeOptions={{
          startSlide: Store.activeSlide,
          continuous: false,
          swiping: this.onSwipe,
          callback: this.onCallback
        }}
        ref="swipeHome"
        style={{
          container: {
            overflow: 'hidden',
            visibility: 'hidden',
            position: this.state.containerPosition
          },

          wrapper: {
            overflow: 'hidden',
            position: 'relative'
          },

          child: {
            float: 'left',
            width: '100%',
            position: 'relative',
            transitionProperty: 'transform'
          }
        }}
      >
        <Link
          to="/visualizer"
          onClick={() => this.setState({ containerPosition: 'absolute' })}
        >
          <div
            onTouchEnd={() => this.onTouchEnd(0)}
            style={{
              width: '100vw',
              height: '100vh',
              background: 'linear-gradient(to bottom, #da4453, #89216b)',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <div
              style={{
                backgroundColor: 'white',
                backgroundSize: 'cover',
                width: '100vw',
                height: '56.25vw'
              }}
            >
              <h1>Visualier</h1>
              <div
                style={{
                  width: '50vw',
                  height: '40vw',
                  backgroundColor: 'blue',
                  position: 'relative',
                  ...this.state.itemStyle[0]
                }}
              >
                slider
              </div>
            </div>
          </div>
        </Link>
        <Link
          to="/loop"
          onClick={() => this.setState({ containerPosition: 'absolute' })}
        >
          <div
            onTouchEnd={() => this.onTouchEnd(1)}
            style={{
              width: '100vw',
              height: '100vh',
              background: 'linear-gradient(to bottom, #da4453, #89216b)',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <div
              style={{
                backgroundColor: 'white',
                backgroundSize: 'cover',
                width: '100vw',
                height: '56.25vw'
              }}
            >
              <h1>LOOP</h1>
              <div
                style={{
                  width: '50vw',
                  height: '40vw',
                  backgroundColor: 'blue',
                  position: 'relative',
                  ...this.state.itemStyle[1]
                }}
              >
                slider
              </div>
            </div>
          </div>
        </Link>
      </ReactSwipe>
    )
  }
}

export default Home
