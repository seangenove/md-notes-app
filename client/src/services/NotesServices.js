import Endpoints from "../config/Endpoints";
import { AppApiRequest } from "./index";

export const fetchAllNotes = (onSuccess, onFailure) => {
    AppApiRequest(Endpoints.NOTES, 'GET', onSuccess, onFailure);
};

export const fetchNote = (id, onSuccess, onFailure) => {
    AppApiRequest(`${Endpoints.NOTES}/${id}`, 'GET', onSuccess, onFailure);
};

export const upsertNote = (data, onSuccess, onFailure) => {
    AppApiRequest(Endpoints.UPSERT_NOTE, 'POST', onSuccess, onFailure, data);
};

export const deleteNote = (id, onSuccess, onFailure) => {
    AppApiRequest(`${Endpoints.DELETE_NOTE}/${id}`, 'POST', onSuccess, onFailure);
};
