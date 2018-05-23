var express = require('express');
var router = express.Router();

// home page
router.get('/', function(req, res, next) {
    var data = 0;
    res.render('index', { data: data});
});

router.post('/', function(req, res) {
    var userFrom = req.body['txtFrom'],
        userEnd = req.body['txtEnd'];

        var db = req.con;
        var data = "";
        var cmd = "SELECT * FROM RStop, Route WHERE (ROUTE_ID = Route_ROUTE_ID) and (LOC_START_NAMEC like '%" + userFrom + "%' or LOC_START_NAMEE like '%" + userFrom + "%') and (LOC_END_NAMEC like '%" + userEnd + "%' or LOC_END_NAMEE like '%" + userEnd + "%')";
        
        db.query(cmd, function (err, rows) {
            if (err) {
                console.log(err);
            }
            var data = rows;
            //console.log(req.body);
            res.render('index', {data: data});
        });   
});

module.exports = router;