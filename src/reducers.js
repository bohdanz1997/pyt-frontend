export const rootReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        user: {
          id: action.payload.userId,
        },
      }
    case 'UPDATE_USER':
      return {
        user: {
          id: state.user.id,
          name: action.payload.userName,
        },
      }
    default:
      return {}
  }
}
