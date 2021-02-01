export const userService = {
  login,
  logout
};

function login(user) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(user)
  };
  return fetch(`${window.location.origin}/auth`, requestOptions)
    .then(handleResponse)
    .then(user => {
      if (user.token) {
        localStorage.setItem('user', JSON.stringify(user));
      }
      return user;
    })
}

function logout() {
  localStorage.removeItem('user');
}

function handleResponse(response) {
  return response.text().then(text => {
    if(!response.ok) {
      return Promise.reject(response)
    }
    return JSON.parse(text)
  });
}
