import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

const App = () => {

  const [repos, setRepos] = useState([]);
  $.ajax({
    url: '/repos',
    method: 'get'
  })
  .then((data) => {
    setRepos(data);
  });

  const search = (term) => {
    $.ajax({
      url: '/repos',
      method: 'post',
      data: JSON.stringify({username: term}),
      contentType: 'application/json'
    })
    .then(() => {
      return $.ajax({
      url: '/repos',
      method: 'get'
      })
    })
    .then((data) => {
      setRepos(data);
    })
    .then(() => {
      console.log("success");
    })
    .catch((err) => {
      console.log("error");
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