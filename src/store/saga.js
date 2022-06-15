import { all } from 'redux-saga/effects';
import { userSaga } from './ducks/user/sagas'
import { templatesSaga, searchSaga } from './ducks/templates/sagas'
import { menuSaga } from './ducks/menu/sagas';
import {applicationsSaga, searchApplicationsSaga} from './ducks/applications/sagas'

export default function* rootSaga() {
    yield all([
        userSaga(),
        templatesSaga(),
        searchSaga(),
        menuSaga(),
        applicationsSaga(),
        searchApplicationsSaga()
    ]);
}
