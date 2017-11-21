import { USER_DB_STATUS, USER_STATUS, EVENTS_DB_STATUS } from '../Actions/UserActions';

export default function (state = {}, action) {
  switch (action.type) {
    case USER_STATUS:
      return { ...state, user: action.payload };
    case USER_DB_STATUS:
      return { ...state, dbUser: action.payload };
    case EVENTS_DB_STATUS:
      return { ...state, dbEvents: action.payload };
    default:
      return state;
  }
}
