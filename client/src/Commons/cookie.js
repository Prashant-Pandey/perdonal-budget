export function getCookie(cookiename) {
  try {
    var cookies = RegExp(cookiename + "=[^;]+").exec(document.cookie).toString().split("=");
    const value = cookies[cookies.indexOf(cookiename) + 1];
    return decodeURIComponent(value);
  } catch (error) {
    return false;
  }
}

export function deleteCookie(cookiename) {
  try {
    var cookies = document.cookie.toString().split(';').flatMap((val) => {
      return val.split('=');
    });
    const valueIndex = cookies.indexOf(cookiename) + 1;
    cookies[valueIndex] = 'gibberish;expires=Thu, 01 Jan 1970 00:00:01 GMT';
    let cookieStr = cookies[0];
    for (let i = 1; i < cookies.length; i++) {
      if (i % 2 == 0) {
        cookieStr+=';'+cookies[i];
      } else {
        cookieStr+='='+cookies[i];
      }
    }
    document.cookie = cookieStr;
    return true;
  } catch (error) {
    return false;
  }
}
