const cookie =  require("./cookie");

test('check_cookie_set', () => {
  const name = "testCookie", value= "testValue", expTime = "2020-12-12";
  cookie.setCookie(name, value, expTime)
  expect(value).toEqual(cookie.getCookie(name));
  cookie.deleteCookie(name)
});