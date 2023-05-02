import { Auth } from 'aws-amplify';

const AuthProvider = {
    login: async ({ username, password }) => {
        try {
            await Auth.signIn(username, password);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    },
    logout: () => {
        Auth.signOut();
        return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: () => {
        return Auth.currentAuthenticatedUser()
            .then(() => Promise.resolve())
            .catch(() => Promise.reject());
    },
    getPermissions: () => Promise.resolve(),
};

export default AuthProvider;