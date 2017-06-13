// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");
var articleResults=[];
var articleUrl=[];
var stYearnew;
var edYearnew;
// Helper functions (in this case the only one is runQuery)
var helpers = {

  runQuery: function(location,stYear,edYear) {

    console.log(location);
    console.log(stYear);
    console.log(edYear);
stYearnew = stYear+"0101";
edYearnew = edYear+"1231";
    // Figure out the News in a Period

    var queryURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?fq="+location+"&facet_field=day_of_week&begin_date="+stYearnew+"&end_date="+edYearnew+"&api-key=24999ddef66c4522bac00379cbecf07c";


    return axios.get(queryURL).then(function(response) {
 console.log(response.data.response.docs.length);
 console.log(response);

    for (var i = 0; i < response.data.response.docs.length; i++) 
    {
     articleResults[i]=response.data.response.docs[i].snippet+"\n";
    // console.log(articleResults[i]);
   //  articleUrl[i]=response.data.response.docs[i].web_url;
      }

    //  return articleResults;
    return response;
    });
  }

}
// We export the helpers object (which contains runQuery)
module.exports = helpers;
