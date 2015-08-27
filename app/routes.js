module.exports = {
  bind : function (app) {

    app.get('/', function (req, res) {
      res.render('index');

    });
    /* This is a bit of code that looks for an index.html page in any directory */






    /* Do linear page flow with variables in an array  */
    app.get('/examples/elements/q1-flow', function (req, res) {

    var next = req.query.nextlink;

    var vars = req.query;
    console.log(vars);
    /* grab the rest of the variables passed in the query, if any, to pass out to any waiting template placeholders */


    res.render('examples/elements/' + next, {'vars' : vars});

 
    });




    /* - - - - - - - - - - - - - - - - - - - - - - - -  */
    /* Calculate the content to go on the results page  */
    app.get('/examples/elements/calc-answer', function (req, res) {

    var next = req.query.nextlink;

    var vars = req.query;
    console.log(vars);
    var isnew = req.query.isnew;
    var iseu = req.query.iseu;
    var type = req.query.type;
    var side = req.query.side;

    /* grab the rest of the variables */

    var next;

    var answerlink = "answers-generic";

    /* check values for the new+noteu+car+lhd state */
    if(isnew == 'new') {
        if(iseu == 'noteu') {
            if(type == 'car') {
                if(side == 'lhd') {
                    var answerlink = "answers-new-noteu-car-lhd"
                }
            }
        }
    }
    /* check values for the new+eu+car+rhd state */
    if(isnew == 'new') {
        if(iseu == 'eu') {
            if(type == 'car') {
                if(side == 'rhd') {
                    var answerlink = "answers-new-eu-car-rhd"
                }
            }
        }
    }
    /* check values for the new+eu+motorbike+x state */
    if(isnew == 'new') {
        if(iseu == 'eu') {
            if(type == 'motorbike') {
                var answerlink = "answers-new-eu-motorbike"
            }
        }
    }

        


    res.render('examples/elements/' + answerlink, {'vars' : vars});

 
    });

    



    /* - - - - - - - - - - - - - - - - -  -  */
    /* Pass nextpage for Basic Flow control  */


    app.get('/examples/elements/basic-flow', function (req, res) {
    /* line above starts a new JS function, receives the form action event from the webpage */


    var next = req.query.nextlink;
    /* this line pulls out the name of the next page that was sent with the weblink */


    var vars = req.query;
    console.log(vars);
    /* grab the rest of the variables passed in the query, if any, to pass out to any waiting template placeholders */


    res.render('examples/elements/' + next, {'vars' : vars});
    /* this line renders a new page based on the HTML of the file sent as the next page  */
    /* it also passes ALL of the variables out to the page, which will be ignored unless */
    /* you make use of a {{#vars}} {{variable-name}} {{/vars}} loop on the page html     */
    
 
    });
    /* ends the app.get javascript function */







    /* - - - - - - - - - - - - - - - - - - - */
    /* Chooser for Basic Branching control   */


    app.get('/examples/elements/basic-branch', function (req, res) {

    var next = req.query.nextlink;
    /* this line pulls out the filename of the next page, sent with the weblink */


    var vars = req.query;
    console.log(vars);
    /* grab the rest of the variables passed in the query, if any, to pass out to any waiting template placeholders */


    var branch = req.query.branch;
    /* this line pulls out the name of the branch from the input buttons */

    res.render('examples/elements/' + next + '-' + branch, {'vars' : vars});
    /* this line renders a new page based on the HTML of the filename + branchname  */
    
 
    });
    /* ends the app.get javascript function */







    /* - - - - - - - - - - - - - - - - - - */
    /*     Pass First Reg Flow control     */

    app.get('/examples/elements/firstreg-flow', function (req, res) {

    var next = req.query.nextlink;
    var vars = req.query;
    var isnew = req.query.isnew;
    var mkm = req.query.mkm;
    var mkmmsg = req.query.mkmmsg;

    res.render('examples/elements/' + next, {'vars' : vars, 'isnew' : isnew, 'mkm' : mkm, 'mkmmsg' : mkmmsg});
    
    });
    







    /* - - - - - - - - - - - - - - - - - - -  */
    /*   Specific pages logic for First Reg   */
    /*   1. Is the vehicle new or used?       */

    app.get('/examples/elements/isnew-branch', function (req, res) {

    var next = req.query.nextlink;
    var vars = req.query;
    var isnew = req.query.isnew;

    res.render('examples/elements/' + next + '-' + isnew + '-mkm', {'vars' : vars, 'isnew' : isnew});
 
    });



    /*   2. Is the vehicle lhd or rhd?       */

    app.get('/examples/elements/mkm-branch', function (req, res) {

    var next = req.query.nextlink;
    var vars = req.query;
    var isnew = req.query.isnew;
    var mkm = req.query.mkm;

    console.log(mkm);

    /* pair of messages + next urls for NEW vehicles */
    if(isnew == 'new') {
        if(mkm == 'rhd') {
            var mkmmsg = "Right hand drive (RHD)";
            var nexturl = "notifynova";
        }

        if(mkm == 'lhd') {
            var mkmmsg = "Left hand drive (LHD)";
            var nexturl = "dvsa";
        }
    }


    /* pair of messages + next urls for USED vehicles */
    if(isnew == 'used') {
        if(mkm == 'rhd') {
            var mkmmsg = "Right hand drive (RHD)";
            var nexturl = "10years";
        }

        if(mkm == 'lhd') {
            var mkmmsg = "Left hand drive (LHD)";
            var nexturl = "dvsa";
        }
    }


    res.render('examples/elements/' + next + '-' + isnew + '-' + nexturl, {'vars' : vars, 'isnew' : isnew, 'mkm' : mkm, 'mkmmsg' : mkmmsg});    
 
    });



/*   3. Is the vehicle 10 years or older?       */

    app.get('/examples/elements/age-branch', function (req, res) {

    var next = req.query.nextlink;
    var vars = req.query;
    var isnew = req.query.isnew;
    var mkm = req.query.mkm;
    var mkmmsg = req.query.mkmmsg;
    var age = req.query.age;


    /* pair of messages for <> 10 years old */
    
    if(age == 'over10') {
        var agemsg = "Over 10 years old";
        var nexturl = "notifynova";
    }

    if(age == 'under10') {
        var agemsg = "Up to 10 years old";
        var nexturl = "notifynova";
    }
    


    res.render('examples/elements/' + next + '-' + isnew + '-' + nexturl, {'vars' : vars, 'isnew' : isnew, 'mkm' : mkm, 'mkmmsg' : mkmmsg, 'agemsg' : agemsg});    
 
    });






  }
};
