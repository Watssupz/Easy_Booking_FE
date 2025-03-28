// Localhost
// export const API_BASE_URL = "https://localhost:7210/api"; //https
export const API_BASE_URL = "http://localhost:5125/api"; // http

// Internet
// export const API_BASE_URL = "http://103.9.77.15:10003/api";

export const API_ENDPOINTS = {
  AC_CHGPWD: `${API_BASE_URL}/AC/ChgPwd`,
  AC_SIGN_IN: `${API_BASE_URL}/AC/SignIn`,
  AC_SIGN_UP: `${API_BASE_URL}/AC/SignUp`,
  AC_PROFILE: `${API_BASE_URL}/AC/profile`,
  AC_UPDATE_PROF: `${API_BASE_URL}/AC/UpdateProf`,
  AC_CREATE_HOST: `${API_BASE_URL}/AC/CreateHost`,
  AC_UPLOAD_AVATAR: `${API_BASE_URL}/AC/Upload`,

  R_ALL: `${API_BASE_URL}/R/All`,
  R_SEARCH: `${API_BASE_URL}/R/Search`,
  R_CREATE: `${API_BASE_URL}/R/Create`,
  GET_ROOM_BY_ID: `${API_BASE_URL}/R/`,

  REGION_PROVINCE: `${API_BASE_URL}/Region/provinces`,
  REGION_DISTRICT: `${API_BASE_URL}/Region/districts/`,
  REGION_WARD: `${API_BASE_URL}/Region/wards/`,

  FEATURE_ALL: `${API_BASE_URL}/F/All`,
  FEATURE_BY_ROOM_ID: `${API_BASE_URL}/F/get-by-rid/`,

  UPLOAD_IMAGES: `${API_BASE_URL}/M/Upload/`,
  UPLOAD_THUMBNAIL: `${API_BASE_URL}/M/upload_thumbnail/`,
  GET_MEDIA_ROOM: `${API_BASE_URL}/M/`,
};

export const VARIABLE = {
  HOST: "Host",
  CUSTOMER: "Customer",
};
