var interceptor = function () {
  return function(promise) {
    return promise.then(
      function(response) {
        return response;
      },
      function(response) {
        if (response.status == 401) {
          //todo: zur login seite
        }
        return $q.reject(response);
      }
    );
  }
};
