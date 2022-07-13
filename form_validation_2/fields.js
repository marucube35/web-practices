export const fields = {
    'full-name': {
        name: 'Full name',
        placeholder: 'Example: Camille Ferros',
        pattern: /^[a-zA-z]+$/gi,
        error: 'Full name only contains character'
    },
    email: {
        name: 'Email',
        placeholder: 'Example: email@domain.com',
        pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gi,
        error: 'Email is invalid'
    },
    password: {
        name: 'Password',
        placeholder: 'Enter password',
        pattern: /.{6,}/g,
        error: "Password's length must be more than six characters"
    },
    'confirm-password': {
        name: 'Confirm password',
        placeholder: 'Confirm password',
        pattern: /^[a-zA-Z0-9@_-]+$/gi,
        error: 'Password must be alphanumeric (@, _ and - are allowed)'
    }
}
