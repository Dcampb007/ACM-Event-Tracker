import { auth, database, storage } from '../Firebase';

export const GET_USER = 'get_user';
export const GET_DB_USERS = 'get_db_users';
export const USER_STATUS = 'user_status';
export const USER_DB_STATUS = 'user_db_status';
export const GET_EVENTS = 'event_db_status';
export const EVENTS_DB_STATUS = 'event_status';
export const ADD_EVENT_STATUS = 'add_event_status';

export function getUser() {
    return dispatch => {
        dispatch({
            type: USER_STATUS,
            payload: true
        });
        auth.onAuthStateChanged(user => {
            dispatch({
                type: GET_USER,
                payload: user
            });
            dispatch({
                type: USER_STATUS,
                payload: false
            });
        });
    };
}

export function getDbUsers() {
    return dispatch => {
        dispatch({
            type: USER_DB_STATUS,
            payload: true
        });
        database.ref('users').on('value', db => {
            dispatch({
                type: GET_DB_USERS,
                payload: db.val()
            });
            dispatch({
                type: USER_DB_STATUS,
                payload: false
            });
        });
    };
}

export function getEvents() {
    return dispatch => {
        dispatch({
            type: EVENTS_DB_STATUS,
            payload: true
        });
        database.ref('events').on('value', db => {
            dispatch({
                type: GET_EVENTS,
                payload: db.val()
            });
            dispatch({
                type: EVENTS_DB_STATUS,
                payload: false
            });
        });
    };
}

export function addEvent(events) {
    return dispatch => database.ref('/').update(
        {events});
}

export function updateUserEvents(uid, events) {
    return dispatch => database.ref("users/"+uid+"/").update({events});
}

export function updateEventSurveys(eventID, uid, surveyResponse) {
    return dispatch => database.ref("surveys/events/"+eventID+"/users/"+uid).update({surveyResponse});
}

export function login(email, password) {
    return dispatch => auth.signInWithEmailAndPassword(email, password);
}

export function logout() {
    return dispatch => auth.signOut();
}

export function createAccount(data) {
    const { fname, lname, email, password, image } = data;
    return dispatch => auth.createUserWithEmailAndPassword(email, password).then((user) => {
        if (user !== null) {
            database.ref('users').child(user.uid).set({
                fname,
                lname,
                isAdmin: false,
            });
        }
    });
}
