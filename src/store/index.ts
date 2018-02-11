import { observable, autorun } from 'mobx'

import { PatternStorage } from './interfaces'

export class Store {
  @observable public connection: WebSocket
  @observable public isConnected: boolean = false
  @observable public isLoading: boolean = false
  @observable public ip: string | null = '' //ws://192.168.1.132:81/
  @observable public activeSlide: number = 0
  @observable public generalVal: string = '1'
  @observable public octaveVal: string = 'A'
  @observable
  public color = {
    '1': {
      r: '156',
      g: '39',
      b: '176',
      a: '1'
    },
    '2': {
      r: '255',
      g: '255',
      b: '000',
      a: '1'
    },
    '3': {
      r: '255',
      g: '000',
      b: '000',
      a: '1'
    },
    '4': {
      r: '255',
      g: '000',
      b: '000',
      a: '1'
    }
  }
  @observable public var1 = '050'
  @observable public var2 = '050'

  private bigString2Send: string = ''
  private patternStorage: PatternStorage = {
    1: [],
    2: []
  }
  public currentPatternMain: string = ''
  public currentPatternTop: string = ''

  constructor() {
    this.getSocketIp()
    const pattern = localStorage.getItem('hobbithobby-pattern')
    if (pattern) {
      this.patternStorage = JSON.parse(pattern)
    }

    this.currentPatternTop = '3'.concat(
      this.octaveVal,
      this.color['4'].r,
      this.color['4'].g,
      this.color['4'].b,
      this.color['2'].r,
      this.color['2'].g,
      this.color['2'].b,
      this.color['3'].r,
      this.color['3'].g,
      this.color['3'].b,
      this.var1,
      this.var2
    )

    this.currentPatternMain = this.generalVal.concat(
      this.octaveVal,
      this.color['1'].r,
      this.color['1'].g,
      this.color['1'].b,
      this.color['2'].r,
      this.color['2'].g,
      this.color['2'].b,
      this.color['3'].r,
      this.color['3'].g,
      this.color['3'].b,
      this.var1,
      this.var2
    )

    autorun(() => {
      // if (this.connection.readyState !== 0) {
      //   await this.getSocketIp()
      //   console.log('this.ip', this.ip)
      // }
      // console.log('this.connection.readyState', this.connection.readyState)

      this.sendPattern()
      if (this.generalVal === '3') {
        localStorage.setItem(
          'hobbithobby-currentPatternTop',
          this.bigString2Send
        )
        this.currentPatternTop = this.bigString2Send
      } else {
        localStorage.setItem(
          'hobbithobby-currentPatternMain',
          this.bigString2Send
        )
        this.currentPatternMain = this.bigString2Send
      }
    })
  }

  public getSocketIp = () => {
    this.ip = localStorage.getItem('hobbithobby-socketIp')
    if (this.ip) {
      this.connect(this.ip)
    }
  }

  public connect = ip => {
    try {
      this.connection = new WebSocket(ip, ['arduino'])
      this.isLoading = true
      this.connection.onopen = () => {
        this.isConnected = true
        this.isLoading = false
        const storageIp = localStorage.getItem('hobbithobby-socketIp')
        if (storageIp !== ip) {
          localStorage.setItem('hobbithobby-socketIp', ip)
        }
        console.log('Connect successfully')
      }

      this.connection.onclose = () => {
        this.isLoading = false
        console.log('Disconnected')
      }

      this.connection.onmessage = evt => {
        this.bigString2Vars(evt.data)
      }
    } catch (err) {
      this.isConnected = false
      console.error('errorr', err.message)
    }
    console.log('this.connection', this.connection)
  }

  public bigString2Vars = bigString => {
    this.generalVal = bigString.substring(0, 1)
    this.octaveVal = bigString.substring(1, 2)
    this.color['1'].r = bigString.substring(2, 5)
    this.color['1'].g = bigString.substring(5, 8)
    this.color['1'].b = bigString.substring(8, 11)
    this.color['2'].r = bigString.substring(11, 14)
    this.color['2'].g = bigString.substring(14, 17)
    this.color['2'].b = bigString.substring(17, 20)
    this.color['3'].r = bigString.substring(20, 23)
    this.color['3'].g = bigString.substring(23, 26)
    this.color['3'].b = bigString.substring(26, 29)
    this.var1 = bigString.substring(29, 32)
    this.var2 = bigString.substring(32, 35)
  }

  public sendPattern = () => {
    let octaveValTmp = this.octaveVal
    if (octaveValTmp != 'A') {
      octaveValTmp = (7 - parseInt(octaveValTmp)).toString()
    }

    if (this.generalVal === '3') {
      this.bigString2Send = this.generalVal.concat(
        this.octaveVal,
        this.color['4'].r,
        this.color['4'].g,
        this.color['4'].b,
        this.color['2'].r,
        this.color['2'].g,
        this.color['2'].b,
        this.color['3'].r,
        this.color['3'].g,
        this.color['3'].b,
        this.var1,
        this.var2
      )
    } else {
      this.bigString2Send = this.generalVal.concat(
        this.octaveVal,
        this.color['1'].r,
        this.color['1'].g,
        this.color['1'].b,
        this.color['2'].r,
        this.color['2'].g,
        this.color['2'].b,
        this.color['3'].r,
        this.color['3'].g,
        this.color['3'].b,
        this.var1,
        this.var2
      )
    }
    if (this.bigString2Send !== '') {
      console.log('dataSending', this.bigString2Send)
      this.connection.send(this.bigString2Send)
    }
  }

  public checkExistingPattern = (mode: number) => {
    return this.patternStorage[mode].some(
      item =>
        item.main === this.currentPatternMain &&
        item.top === this.currentPatternTop
    )
  }

  public savePattern = (mode: number) => {
    if (!this.checkExistingPattern(1)) {
      this.patternStorage = {
        ...this.patternStorage,
        [mode]: [
          ...this.patternStorage[mode],
          {
            main: this.currentPatternMain,
            top: this.currentPatternTop
          }
        ]
      }
      localStorage.setItem(
        'hobbithobby-pattern',
        JSON.stringify(this.patternStorage)
      )
    } else {
      console.log('already saved***************')
    }
  }
}

const singleton = new Store()
export default singleton
