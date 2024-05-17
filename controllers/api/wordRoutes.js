const router = require("express").Router();
const withAuthorization = require("../../utils/auth");

router.get("/", async (req, res) => {
  try {
    const randomWord = await fetch("https://random-word-api.herokuapp.com/word?number=1");
    const wordData = await randomWord.json();
    
    if (!wordData) {
      res.status(400).json({ message: "Sorry, we couldn't get a random word for you to guess" });
      return;
    }

    res.status(200).json(wordData[0]);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;