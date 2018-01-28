import { observable } from 'mobx'

export class Store {
  @observable public connection: WebSocket
  @observable public isConnected: boolean = false
  @observable public isLoading: boolean = false
  @observable public ip: string = 'ws://192.168.1.132:81/'
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
    }
  }
  @observable public var1 = '050'
  @observable public var2 = '050'

  public connect = ip => {
    try {
      this.connection = new WebSocket(ip, ['arduino'])
      this.isLoading = true
      this.connection.onopen = () => {
        this.isConnected = true
        this.isLoading = false
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
    let bigString2Send = ''
    let octaveValTmp = this.octaveVal
    if (octaveValTmp != 'A') {
      octaveValTmp = (7 - parseInt(octaveValTmp)).toString()
    }
    bigString2Send = bigString2Send.concat(
      this.generalVal,
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
    if (bigString2Send !== '') {
      console.log('dataSending', bigString2Send)
      this.connection.send('1A000000230249000000240000000072050')
    }
  }
}

const singleton = new Store()
export default singleton
