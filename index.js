import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";

// Function to mark a commit with a random date
const markCommit = (x, y, randomYear) => {
  const date = moment()
    .year(randomYear) // Set the year to the random year
    .subtract(1, "y")
    .add(1, "d")
    .add(x, "w")
    .add(y, "d")
    .format();
  const data = {
    date: date,
  };
  jsonfile.writeFile(path, data, () => {
    simpleGit()
      .add([path])
      .commit(date, { "--date": date })
      .push();
  });
};

// Recursive function to make commits with random dates
const makeCommits = (n) => {
  if (n === 0) return simpleGit().push();

  // Generate a random year between 1900 and the current year
  const randomYear = 1901;

  // Generate random week and day offsets
  const x = random.int(0, 54); // Random week offset
  const y = random.int(0, 6); // Random day offset

  // Create a random date based on the random year
  const date = moment()
    .year(randomYear) // Set the year to the random year
    .subtract(1, "y")
    .add(1, "d")
    .add(x, "w")
    .add(y, "d")
    .format();

  const data = {
    date: date,
  };

  console.log(`Committing with date: ${date}`);

  jsonfile.writeFile(path, data, () => {
    simpleGit()
      .add([path])
      .commit(date, { "--date": date }, makeCommits.bind(this, --n));
  });
};

// Start making commits
makeCommits(1);