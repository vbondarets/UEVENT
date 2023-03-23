import { getAllTypes } from "../API/TypeApi";


export const getTypes = () => async(dispatch) => {
    try {
        const {data} = await getAllTypes()
        if (data.length > 0) {
            return dispatch( { type: 'allTypes', payload: data})   
        }
    } catch (error) {
        console.log(error);
    }
}