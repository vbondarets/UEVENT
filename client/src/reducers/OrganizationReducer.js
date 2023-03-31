const initialState = {
    allOrganization: []
}

export const OrganizationReducer = (organization = initialState, action) => {
    switch (action.type) {
        case 'getAllOrganization':
            return {...organization, allOrganization: action.payload}

        default:
            return organization;
    }
}
