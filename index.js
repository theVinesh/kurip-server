import express from "express";
const app = express();

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

app.get("/api/kurips", (req, res) => res.json(sample_kurips));

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Server running on ${port}, http://localhost:${port}`)
);
