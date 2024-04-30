const fs = require("fs");
const fsExtra = require("fs-extra");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const OpenAI = require("OpenAI");
const matter = require("gray-matter");

const expressMiddleWare = (router) => {
  router.use(bodyParser.urlencoded({ extended: false }));
  router.use(bodyParser.json());
  router.post("/api/lookup", (req, res) => {
    const filepath = req.body.path;
    const directory = req.body.directory;
    const parentDir = filepath.match(/[.]{2}/g);
    const isAbsolutePath = path.isAbsolute(filepath);
    if (!parentDir && !isAbsolutePath) {
      const absolutePath = path.join(__dirname, `../${directory}/` + filepath);
      if (fs.existsSync(absolutePath)) {
        res.statusCode = 409;
        res.send("Markdown already exist");
      } else {
        fsExtra.ensureFile(absolutePath, (err) => {
          if (err) {
            console.log(err);
            res.send("Error while writing markdown files");
          }
          res.send("OK");
        });
      }
    } else {
      res.statusCode = 404;
      res.send(
        "File not found. Check if the story is in src folder and reload the page.",
      );
    }
  });
  router.post("/api/docs", (req, res) => {
    const filepath = req.body.path;
    const parentDir = filepath.match(/[.]{2}/g);
    const isAbsolutePath = path.isAbsolute(filepath);
    if (!parentDir && !isAbsolutePath) {
      const docs = req.body.data;
      const directory = req.body.directory;
      fsExtra.ensureFile(
        path.join(__dirname, `../${directory}/` + filepath),
        (err) => {
          if (err) {
            console.log(err);
          }

          fs.writeFile(
            path.join(__dirname, `../${directory}/` + filepath),
            docs,
            (err) => {
              if (err) {
                console.log(err);
              }
              res.send("OK");
            },
          );
        },
      );
    } else {
      res.statusCode = 404;
      res.send(
        "File not found. If you have renamed the files or stories try reloading browser, and for the old content check the markdown folder.",
      );
    }
  });
  router.post("/api/translate", async (req, res) => {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        {
          role: "system",
          content: `Translate the following text from ${req.body.languageFrom} to ${req.body.languageTo} language while keeping the same markdown structure, but do not translate the front-matter keys and its values except the values of label, body, title and description. Do not include any explanation or commentary.`,
        },
        { role: "user", content: `${JSON.stringify(req.body.content)}` },
      ],
    });
    // JSON framework must be constructed with double-quotes. Double quotes within strings must be escaped with backslash, single quotes within strings will not be escaped.
    console.log(response.choices[0].message)
    res.send(response.choices[0].message);
  });
  router.post("/api/frontmatter", async (req, res) => {
    const str = fs.readFileSync(
      path.join(__dirname, `../${req.body.directory}/` + req.body.path),
      "utf8",
    );
    const formatted = matter(str);
    console.log(formatted);
    res.send(formatted);
  });
};

module.exports = expressMiddleWare;
