import { call, takeLatest, put } from "@redux-saga/core/effects";
import { SetMenu } from "./actionCreators";
import {MenuApi} from '../../../utils/api/menuApi'
import {LogOffAc} from './../../ducks/user/actionCreators.js';

export function* fetchMenuRequest() {
    try {
        const items = yield call(MenuApi.fetchMenuApi);
        yield put(SetMenu(items.content));
    }
    catch (error) {
        console.log('FETCH_MENU', error)
        if (error.response) {
            if (error.response.status === 500) {
                yield put(LogOffAc())
            }
        }
    }
}
export function* menuSaga() {
    yield takeLatest('FETCH_MENU', fetchMenuRequest);
}
