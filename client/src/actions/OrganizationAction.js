import { getOrganizations } from "../API/OgrSerivce";

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