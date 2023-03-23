const initialState = {
    allTypes:[]
}

export const TypeReducer = (types = initialState, action) => {
    switch (action.type) {
        case "allTypes":
            return {...types, allTypes: action.payload}    

        default:
            return types;
    }
} 