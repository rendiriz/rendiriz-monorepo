const PROJECT_ID = 14510167;

function getData() {
  return fetch(
    `https://gitlab.com/api/v4/projects/${PROJECT_ID}/repository/commits/dev`,
  ).then((response) => response.json());
}

getData().then((data) => {
  console.log(data);
});
