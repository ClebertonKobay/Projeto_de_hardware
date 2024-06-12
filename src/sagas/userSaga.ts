import { put, takeEvery, all } from 'redux-saga/effects'

export interface Action{
    type: string,
    payload: any
}
export function fetchUserQuery(action: Action){

}






export function* fetchUser() {
  yield takeEvery('INCREMENT_ASYNC', fetchUserQuery)
}


export default function* rootSaga() {
  yield all([
    fetchUser()
  ])
}