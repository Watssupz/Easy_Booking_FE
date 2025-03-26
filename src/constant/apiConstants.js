export const API_BASE_URL = "https://localhost:7210/api";

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

  REGION_PROVINCE: `${API_BASE_URL}/Region/provinces`,
  REGION_DISTRICT: `${API_BASE_URL}/Region/districts/`,
  REGION_WARD: `${API_BASE_URL}/Region/wards/`,

  FEATURE_ALL: `${API_BASE_URL}/F/All`,

  UPLOAD_IMAGES: `${API_BASE_URL}/M/Upload/`,
  UPLOAD_THUMBNAIL: `${API_BASE_URL}/M/upload_thumbnail/`,
};

export const VARIABLE = {
  HOST: "Host",
  CUSTOMER: "Customer",
};
