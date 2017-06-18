const users = {
    michalczukm: {
        id: 1,
        username: 'michalczukm',
        password: 'michalczukm-secret-pass'
    },
    kowalskik: {
        id: 2,
        username: 'kowalskik',
        password: 'kowalskik-secret-pass'
    },
    nowakp: {
        id: 3,
        username: 'nowakp',
        password: 'nowakp-secret-pass'
    }
};

const isAuthorized = (username, password) => {
    const user = users[username];

    if (!user) {
        return new Promise((resolve, reject) => reject({ isValid: false, credentials: null }));
    }

    const buildResult = (isValid) => { return { credentials: { id: user.id, username: user.username }, isValid: isValid } }

    return new Promise((resolve, reject) => {
        password === user.password
            ? resolve(buildResult(true))
            : reject(buildResult(false))
    })
}

module.exports = { isAuthorized };
