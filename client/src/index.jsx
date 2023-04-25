import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

const App = () => {

  const [repos, setRepos] = useState([]);

  const search = (term) => {
    // axios.post('/repos', {username: term})
    // .then((data) => {
    //   console.log("Success. We may need to update the popular repos now.")
    // })
    // .catch((err) => {
    //   console.log("Error. The POST request did not work.");
    // });

    $.ajax({
      url: '/repos',
      method: 'post',
      data: JSON.stringify({username: term}),
      contentType: 'application/json'
    })
    .done((data) => {
      console.log("success");
    })
    .fail((err) => {
      console.log("error");
    })
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