/*
* 加密算法公用方法
* */
'use strict'
import CryptoJs from 'crypto-js' // aes 加密
import $jsEncrypt from 'jsencrypt' // rsa 加密
class Encrypt {
  constructor () {
    // 公钥
    this.pubKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDn1obzUZPUqUcLIkJrXdBvRT4lhEbp1toLdTwua2zH+cMZX5aAkbK7wcrf4DRDHwq4VDtoEP4afAYD+Saw7bDu3XFf5gJwguW+acSXgtsxcuIcfF7aXvnFgdDWkqnD69jHRBXfrVOyiWGIs5wDmjbZcmoh7nP0z+d8dezuRbL5kQIDAQAB'
    // key 基础字段
    this.rootStr = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    this.rndNum = 0
  };
  // 生成指定位数key
  rndStr (len) {
    let resultStr = ''
    for (let i = 0; i < len; i++) {
      this.rndNum = parseInt(Math.random() * 62, 10)
      resultStr += this.rootStr.substring(this.rndNum, (this.rndNum + 1))
    }
    return resultStr.substring(0, len)
  };
  // RSA加密
  keyJsencrypt (str) {
    // RSA加密
    let crypt = new $jsEncrypt.JSEncrypt()
    // 设置公钥
    crypt.setKey(this.pubKey)
    let enc = crypt.encrypt(encodeURIComponent(str))
    return enc
  };
  // AES 加密
  encrypt (word, key) {
    const aeskey = CryptoJs.enc.Utf8.parse(key)
    const srcs = CryptoJs.enc.Utf8.parse(word)
    const encrypted = CryptoJs.AES.encrypt(srcs, aeskey, { mode: CryptoJs.mode.ECB })
    return encrypted.toString()
  };
  // AES 解密
  decrypt (word, key) {
    let aeskey = CryptoJs.enc.Utf8.parse(key)
    let decrypt = CryptoJs.AES.decrypt(word, aeskey, { mode: CryptoJs.mode.ECB })
    return CryptoJs.enc.Utf8.stringify(decrypt).toString()
  }
}
export default Encrypt
