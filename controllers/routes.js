// Address
const {
    addressCreateAddress,
    addressDeleteAddress,
    addressGetAddress,
    addressUpdateAddress,
} = require('./address-controller');

// User
const { userCreateUser, userDeleteUser, userGetUser, userUpdateUser } = require('./user-controller');

module.exports = hugo => {
    // Address Routes
    hugo.get('/address', addressGetAddress.validate, addressGetAddress.action);
    hugo.post('/address', addressCreateAddress.validate, addressCreateAddress.action);
    hugo.delete('/address', addressDeleteAddress.validate, addressDeleteAddress.action);
    hugo.put('/address', addressUpdateAddress.validate, addressUpdateAddress.action);

    // User Routes
    hugo.get('/user', userGetUser.validate, userGetUser.action);
    hugo.post('/user', userCreateUser.validate, userCreateUser.action);
    hugo.delete('/user', userDeleteUser.validate, userDeleteUser.action);
    hugo.put('/user', userUpdateUser.validate, userUpdateUser.action);
};
