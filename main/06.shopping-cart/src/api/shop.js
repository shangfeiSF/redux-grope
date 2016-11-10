import  * as products from './products.json'

const shop = {
  getProducts: () => new Promise((resolve, reject) => {
    process.nextTick(
      () => products.default.length ?
        resolve({
          products: products.default,
          error: null
        }) :
        reject({
          products: [],
          error: 'none products'
        })
    )
  }),

  buyProducts: (manifest) => new Promise((resolve, reject) => {
    let random = Math.random() > 0.5
    let response = {
      status: random ? 200 : 500,
      msg: random ? 'Buy Success' : 'Server error'
    }

    process.nextTick(
      () => random ?
        resolve(response) :
        reject(response)
    )
  })
}

export default shop