const { argv } = require('yargs');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const PROJECT_ID = 14510167;

async function getData() {
  const { lref, lname, rref, rname } = argv;

  console.log(lref);
  console.log(lname);
  console.log(rref);
  console.log(rname);

  return await fetch(
    `https://gitlab.com/api/v4/projects/${PROJECT_ID}/repository/commits/dev`,
  );
}

getData()
  .then(async (response) => {
    const data = await response.json();
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
