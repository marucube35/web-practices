// ---- Object that contain fields as properties used for this form ----
export const fields = {
    'full-name': {
        inputs: [
            {
                placeholder: 'Example: Camille Ferros',
                type: 'text',
                name: 'full-name',
                id: 'full-name-input'
            }
        ]
    },
    email: {
        inputs: [
            {
                placeholder: 'Example: email@domain.com',
                type: 'text',
                name: 'email',
                id: 'email-input'
            }
        ]
    },
    password: {
        inputs: [
            {
                placeholder: 'Enter password',
                type: 'password',
                name: 'password',
                id: 'password-input'
            }
        ]
    },
    'confirm-password': {
        inputs: [
            {
                placeholder: 'Confirm password',
                type: 'password',
                name: 'confirm-password',
                id: 'confirm-password-input'
            }
        ]
    },
    province: {
        inputs: [
            {
                value: '',
                text: '---- Chọn tỉnh/thành phố ----'
            },
            {
                value: 'HN',
                text: 'Hà Nội'
            },
            {
                value: 'HCM',
                text: 'Hồ Chí Minh'
            }
        ],
        type: 'select'
    },
    gender: {
        inputs: [
            {
                type: 'radio',
                name: 'gender',
                value: 'male'
            },
            {
                type: 'radio',
                name: 'gender',
                value: 'female'
            },
            {
                type: 'radio',
                name: 'gender',
                value: 'other'
            }
        ],
        type: 'radio'
    },
    avatar:{
        inputs:[
            {
                placeholder: 'Choose a picture',
                type: 'file',
                name: 'avatar',
                id: 'avatar-input'
            }
        ]
    }
}
