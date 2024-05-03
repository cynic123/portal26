const GetCategory = async (domain) => {
  const queryString = btoa(domain) + '?taxonomy=webshrinker';
  fetch(process.env.WS_URL + queryString, {
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64')
    }),
  })
    .then((res) => {
      if (res.status >= 200 && res.status <= 299) {
        return res.json();
      } else {
        throw new Error(res.statusText);
      }
    })
    .catch(err => {
      throw new Error(err);
    })
}

module.exports = GetCategory;