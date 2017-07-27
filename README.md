# Skypad

Simple, real time collaborative notepad on the cloud. Quickyl built in an hour with [Skygear](https://skygear.io)

* Start using: https://skygear-demo.github.io/skypad

---

# Features

* Handy - Create a pad instantly.
* Simple UI - Neat, undistracting and responsive.
* Easy Sharing -  Share by URL, Twitter or FB.
* Collaboration - Real time sync across all platforms.
* Auto Save - Changes saved on the cloud automatically.

[Try it here](https://skygear-demo.github.io/skypad)

# Develop

* Edit the `config` dict at `app.js`

```
const config = {
  baseURL: "https://yoursite.com/", // To help generate a correct sharing URL
  skygearAPIEndpoint: "https://skypad.skygeario.com/", // API Endpoint
  skygearAPIKey: "xxxxc613xxxx4227xxxx6114a401xxxx", // API Key
  writerUser: "username", // the default user for creating app
  writerPass: "password"  // the default user password for creating app
}
```

* Sign up at [Skygear](https://portal.skygear.io/signup) to obtain the API Endpoint and API Key.
* Use `signupWithUserName` to create your own writerUser at Skygear.  


# Deploy

This app can be deployed on localhost, AWS s3, Skygear hosting, GitHub Page or other static hosts.

* These files are required to deploy:
  * index.html
  * app.js
  * app.css

# Feedback and Contribution

Feel free to open any issue and PR. Contact at hello@skygear.io

### About Skygear

[Skygear](https://skygear.io) is a backend for building real-time and cloud-based web/mobile app. Skypad is a perfect simple usecase.
