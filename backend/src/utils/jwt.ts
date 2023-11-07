import * as jwt from "jsonwebtoken";
const SECRET_TOKEN = `SESSION_TOKEN-qwerty_iop_1234567890_pqr_st_uv`;
export const generateJwtToken = (
  payload: { [key: string]: any },
  isRefresh: true | false
) => {
  const token = jwt.sign(
    payload,
    isRefresh ? `${SECRET_TOKEN}_refresh_token` : SECRET_TOKEN,
    {
      expiresIn: isRefresh ? "12h" : "72h",
    }
  );
  return token;
};

export const validateJwtToken = (token: string, isRefresh: true | false) => {
  const key = isRefresh ? `${SECRET_TOKEN}_refresh_token` : SECRET_TOKEN;
  const payload = jwt.verify(token, key);
  return payload;
};
