// Include React
var React = require("react");
//var stYear;
//var edYear;
var articleResults=[];
var articleUrl=[];
// Here we include all of the sub-components
var Form = require("./children/Form");
//  var Results = require("./children/Results");
var xx=[];
// Helper Function
var helpers = require("./utils/helpers");
var url;
// This is the main component
var Main = React.createClass({

  // Here we set the initial state of our component
  getInitialState: function() {
    return { searchTerm: "", results: "" };
  },

  // componentDidUpdate is a lifecycle method that will get run every time the component updates it's
  // props or state
  componentDidUpdate: function(prevProps, prevState) {
    // If we have a new search term, run a new search
    if (prevState.searchTerm !== this.state.searchTerm) {
      console.log("UPDATED");

      helpers.runQuery(this.state.searchTerm,this.state.searchstYear,this.state.searchedYear).then(function(data) {
        if (data !== this.state.results) {
 for (var i = 0; i < data.data.response.docs.length; i++) 
    {
     articleResults[i]=data.data.response.docs[i].snippet+"\n";
    // console.log(articleResults[i]);
     articleUrl[i]=data.data.response.docs[i].web_url+"\n";
     console.log (articleUrl[i]);
      }
          console.log(data);
          xx=data.data.snippets;
          this.setState({ results: data });
          //url=data.data.web_url;

        }
        // This code is necessary to bind the keyword "this" when we say this.setState
        // to actually mean the component itself and not the runQuery function.
      }.bind(this));
    }
  },
  setTerm: function(term) {
    this.setState({ searchTerm: term });
  },
  setstYear: function(stYear) {
   this.setState({ searchstYear: stYear });
 },
  setedYear: function(edYear) {
   this.setState({ searchedYear: edYear });
  },
  // Here we describe this component's render method
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron">
            <h2 className="text-center">News search (NY Times)!</h2>
            <p className="text-center">
              <em>Enter a Topic to search for Articles (ex: "Donald T").</em>
            </p>
          </div>

          <div className="col-md-6">

            <Form setTerm={this.setTerm}
                  setstYear= {this.setstYear}
                  setedYear = {this.setedYear}
                  />

          </div>

          <div className="col-md-6">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Results</h3>
        </div>
        <div className="panel-body text-justified">

           <div className="list-group">
  

            { 
                  articleResults.map(
                    (articleResults,index)=>{
                      return (
                       <a href={articleUrl[index]} target='_blank' className='list-group-item' key = {index}>
                      
                          {articleResults} </a>
                      )
                      }
                  )
                } 

          </div>
        </div>
      </div>
      </div>
    </div> 
  </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
