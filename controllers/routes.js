// Address
const {
    addressCreateAddress,
    addressDeleteAddress,
    addressGetAddress,
    addressUpdateAddress,
} = require('./address-controller');

// Auth
const { authLocal, authLogout } = require('./auth-controller');

// Download
const { downloadCreateDownload, downloadGetDownload, downloadGetUsersDownloads } = require('./download-controller');

// File
const { fileCreateFile, fileDeleteFile, fileGetFile, fileGetUsersFiles, fileUpdateFile } = require('./file-controller');

// Review
const { reviewCreateReview, reviewGetReview, reviewUpdateReview } = require('./review-controller');

// User
const { userCreateUser, userDeleteUser, userGetUser, userUpdateUser } = require('./user-controller');

module.exports = hugo => {
    // Address Routes
    hugo.get('/address', addressGetAddress.validate, addressGetAddress.action);
    hugo.post('/address', addressCreateAddress.validate, addressCreateAddress.action);
    hugo.delete('/address', addressDeleteAddress.validate, addressDeleteAddress.action);
    hugo.put('/address', addressUpdateAddress.validate, addressUpdateAddress.action);

    // Auth Routes
    hugo.post('/login', authLocal);
    hugo.post('/logout', authLogout);

    // Download Routes
    hugo.post('/download', downloadCreateDownload.validate, downloadCreateDownload.action);
    hugo.get('/download', downloadGetDownload.validate, downloadGetDownload.action);
    hugo.get('/users_downloads', downloadGetUsersDownloads.validate, downloadGetUsersDownloads.action);

    // File Routes
    hugo.post('/file', fileCreateFile.validate, fileCreateFile.action);
    hugo.delete('/file', fileDeleteFile.validate, fileDeleteFile.action);
    hugo.get('/file', fileGetFile.validate, fileGetFile.action);
    hugo.put('/file', fileUpdateFile.validate, fileUpdateFile.action);
    hugo.get('/user_files', fileGetUsersFiles.validate, fileGetUsersFiles.action);

    // Review Routes
    hugo.post('/review', reviewCreateReview.validate, reviewCreateReview.action);
    hugo.get('/review', reviewGetReview.validate, reviewGetReview.action);
    hugo.put('/review', reviewUpdateReview.validate, reviewUpdateReview.action);

    // User Routes
    hugo.get('/user', userGetUser.validate, userGetUser.action);
    hugo.post('/user', userCreateUser.validate, userCreateUser.action);
    hugo.delete('/user', userDeleteUser.validate, userDeleteUser.action);
    hugo.put('/user', userUpdateUser.validate, userUpdateUser.action);
};
