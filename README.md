# Skypad

Built with [Skygear](https://skygear.io)

* To start using: https://skygear-demo.github.io/skypad

---

# Features

* Handy - Create a pad instantly
* Easy Sharing -  Share by URL, Twitter or FB
* Collaboration - Real time sync across all platforms
* Auto Save - Changes saved on the cloud automatically

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

# To deploy

This app can be deployed on AWS s3, Skygear hosting, GitHub Page or other static hosts.

* These files are required to deploy:
  * index.html
  * app.js
  * app.css
