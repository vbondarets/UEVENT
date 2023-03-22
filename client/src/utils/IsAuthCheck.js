import jwtDecode from "jwt-decode"
import { useDispatch} from "react-redux";

export const IsAuthCheck = () => {
    
    const dispatch = useDispatch();
    if(localStorage.getItem("token")){
        const user = jwtDecode(localStorage.getItem("token"));
        console.log(user);
        dispatch({type: "LOGIN", payload: user});
        // console.log(localStorage.getItem("token"));
    }
    else{
        return;
    }
}