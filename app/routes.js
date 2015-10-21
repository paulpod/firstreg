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
    /* grab the rest of the variables passed in the query, if any, 
    /* to pass out to any waiting template placeholders */


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




    /* - - - - - - - - - - - - - - - - - - - - - - - -  */
    /* Another answer calculator...to the results page  */
    app.get('/examples/elements/calc2', function (req, res) {

    var next = req.query.nextlink;

    var vars = req.query;
    console.log(vars);
    var importer = req.query.importer;
    var isnew = req.query.isnew;
    var vat = req.query.vat;
    var type = req.query.type;
    var isuk = req.query.isuk;


    /* grab the rest of the variables */

    var next;

    var answerlink = "answers-generic";

    /* check values for the importer=me, VAT=no, New=Cert, Type=EC+UK state */
    if(importer == 'me') {
        if(vat == 'no') {
            if(isnew == 'yes') {
                if(type == 'ec') {
                    if(isuk == 'yes')
                    var answerlink = "answers-new-ec-isuk"
                }
            }
        }
    }
    /* check values for the importer=me, VAT=no, New=nodocs, Type=nodocs state */
    if(importer == 'me') {
        if(vat == 'no') {
            if(isnew == 'no') {
                if(type == 'none') {
                    var answerlink = "answers-new-nodocs"
                }
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





    /* - - - - - - - - - - - - - - */
    /* Using idealpostcode to get  */
    /* addresses for a postcode    */

    app.get('/examples/elements/find-postcode', function (req, res) {

     
    

      var postcode = req.query.postcode;

      var idealPostcodes = require("ideal-postcodes")("ak_i0ze7k03RQwMtjncypybi4nQOE97T")

      idealPostcodes.lookupPostcode(postcode, function (error, results) {
        if (error) {
        // Implement some error handling
        }

        console.log(results); 
        res.render('examples/elements/address.html', {'postcode' : postcode, 'result' : results})

      });

    });





    /* - - - - - - - - - - - - - - - - */
    /* Using idealpostcode to playback */
    /* full address into a form from   */
    /* the user chosen udprn           */

    app.get('/examples/elements/chosen-address', function (req, res) {

     

      var selectedudp = req.query.udprn;

      var idealPostcodes = require("ideal-postcodes")("ak_i0ze7k03RQwMtjncypybi4nQOE97T")

      idealPostcodes.lookupUdprn(selectedudp, function (error, address) {
        if (error) {
        // Implement some error handling
        }

        console.log(address); 
        res.render('examples/elements/address-playback.html', {'address' : address})

      });

    });





  }
};