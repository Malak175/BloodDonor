import { publicRequest } from '../requestMethod';
import { 
    loginSuccess,
    loginStart,
    loginFailure,
    registerStart,
    registerSuccess,
    registerFailure
} from './userRedux';

export const login = async (dispatch, userCredentials, navigate) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("http://localhost:8000/api/auth/login", userCredentials);
    dispatch(loginSuccess(res.data));
    
    // السطر السحري اللي هيحل كل المشاكل
    navigate("/admin", { replace: true });
    
  } catch (err) {
    dispatch(loginFailure(err.response?.data?.message || "Login failed"));
  }
};




export const register = async (dispatch, user) => {
    dispatch(registerStart());
    try {
        const res = await publicRequest.post("http://localhost:8000/api/auth/register", user);
        dispatch(registerSuccess(res.data));
    } catch (err) {
        dispatch(registerFailure());
    }
};
