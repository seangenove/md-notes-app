import Endpoints from "../config/Endpoints";
import { AppApiRequest } from "./index";

export const register = (data, onSuccess, onFailure) => {
    AppApiRequest(Endpoints.REGISTER, 'POST', onSuccess, onFailure, data);
};

export const login = (data, onSuccess, onFailure) => {
    AppApiRequest(Endpoints.LOGIN, 'POST', onSuccess, onFailure, data);
};
