import { Auth } from "aws-amplify";

export const getToken = async () => {
  try {
    const token = await Auth.currentSession().then((session) =>
      session.getIdToken().getJwtToken()
    );
    return Promise.resolve(token);
  } catch (error) {
    return Promise.reject(error);
  }
};