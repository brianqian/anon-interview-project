const router = require('express').Router();
const fetch = require('node-fetch');

//This is purely to make the frontend project work without exposing the API
//This is not intended for production or deployment

router.get('/api', async (req, res) => {
  const result = await fetch(process.env.FRONTEND_API_LINK);
  const data = await result.json();
  res.json(data);
});

module.exports = router;
