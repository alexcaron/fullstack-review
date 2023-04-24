import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

const App = () => {

  const [repos, setRepos] = useState([]);

  const search = (term) => {
    $.ajax({
      url: 'localhost:1128',
      method: 'POST',
      data: {username: term}
    })
    .done((data) => {
      console.log("Success. We may need to update the popular repos now.")
    })
    .fail((err) => {
      console.log("Error. The POST request did not work.");
    });
  }

  return (
    <div>
      <h1>Github Fetcher</h1>
      <RepoList repos={repos}/>
      <Search onSearch={search}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));