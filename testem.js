/* eslint-env node */
module.exports = {
  "test_page": "tests/index.html?hidepassed",
  "disable_watching": true,
  "launch_in_ci": [
    "Chrome"
  ],
  "launch_in_dev": [
    "Chrome"
  ],
  "browser_args": {
    "Chrome": [
      // TODO: Investigate headless running (https://github.com/testem/testem/issues/1106)
      // "--version",
      // "--headless",
      // "--disable-gpu",
      // "--remote-debugging-port=9222"
    ]
  }
};
