import  * as products from './products.json'

const shop = {
  getProducts: (callback) => setTimeout(() => {
    callback(products.default)
  },  1000),

  buyProducts: (manifest, callback) => setTimeout(() => {
    let random = Math.random() > 0.5
    let response = {
      status: random ? 200 : 500,
      msg: random? 'Buy Success' : 'Server error'
    }
    callback(response)
  },  1000)
}

export default shop