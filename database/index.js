const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  repo_id: Number,
  repo_name: String,
  url: String,
  description: String,
  user_id: Number,
  user_name: String,
  popularity: Number
});

let Repo = mongoose.model('Repo', repoSchema);

// Input: a repos array from one user
// Output: returns a promise
// Side Effects: Save any previously-unsaved repos from this user
let save = (repos, username) => {
  // This function should save a repo or repos to the MongoDB

  // Retrieve this user's saved repos from the database
  // and create an array of their ids to check against
  // Create a to-save array that is a filtered version of repos
  // checking whether the saved repos contains each repo
  // Save each repo's relevant info into a document

  return Repo.find({ user_name: username })
  .then((savedRepos) => {
    const savedIds = savedRepos.map((repo) => repo.repo_id);
    const toSave = savedRepos.filter((repo) => !savedIds.contains(repo.repo_id));
    return Promise.all(toSave.map((repoToSave) => {
      const repo = new Repo({
        repo_id: repoToSave.id,
        repo_name: repoToSave.name,
        url: repoToSave.html_url,
        description: repoToSave.description,
        user_id: repoToSave.owner.id,
        user_name: repoToSave.owner.login,
        popularity: repoToSave.forks_count
      });
      return repo.save();
    }));
  });
};
module.exports.save = save;