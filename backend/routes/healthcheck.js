const router = require('express').Router();
const process = require('process');

// https://cloud.ibm.com/docs/node?topic=node-node-healthcheck
// https://betterprogramming.pub/how-to-add-a-health-check-to-your-node-js-app-5154d13b969e

router.get('/', async (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  };
  
  try {
    res.status(200).send(healthcheck);
  } catch (e) {
    healthcheck.message = e;
    res.status(503).send();
  };
});

module.exports = router;
