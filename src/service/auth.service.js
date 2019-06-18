const authInfo = {
    isLoggedIn: false,
    user: null
}

const loginHandlers = []

export function isLoggedIn() { return authInfo.isLoggedIn }

export function getUser() { return authInfo.user }

export function login(user) {
    authInfo.isLoggedIn = true
    authInfo.user = user
    notifyHandlers()
}

function notifyHandlers() {
    loginHandlers.forEach(handler => handler(authInfo.isLoggedIn, authInfo.user))
}

export function logout() {
    authInfo.isLoggedIn = false
    authInfo.user = null
    notifyHandlers()
}

export function addLoginHandler(handler) {
    loginHandlers.push(handler)
}

