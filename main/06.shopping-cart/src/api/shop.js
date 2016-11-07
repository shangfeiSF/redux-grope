const TIMEOUT = 100

import  * as _products from './products.json'

const shop = {
  getProducts: (cb, timeout) => setTimeout(() => cb(_products.default), timeout || TIMEOUT),

  buyProducts: (payload, cb, timeout) => setTimeout(() => cb(), timeout || TIMEOUT)
}

export default shop