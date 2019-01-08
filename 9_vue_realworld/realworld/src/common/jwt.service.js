// TODO: CONST 항목도 한 군데 붙어있는 건 어떨까?
const ID_TOKEN_KEY = "id_token";

// TODO: localStorage에 저장되있는 토큰을 cookie로 변경해보자
export const getToken = () => {
  return window.localStorage.getItem(ID_TOKEN_KEY);
};

export const saveToken = token => {
  return window.localStorage.setItem(ID_TOKEN_KEY, token);
};

export const destroyToken = () => {
  return window.localStorage.removeItem(ID_TOKEN_KEY);
};

export default { getToken, saveToken, destroyToken };