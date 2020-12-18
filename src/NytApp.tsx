import React from 'react';
import NytResults from './NytResults';
const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const key = 'vACwDsKN3DaroSuqw0IQct3C8UzFXwdN';

type NytState = {
    search: string,
    startDate: string,
    endDate: string,
    pageNumber: number,
    results: []
}

class NytApp extends React.Component<{}, NytState> {
    constructor(props: NytState) {
        super(props);
        this.state = {
            search: "",
            startDate: "",
            endDate: "",
            pageNumber: 0,
            results: [],
        }
    }

    fetchResults() {
        let url = `${baseURL}?api-key=${key}&page=${this.state.pageNumber}&q=${this.state.search}`;
        url = this.state.startDate ? url + `&begin_date=${this.state.startDate}` : url;
        url = this.state.endDate ? url + `&end_date=${this.state.endDate}` : url;

        fetch(url)
            .then(res => res.json())
            .then(data => 
              this.setState({
                results: data.response.docs
              }))
            .catch(err => console.log(err));
    };

 handleSubmit(event: React.FormEvent) {
   event.preventDefault();
   this.setState({
     pageNumber: 0
   });
   this.fetchResults();
 };

 changePageNumber(event: MouseEvent | KeyboardEvent, direction: string) {
   event.preventDefault();
   if(direction === 'down') {
     if(this.state.pageNumber > 0) {
       this.setState({
         pageNumber: this.state.pageNumber + 1
       });
       this.fetchResults;
       }
     }

  if(direction === 'up') {
    this.setState({
      pageNumber: this.state.pageNumber + 1
    });
    this.fetchResults;
    }
  };

 render () {
  return (
    <div className="main">
      <div className="mainDiv">
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <span>Enter a single search term (required) : </span>
          <input type="text" name="search" onChange={(e) => this.setState({
            search: e.target.value
          })} required />
          <br />
          <span>Enter a start date: </span>
          <input type="date" name="startDate" pattern="[0-9]{8}" onChange={(e) => this.setState({
            startDate: e.target.value
          })} />
          <br />
          <span>Enter an end date: </span>
          <input type="date" name="endDate" pattern="[0-9]{8}" onChange={(e) => this.setState({
            endDate: e.target.value
          })} />
          <br />
          <button className="submit">Submit search</button>
        </form> 
      {
        this.state.results.length > 0 ? <NytResults results={ this.state.results } changePageNumber={ this.changePageNumber } /> : null 
      }
      </div>
    </div>
  )
 };
};

export default NytApp;

// {
//   this.state.results.length > 0 ? <NytResults _id={this.state.results._id} headline={this.state.results.headline} multimedia={this.state.results.multimedia} snippet={this.state.results.snippet} keywords={this.state.results.keywords} web_url={this.state.results.web_url}>
// }