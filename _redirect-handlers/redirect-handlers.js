export const getRedirectURL = (lang, page) => {
  let url = "";
  switch (lang) {
    case "sr":
      url = `/sr/${page}`;
      break;
    case "en":
      url = `/en/${page}`;
      break;
    default:
      url = `/${page}`;
      break;
  }
  return url;
};

export const getLoginURL = (lang) => {
  return getRedirectURL(lang, "login");
};
export const getAccountURL = (lang) => {
  //page definisati na nivou f-je
  //dodavati query string i base
  //moze da se desi i path
  return getRedirectURL(lang, "nalog");
};
