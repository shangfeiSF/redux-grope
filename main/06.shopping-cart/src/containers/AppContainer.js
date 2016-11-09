import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import utils from '../utils/index'

import {checkout, addToCart} from '../actions'

import App from '../components/App'

const mapStateToProps = (state) => ({
  shoppingList: utils.shoppingList(state),

  total: utils.total(state),

  products: utils.products(state)
})

const mapDispatchToProps = dispatch => ({
  checkout: bindActionCreators(checkout, dispatch),

  addToCart: bindActionCreators(addToCart, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)