export const setVar = (value: number): string => {
  if (value < 100 && value >= 10) {
    return '0' + value
  } else if (value < 10) {
    return '00' + value
  } else {
    return value.toString()
  }
}

export const hexToRgb = hex => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        red: setVar(parseInt(result[1], 16)),
        green: setVar(parseInt(result[2], 16)),
        blue: setVar(parseInt(result[3], 16))
      }
    : null
}
