// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];

// eslint-disable-next-line import/prefer-default-export
export function configureFakeBackend() {
  const realFetch = window.fetch;
  window.fetch = function (url, opts) {
    const { method, headers } = opts;
    const body = opts.body && JSON.parse(opts.body);

    return new Promise((resolve, reject) => {
      // wrap in timeout to simulate server api call
      setTimeout(handleRoute, 500);

      function handleRoute() {
        switch (true) {
          case url.endsWith('/users/authenticate') && method === 'POST':
            return authenticate();
        case url.endsWith('/users/register') && method === 'POST':
            return register();
        case url.endsWith('/users') && method === 'GET':
            return getUsers();
        case url.match(/\/users\/\d+$/) && method === 'DELETE':
            return deleteUser();
        default:
            // pass through any requests not handled above
            return realFetch(url, opts)
                .then(response => resolve(response))
                .catch(error => reject(error));
        }
      }

      // route functions

      function authenticate() {
        const { email, password } = body;
        const user = users.find((x) => x.email === email && x.password === password);
        if (!user) {
            alert("이메일과 패스워드를 잘못 입력하셨습니다."); 
            return  error('email or password is incorrect');   
          }
        else{
        return ok({
          id: user.id,
          email: user.email,
          name: user.name,
          token: 'fake-jwt-token'
        });
        }
      }

      function register() {
        const user = body;

        if (users.find((x) => x.email === user.email)) {
          return error(`email  ${user.email} is already taken`);
        }

        // assign user id and a few other properties then save
        user.id = users.length ? Math.max(...users.map((x) => x.id)) + 1 : 1;
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));

        return ok();
      }

      function getUsers() {
        if (!isLoggedIn()) return unauthorized();

        return ok(users);
      }

      function deleteUser() {
        if (!isLoggedIn()) return unauthorized();
    
        users = users.filter((x) => x.id !== idFromUrl());
        localStorage.setItem('users', JSON.stringify(users));
        return ok();
      }

      // helper functions

      function ok(body) {
        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) });
      }

      function unauthorized() {
        resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorized' })) });
      }

      function error(message) {
        resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) });
      }

      function isLoggedIn() {
        return headers['Authorization'] === 'Bearer fake-jwt-token';
      }
    
      function idFromUrl() {
        const urlParts = url.split('/');
        return parseInt(urlParts[urlParts.length - 1]);
      }
    });
  }
}
