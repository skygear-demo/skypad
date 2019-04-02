# Skypad

Simple, real time collaborative notepad on the cloud. First version quickly built in an hour with [Skygear](https://skygear.io)

#### Try now:
* Create a new note: https://skygear-demo.github.io/skypad

![Code highlight Preview](https://user-images.githubusercontent.com/1916493/28747571-e14a8030-74d4-11e7-8c48-6f2edc1abc0c.gif)

## Non-CDN version
* This version's libraries are not served from any CDN. Suitable for independent deployment.

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

```javascript
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
  * `index.html` - Main layout
  * `app.js` - Main app logic
  * `app.css` - CSS styling
  * `/vendor` - Required external library files

# Versions

You can view the previous version as tags, e.g. `v0.1`, `v0.2`

* `mvp` Quick first usable version
* `v0.1` Social sharing and UI fixed
* `v0.2` Code highlighting
* `v0.3` Create new pad and pad title
* `v1.0` List of my notes (Automatically managed)
* `v1.1` **(Upcoming)** Private notes

# Feedback and Contribution

Feel free to open any issue and PR. Contact at hello@skygear.io

### Credits & Thanks

* Code highlighting powered by [CodeFlask](https://github.com/kazzkiq/CodeFlask.js) by [kazzkiq](https://twitter.com/kazzkiq). That's awesome.

* CSS and base style: [MUI](https://www.muicss.com/) a lightweight material framework.

* I didn't use complex JS framework but [zepto.js](http://zeptojs.com/) for quick hacks and keep it lightweight.

### Mentions

* [Discussion on HN](https://news.ycombinator.com/item?id=14864089)

<a href="https://www.sideprojectors.com/project/project/6509/skypad" alt="Skypad @sideprojectors" target="_blank"><img src="https://www.sideprojectors.com/img/logo.png" alt="Skypad @SideProjectors" width="200px"></a>

### About Skygear

[Skygear](https://skygear.io) is a backend for building real-time and cloud-based web/mobile app. Skypad is a perfect simple usecase.
