import { call, takeLatest, put } from "@redux-saga/core/effects";
import { SetApplications, SetSearchApplication } from "./actionCreators";
import { applicationsApi } from "../../../utils/api/applicationsApi";
import {LogOffAc} from './../../ducks/user/actionCreators.js';

export function* fetchApplicationsRequest({page}) {
    try {
        const items = yield call(applicationsApi.fetchApplicationsApi, page);
        yield put(SetApplications(items.content));
    }
    catch (error) {
        console.log('FETCH_APPLICATIONS', error)
        if (error.response) {
            if (error.response.status === 500) {
                yield put(LogOffAc());
            }
        }
    }
}
export function* applicationsSaga() {
    yield takeLatest('FETCH_APPLICATIONS', fetchApplicationsRequest);
}

export function* fetchSearchRequest({searchName, searchEmail, searchTel}) {
    try {
        const items = yield call(applicationsApi.searchApplicationsApi, searchName, searchEmail, searchTel);
        console.log('fetchSearchRequest',items)
        yield put(SetSearchApplication(items.content.items));
    }
    catch (error) {
        console.log('SET_SEARCH_APPLICATION', error)
        if (error.response) {
            if (error.response.status === 500) {
                yield put(LogOffAc())
            }
        }
    }
}
export function* searchApplicationsSaga() {
    yield takeLatest('GET_SEARCH_APPLICATION', fetchSearchRequest);
}
