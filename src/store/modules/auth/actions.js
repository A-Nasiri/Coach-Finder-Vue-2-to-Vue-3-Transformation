export default {
    async signup(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'signup'
        })
    },
    async auth(context, payload) {
        const mode = payload.mode;
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBNfTLTw2ao8pE37RuCXFjPE4co5Za8sH0';

        if (mode === 'signup') {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBNfTLTw2ao8pE37RuCXFjPE4co5Za8sH0';
        }
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true
            })
        });

        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to authenticate!');
            throw error;
        }

        localStorage.setItem('userId', responseData.localId);
        localStorage.setItem('token', responseData.idToken);

        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiresIn
        })
    },
    tryLogin(context) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (token && userId) {
            context.commit('setUser', {
                token,
                userId,
                tokenExpiration: null
            });
        }
    },
    async login(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'login'
        })
    },
    logout(context) {
        context.commit('setUser', {
          token: null,
          userId: null,
          tokenExpiration: null
        });
    }
};