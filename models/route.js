function Route(route){
    this.startc = route.LOC_START_NAMEC;
    this.starte = route.LOC_START_NAMEE;
    this.endc = route.LOC_END_NAMEC;
    this.ende = route.LOC_END_NAMEE;   
};


//check route exist or not
Route.getRouteByName = function getRouteByName(startc, callback) {

        var cmd = "SELECT * FROM Route WHERE (LOC_START_NAMEC like '%?%'";
        connection.query(cmd, [LOC_START_NAMEC], function (err, result) {
            if (err) {
                return;
            }
            connection.release();
            callback(err,result);                    
        });       
};