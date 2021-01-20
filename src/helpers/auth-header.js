export function authHeader() {
    // return authorization header with jwt token
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }
  alert('회원가입이 되지않은 email 입니다.');
  return false;

}
