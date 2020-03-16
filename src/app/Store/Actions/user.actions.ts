import {createAction, props} from '@ngrx/store';

export const logIn = createAction(
    '[registration login] Login Success',
    props<{ userEmail: string; adminRights: boolean }>()
);

export const logOut = createAction(
    '[SubmitService] Logout Success'
);
