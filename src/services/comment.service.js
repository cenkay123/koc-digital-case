export const commentService = {
  fetchComments,
};

async function fetchComments(limit) {
  const requestOptions = {
    method: 'GET',
  };
   return await fetch(`https://jsonplaceholder.typicode.com/comments?_start=0&_limit=${limit}`, requestOptions)
    .then(handleResponse)
}

function handleResponse(response) {
  return response
}
