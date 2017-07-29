# Skypad

Simple, real time collaborative notepad on the cloud. 

First version quickly built in an hour with [Skygear](https://skygear.io)

* Start using: https://skygear-demo.github.io/skypad

![Code highlight Preview](https://user-images.githubusercontent.com/1916493/28747571-e14a8030-74d4-11e7-8c48-6f2edc1abc0c.gif)

---

# Features

* Handy - Create a pad instantly.
* Simple UI - Neat, undistracting and responsive.
* Easy Sharing -  Share by URL, Twitter or FB.
* Collaboration - Real time sync across all platforms.
* Auto Save - Changes saved on the cloud automatically.
* Syntax Highligting - Support JavaScript, C, HTML and CSS. More comming.

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

### Credits & Thanks

* Code highlighting powered by [CodeFlask](https://github.com/kazzkiq/CodeFlask.js) by [kazzkiq](https://twitter.com/kazzkiq). That's awesome.

* CSS and base style: [MUI](https://www.muicss.com/) a lightweight material framework.

* I didn't use complex JS framework but [zepto.js](http://zeptojs.com/) for quick hacks and keep it lightweight.

### About Skygear

[Skygear](https://skygear.io) is a backend for building real-time and cloud-based web/mobile app. Skypad is a perfect simple usecase.
