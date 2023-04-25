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
let save = (repos) => {
  // This function should save a repo or repos to the MongoDB
  if (repos.length === 0) return undefined;
  // Retrieve this user's saved repos from the database
  // and create an array of their ids to check against
  // Create a to-save array that is a filtered version of repos
  // checking whether the saved repos contains each repo
  // Save each repo's relevant info into a document
  const username = repos[0].owner.login;
  return Repo.find({ user_name: username })
  .then((savedRepos) => {
    const noReposFound = savedRepos.length === 0;
    const savedIds = savedRepos.map((repo) => repo.repo_id);
    const toSave = (noReposFound) ? repos : repos.filter((repo) => !savedIds.contains(repo.repo_id));
    const reposForDB = toSave.map((repoToSave) => {
      return {
        repo_id: repoToSave.id,
        repo_name: repoToSave.name,
        url: repoToSave.html_url,
        description: repoToSave.description,
        user_id: repoToSave.owner.id,
        user_name: repoToSave.owner.login,
        popularity: repoToSave.forks_count
        }
      });
    return Repo.insertMany(reposForDB, (err) => {
      if (err) console.log("There was an error inserting into the database.");
    });
  });
};

let getTop = (limit) => {
  return Repo.aggregate([{ $sort: { popularity: -1, _id: 1} }])
  .then((repos) => {
    return repos.slice(0, limit);
  })
  .catch((err) => {
    console.log("There was an error getting the documents from the database");
  })
}

module.exports.save = save;
module.exports.getTop = getTop;