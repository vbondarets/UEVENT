const globalStore = {
    status: false,
    user: {}
}
export const AuthReducer = (state = globalStore, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, status: true, user: action.payload }
        case "LOGOUT":
            return { ...state, status: false, user: action.payload }
        default:
            return state
    }
}