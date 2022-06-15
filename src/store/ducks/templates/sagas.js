import { call, takeLatest, put } from "@redux-saga/core/effects";
import { SetTemplates, SetSearch } from "./actionCreators";
import { TemplatesApi } from "../../../utils/api/templatesApi";
import {LogOffAc} from '../user/actionCreators'

export function* fetchTemplatesRequest({page, limit}) {
    try {
        const items = yield call(TemplatesApi.fetchTemplatesApi, page, limit);
        yield put(SetTemplates(items.content));
    }
    catch (error) {
        console.log('FETCH_TEMPLATES', error)
        if (error.response) {
            if (error.response.status === 500) {
                yield put(LogOffAc())
            }
        }
    }
}
export function* templatesSaga() {
    yield takeLatest('FETCH_TEMPLATES', fetchTemplatesRequest);
}
export function* fetchSearchRequest({text}) {
    try {
        const items = yield call(TemplatesApi.searchTemplatesApi,text);
        yield put(SetSearch(items.content.items));
    }
    catch (error) {
        console.log('SET_SEARCH', error)
        if (error.response) {
            if (error.response.status === 500) {
                yield put(LogOffAc())
            }
        }
    }
}
export function* searchSaga() {
    yield takeLatest('GET_SEARCH', fetchSearchRequest);
}
