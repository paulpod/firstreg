module.exports = {
  bind : function (app) {

    app.get('/', function (req, res) {
      res.render('index');

    });
    /* This is a bit of code that looks for an index.html page in any directory */

    



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




    /* - - - - - - - - - - - - - - - - - - - */
    /* Specific page logic for First Reg     */


    app.get('/examples/elements/firstreg', function (req, res) {

    var newused = req.query.newused;     /* new or used */
    var leftright = req.query.leftright; /* left or right hand drive */
    var underover = req.query.underover; /* under 10 years or older  */







    res.render('examples/elements/' + 'fr-' + newused + leftright + underover, {'vars' : vars});
    /* this line renders a new page based on the HTML of the filename + branchname  */
    
 
    });
    /* ends the app.get javascript function */






  }
};
