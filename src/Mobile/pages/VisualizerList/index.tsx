import * as React from 'react'
import { Link } from 'react-router-dom'
import range from 'lodash.range'
import { Motion, spring } from 'react-motion'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'

import ToolBar from '../../components/ToolBar'
import HamburgerButton from '../../components/HamburgerButton'
import ListMapping from './ListMapping'

import styles from '../../style'

const reinsert = (arr, from, to) => {
  const _arr = arr.slice(0)
  const val = _arr[from]
  _arr.splice(from, 1)
  _arr.splice(to, 0, val)
  return _arr
}

const clamp = (n, min, max) => {
  return Math.max(Math.min(n, max), min)
}

const springConfig = { stiffness: 300, damping: 50 }
const itemsCount = 4

interface Props {}

// interface States {
//   containerPosition: string
// topDeltaY: number
// mouseY: number
// isPressed: boolean
// originalPosOfLastPressed: number
// order: any
// activeItem: number | undefined
// isSidebarOpen: boolean
// }

class VisualizerList extends React.Component<Props, any> {
  constructor(props) {
    super(props)
    this.state = {
      containerPosition: 'relative',
      topDeltaY: 0,
      mouseY: 0,
      isPressed: false,
      originalPosOfLastPressed: 0,
      order: range(itemsCount),
      activeItem: undefined,
      isSidebarOpen: false
    }
  }

  public componentDidMount() {
    window.addEventListener('touchmove', this.handleTouchMove)
    window.addEventListener('touchend', this.handleMouseUp)
    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('mouseup', this.handleMouseUp)
  }

  public handleTouchStart = (key, pressLocation, e) => {
    !this.state.isPressDisabled &&
      this.handleMouseDown(key, pressLocation, e.touches[0])
  }

  public handleTouchMove = e => {
    e.preventDefault()
    !this.state.isPressDisabled && this.handleMouseMove(e.touches[0])
  }

  public handleMouseDown = (pos, pressY, { pageY }) => {
    !this.state.isPressDisabled &&
      this.setState({
        topDeltaY: pageY - pressY,
        mouseY: pressY,
        isPressed: true,
        originalPosOfLastPressed: pos,
        isPressDisabled: false
      })
  }

  public handleMouseMove = ({ pageY }) => {
    const { isPressed, topDeltaY, order, originalPosOfLastPressed } = this.state

    if (isPressed) {
      const mouseY = pageY - topDeltaY
      const currentRow = clamp(Math.round(mouseY / 100), 0, itemsCount - 1)
      let newOrder = order

      if (currentRow !== order.indexOf(originalPosOfLastPressed)) {
        newOrder = reinsert(
          order,
          order.indexOf(originalPosOfLastPressed),
          currentRow
        )
      }

      this.setState({ mouseY: mouseY, order: newOrder })
    }
  }

  public handleMouseUp = () => {
    this.setState({ isPressed: false, topDeltaY: 0 })
  }

  public onClickItem = (evt, index) => {
    if (this.state.activeItem !== index) {
      this.setState({ activeItem: index, isPressDisabled: true })
    }
  }

  public onBack = () => {
    this.setState({
      activeItem: undefined,
      isPressDisabled: false,
      originalPosOfLastPressed: undefined
    })
  }

  public zIndexCalc = index => {
    let zIndex
    if (index === this.state.originalPosOfLastPressed) {
      zIndex = 99
    } else if (this.state.activeItem === index) {
      zIndex = 200
    } else {
      zIndex = index
    }
    return zIndex
  }

  public calcMouseY = i => {
    if (this.state.activeItem !== undefined) {
      if (
        this.state.order.indexOf(i) >
        this.state.order.indexOf(this.state.activeItem)
      ) {
        return (this.state.order.indexOf(i) + 1) * 300
      } else {
        return (this.state.order.indexOf(i) + 1) * -300
      }
    } else {
      return this.state.order.indexOf(i) * 100
    }
  }

  public toggleSidebar = () => {
    this.setState(prev => ({ isSidebarOpen: !prev.isSidebarOpen }))
  }

  public closeSidebar = () => {
    this.setState({ isSidebarOpen: false })
  }

  public render() {
    const { mouseY, isPressed, originalPosOfLastPressed } = this.state
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          position: this.state.containerPosition
        }}
      >
        {/* <Link
          to="/home"
          onClick={() => this.setState({ containerPosition: 'absolute' })}
        >
          List
        </Link> */}
        <HamburgerButton
          toggle={this.toggleSidebar}
          back={this.onBack}
          isSidebarOpen={this.state.isSidebarOpen}
          isBackwardArrow={this.state.activeItem !== undefined}
        />
        <ToolBar />
        <Drawer
          open={this.state.isSidebarOpen}
          docked={false}
          onRequestChange={this.closeSidebar}
          containerStyle={{ paddingTop: 100 }}
        >
          <Link
            to="/home"
            // onClick={() => this.setState({ containerPosition: 'absolute' })}
          >
            <MenuItem>Menu Item</MenuItem>
          </Link>
          <Link
            to="/loop"
            // onClick={() => this.setState({ containerPosition: 'absolute' })}
          >
            <MenuItem>Menu Item2</MenuItem>
          </Link>
        </Drawer>
        <div
        // style={{
        //   display: 'flex',
        //   flexDirection: 'row',
        //   justifyContent: 'center'
        // }}
        >
          {range(itemsCount).map(i => {
            const style =
              originalPosOfLastPressed === i && isPressed
                ? {
                    scaleX: spring(0.8, springConfig),
                    scaleY: spring(0.2, springConfig),
                    shadow: spring(16, springConfig),
                    y: mouseY
                  }
                : {
                    scaleX: spring(0.7, springConfig),
                    scaleY: spring(0.1, springConfig),
                    shadow: spring(10, springConfig),
                    y: spring(this.calcMouseY(i), springConfig)
                  }
            const onClickStyle = {
              scaleX: spring(1, springConfig),
              scaleY: spring(1, springConfig),
              shadow: spring(16, springConfig),
              y: 0
            }

            return (
              <Motion
                style={this.state.activeItem === i ? onClickStyle : style}
                key={i}
              >
                {({ scaleX, scaleY, shadow, y }) => (
                  <div
                    onClick={evt => this.onClickItem(evt, i)}
                    onMouseDown={this.handleMouseDown.bind(null, i, y)}
                    onTouchStart={this.handleTouchStart.bind(null, i, y)}
                    style={{
                      ...styles.item,
                      boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 *
                        shadow}px 0px`,
                      transform: `translate3d(0, ${y}px, 0) scaleX(${scaleX}) scaleY(${scaleY})`,
                      WebkitTransform: `translate3d(0, ${y}px, 0) scaleX(${scaleX}) scaleY(${scaleY})`,
                      zIndex: this.zIndexCalc(i)
                    }}
                  >
                    {ListMapping(this.state.activeItem === i)[i]}
                  </div>
                )}
              </Motion>
            )
          })}
        </div>
      </div>
    )
  }
}

export default VisualizerList
