const initialState = {
    CommentsOnEvent: [],
    Users: []
}

export const CommentReducer = (comment = initialState, action) => {
    switch (action.type) {
        case 'getCommentsOnEvent':
            return {...comment, CommentsOnEvent: action.payload}
        case 'getAllUsers':
            return {...comment, Users: action.payload}

        case 'createCom':
            return {...comment, CommentsOnEvent: action.payload}
        default:
            return comment;
    }
}