const express = require("express");
const path = require("path");
const axios = require("axios");

const app = express();

app.use(express.static(path.join(__dirname, "public"), { maxAge: 0 }));

const sample_kurips = [
  {
    id: 1,
    title: "First kurip",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Sed euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Sed euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Sed euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Sed euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl.",
    last_modified: 1695945095,
  },
  {
    id: 2,
    body: "Kurip with no title",
    last_modified: 1695945120,
  },
  {
    id: 3,
    title: "Short kurip",
    body: "Lorem ipsum dolor sit amet.",
    last_modified: 1695945180,
  },
  {
    id: 4,
    title: "No body",
    last_modified: 1695945220,
  },
  {
    id: 5,
    title: "Fifth kurip",
    body: "555555555555",
    last_modified: 1695945280,
  },
];

app.get("/api/kurips", (req, res) => {
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.json(sample_kurips);
});

const githubApiClient = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  },
});

app.get("/api/user", async (req, res) => {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : null;
    if (!token) res.status(401).json({ message: "No token provided" });
    
    const { avatar_url, name, url } = (
      await githubApiClient.get("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).data;

    res.json({ name, base_url: url, avatar_url });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Server running on ${port}, http://localhost:${port}`)
);

module.exports = app;
