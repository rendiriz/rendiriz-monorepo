const PROJECT_ID = 14510167;

async function getData() {
  return await fetch(
    `https://gitlab.com/api/v4/projects/${PROJECT_ID}/repository/commits/dev`,
  );
}

getData()
  .then(async (response) => {
    const data = await response.json();
    console.log(data);
  })
  .catch(() => {
    process.exit(1);
  });
