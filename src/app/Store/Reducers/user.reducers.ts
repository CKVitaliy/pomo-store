import {Action, createReducer, on} from '@ngrx/store';
import * as userActions from '../Actions/user.actions';

export interface State {
    userEmail: string;
    adminRights: boolean;
}

export const initialState: State = {
    userEmail: '',
    adminRights: false
};

const UserReducer = createReducer(
    initialState,
    on(userActions.logIn, (state: State, {userEmail, adminRights}) => ({userEmail: userEmail, adminRights: adminRights})),
    on(userActions.logOut, (state: State) => ({userEmail: '', adminRights: false}))
    );

export function userReducer(state: State | undefined, action: Action) {
    return UserReducer(state, action);
}
