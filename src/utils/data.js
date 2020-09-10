export function getSearchData() {
  let { search } = window.location;
  search = search.slice(1, search.length);
  return stringToObject(search);
}

export function stringToObject(search) {
  if (!search) {
    return null;
  }
  return search.split('&')
    .reduce((acc, item) => {
      if (item) {
        const [key, value] = item.split('=');
        acc[key] = value;
      }
      return acc;
    }, {});
}

export function toCss(name, object = {}) {
  return `${Object.entries(object)
    .reduce((acc, [key, value]) => `${acc}${key}:${value};`, `${name}{`)}}`;
}


export function validateEmail(email = '') {
  return !!email.match(/.(.)*@.(.)*\..(.)*/gi);
}
