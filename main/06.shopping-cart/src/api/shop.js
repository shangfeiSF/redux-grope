const TIMEOUT = 100

import  * as _products from './products.json'

const shop = {
  getProducts: (cb, timeout) => setTimeout(() => {
    console.warn(JSON.stringify(_products))

    cb(_products.default)
  }, timeout || TIMEOUT),

  buyProducts: (payload, cb, timeout) => setTimeout(() => {
    console.warn(JSON.stringify(payload))

    cb(payload)
  }, timeout || TIMEOUT)
}

export default shop