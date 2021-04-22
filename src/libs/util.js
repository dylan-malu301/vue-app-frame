// Gzip解压 压缩工具
import pako from 'pako'

// Gzip 解压
export const unzip = (b64Data) => {
  let strData = atob(b64Data)
  const charData = strData.split('').map((x) => x.charCodeAt(0))
  const binData = new Uint8Array(charData)
  const data = pako.inflate(binData)
  strData = Utf8ArrayToStr(data)
  return strData
}
/**
 * utf-8 Array 转化字符串
 * @param array Utf8Array
 * @returns {string}
 * @constructor
 */
export const Utf8ArrayToStr = function (array) {
  const len = array.length
  let out = ''
  let i = 0
  let char1, char2, char3, char4
  while (i < len) {
    char1 = array[i++]
    // 当单个字节时, 最大值 '01111111', 最小值 '00000000' 右移四位 07, 00
    // 当两个字节时, 最大值 '11011111', 最小值 '11000000' 右移四位 13, 12
    // 当三个字节时, 最大值 '11101111', 最小值 '11100000' 右移四位 14, 14
    if (char1 >> 4 <= 7) {
      out += String.fromCharCode(char1)
    } else if (char1 >> 4 === 12 || char1 >> 4 === 13) {
      char2 = array[i++]
      out += String.fromCharCode(((char1 & 0x1F) << 6) | (char2 & 0x3F))
    } else if (char1 >> 4 === 14) {
      char2 = array[i++]
      char3 = array[i++]
      char4 = ((char1 & 0x0F) << 12) | ((char2 & 0x3F) << 6)
      out += String.fromCharCode(char4 | ((char3 & 0x3F) << 0))
    }
  }
  return out
}
// Gzip 压缩
export const zip = (str) => {
  const binaryString = pako.gzip(str, { to: 'string' })
  return btoa(binaryString)
}

export const TOKEN_KEY = '_Token'

export const setToken = (token) => {
  sessionSave(TOKEN_KEY, token)
}

export const getToken = () => {
  const token = sessionRead(TOKEN_KEY)
  if (token) {
    return token
  } else {
    return false
  }
}

// 判断是否为ios端访问
export const isIos = () => {
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    return true
  } else {
    return false
  }
}

// 判断是否为android端访问
export const isAndroid = () => {
  if (/(Android|Adr)/i.test(navigator.userAgent)) {
    return true
  } else {
    return false
  }
}

/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = url => {
  const keyValueArr = url.split('?')[1].split('&')
  let paramObj = {}
  keyValueArr.forEach(item => {
    const keyValue = item.split('=')
    paramObj[keyValue[0]] = keyValue[1]
  })
  return paramObj
}

export const localSave = (key, value) => {
  localStorage.setItem(key, value)
}

export const localRead = (key) => {
  return localStorage.getItem(key) || ''
}

export const localClear = () => {
  localStorage.clear()
}

export const localRemove = (key) => {
  localStorage.removeItem(key)
}

export const sessionSave = (key, value) => {
  window.sessionStorage.setItem(key, value)
}

export const sessionRead = (key) => {
  return sessionStorage.getItem(key) || ''
}

export const sessionClear = () => {
  window.sessionStorage.clear()
}

export const sessionRemove = (key) => {
  window.sessionStorage.removeItem(key)
}

/**
 * @param {Number} num 数值
 * @returns {String} 处理后的字符串
 * @description 如果传入的数值小于10，即位数只有1位，则在前面补充0
 */
const getHandledValue = num => {
  return num < 10 ? '0' + num : num
}

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} startType 要返回的时间字符串的格式类型，传入'year'则返回年开头的完整时间
 */
export const getDate = (timeStamp, startType) => {
  const d = new Date(timeStamp)
  const year = d.getFullYear()
  const month = getHandledValue(d.getMonth() + 1)
  const date = getHandledValue(d.getDate())
  const hours = getHandledValue(d.getHours())
  const minutes = getHandledValue(d.getMinutes())
  const second = getHandledValue(d.getSeconds())
  let resStr = ''
  if (startType === 'year') {
    resStr = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + second
  } if (startType === 'hours') {
    resStr = year + '-' + month + '-' + date + '-' + hours
  } else {
    resStr = month + '-' + date + ' ' + hours + ':' + minutes
  }
  return resStr
}

/**
 * @description 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表示立即执行 false 表示非立即执行
 */
export const debounce = (func, wait, immediate = true) => {
  let timeout
  return function () {
    let context = this
    let args = arguments

    if (timeout) clearTimeout(timeout)
    if (immediate) {
      var callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if (callNow) func.apply(context, args)
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args)
      }, wait)
    }
  }
}
