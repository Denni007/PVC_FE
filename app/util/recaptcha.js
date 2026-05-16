const https = require("node:https");
const querystring = require("node:querystring");

/**
 * Verifies a Google reCAPTCHA v2 "I'm not a robot" response token.
 * @param {string} token
 * @returns {Promise<{ success: boolean; [key: string]: unknown }>}
 */
function verifyRecaptchaV2(token) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const postData = querystring.stringify({
    secret,
    response: token,
  });

  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: "www.google.com",
        path: "/recaptcha/api/siteverify",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": Buffer.byteLength(postData),
        },
      },
      (res) => {
        let body = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          body += chunk;
        });
        res.on("end", () => {
          try {
            resolve(JSON.parse(body));
          } catch (err) {
            reject(err);
          }
        });
      }
    );
    req.on("error", reject);
    req.write(postData);
    req.end();
  });
}

module.exports = { verifyRecaptchaV2 };
