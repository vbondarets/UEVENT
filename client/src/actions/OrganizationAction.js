import { getOrganizations } from "../API/OrgSerivce";

export const getAllOrg = () => async(dispatch) => {
    try {
        const {data} = await getOrganizations()
        if (data.length > 0) {
            return dispatch( {type: 'getAllOrganization', payload:data} )
        }
    } catch (error) {
        console.log(error);
    }
}