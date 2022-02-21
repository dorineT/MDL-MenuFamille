const Router = require('express-promise-router')

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()
const path = require('path');
// export our router to be mounted by the parent application
module.exports = router
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/home.html'));
})