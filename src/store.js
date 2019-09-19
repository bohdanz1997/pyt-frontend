import { createStore, applyMiddleware, compose } from 'redux'
import { rootReducer } from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const configureStore = ({ initialState = {} } = {}) => {
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...[])),
  )

  store.dispatch({
    type: 'ADD_USER',
    payload: { userId: 10 },
  })

  store.dispatch({
    type: 'UPDATE_USER',
    payload: { userName: 'Bogan' },
  })

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const next = require('./reducers')

      store.replaceReducer(next.rootReducer)
    })
  }

  return store
}
