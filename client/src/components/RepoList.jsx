import React from 'react';

const RepoList = ({ repos }) => {
  return (
    <div>
      <h4> Repo List Component </h4>
      There are {repos.length} repos.
      <ol>
        { repos.map((repo) => <li><a href={ repo.url }>{ repo.repo_name }</a></li>) }
      </ol>
    </div>
  )
  }

export default RepoList;