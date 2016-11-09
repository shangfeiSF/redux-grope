import utils from '../../../../main/06.shopping-cart/src/utils/index'

describe('Utils', () => {
  it('total should calculate the correct total price', () => {
    let state = {
      cart: {
        addedIds: [1, 2, 3],
        quantityById: {
          1: 5,
          2: 6,
          3: 7
        }
      },
      products: {
        details: {
          1: {
            price: 10.1
          },
          2: {
            price: 9.5
          },
          3: {
            price: 5.8
          }
        }
      }
    }
    let expectedValue = '148.10'

    expect(utils.total(state))
      .toEqual(expectedValue)
  })

  it('shoppingList should return the detail and quantity', () => {
    let state = {
      cart: {
        addedIds: [1, 2, 3],
        quantityById: {
          1: 1,
          2: 3,
          3: 4
        }
      },
      products: {
        details: {
          1: {
            id: 1,
            title: "iPad 4 Mini",
            price: 599.00,
            inventory: 2
          },
          2: {
            id: 2,
            title: "H&M T-Shirt White",
            price: 10.99,
            inventory: 5
          },
          3: {
            id: 3,
            title: "Charli XCX-Sucker CD",
            price: 19.99,
            inventory: 8
          }
        }
      }
    }
    let expectedValue = [
      {
        id: 1,
        title: "iPad 4 Mini",
        price: 599.00,
        inventory: 2,
        quantity: 1
      },
      {
        id: 2,
        title: "H&M T-Shirt White",
        price: 10.99,
        inventory: 5,
        quantity: 3
      },
      {
        id: 3,
        title: "Charli XCX-Sucker CD",
        price: 19.99,
        inventory: 8,
        quantity: 4
      }
    ]

    expect(utils.shoppingList(state))
      .toEqual(expectedValue)
  })

  it('products should return the detail', () => {
    let state = {
      cart: {
        addedIds: [1, 2, 3],
        quantityById: {
          1: 1,
          2: 3,
          3: 4
        }
      },
      products: {
        details: {
          1: {
            id: 1,
            title: "iPad 4 Mini",
            price: 599.00,
            inventory: 2
          },
          2: {
            id: 2,
            title: "H&M T-Shirt White",
            price: 10.99,
            inventory: 5
          },
          3: {
            id: 3,
            title: "Charli XCX-Sucker CD",
            price: 19.99,
            inventory: 8
          }
        },

        visibleIds: [2, 3]
      }
    }
    let expectedValue = [
      {
        id: 2,
        title: "H&M T-Shirt White",
        price: 10.99,
        inventory: 5
      },
      {
        id: 3,
        title: "Charli XCX-Sucker CD",
        price: 19.99,
        inventory: 8
      }
    ]

    expect(utils.products(state))
      .toEqual(expectedValue)
  })
})