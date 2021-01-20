import { alertActions } from './alert.actions';
import { userConstants } from '../constants';
import { userService } from '../services';
import { history } from '../helpers';

export const userActions = {
  login,
  logout,
  register,
  getAll,
  delete: userDelete
};

function login(email, password, from) {
  return (dispatch) => {
    dispatch(request({ email }));

    userService.login(email, password)
      .then(
        (user) => {
          dispatch(success(user));
          window.location.replace(from.pathname);
        },
        (error) => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request(user) { return { type: userConstants.LOGIN_REQUEST, user }; }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user }; }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error }; }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}


function register(user) {
  return dispatch => {
      dispatch(request(user));

      userService.register(user)
          .then(
              user => { 
                  dispatch(success());
                  history.back();
                  dispatch(alertActions.success('Registration successful'));
              },
              error => {
                  alert("이미 등록된 이메일이 있습니다")
                  dispatch(failure(error.toString()));
                  dispatch(alertActions.error(error.toString()));
                  history.go(-1);
              }
          );
  };

  function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
  function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
  function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
  return (dispatch) => {
    dispatch(request());

    userService.getAll()
      .then(
        (users) => dispatch(success(users)),
        (error) => dispatch(failure(error.toString()))
      );
  };

  function request() { return { type: userConstants.GETALL_REQUEST }; }
  function success(users) { return { type: userConstants.GETALL_SUCCESS, users }; }
  function failure(error) { return { type: userConstants.GETALL_FAILURE, error }; }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function userDelete(id) {
  return (dispatch) => {
    dispatch(request(id));

    userService.delete(id)
      .then(
        () => dispatch(success(id)),
        (error) => dispatch(failure(id, error.toString()))
      );
  };

  function request(id) { return { type: userConstants.DELETE_REQUEST, id }; }
  function success(id) { return { type: userConstants.DELETE_SUCCESS, id }; }
  function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error }; }
}
