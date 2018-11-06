# User Analytics (JavaScript)

## Installation

```sh
npm install --save git+https://github.com/dayindustries/user-analytics-js.git

# Or,
yarn add git+https://github.com/dayindustries/user-analytics-js.git
```

## Usage

### In Node.JS

```javascript
var UserAnalytics = require('./index')
var userAnalytics = new UserAnalytics({
  endpoint: 'https://some.host',
  token: 'XXXX'
});

 var data = {
   event: "Signed Up",
   properties: {
     distinct_id: "1",
     time: "2018-09-10T15:24:49-07:00",
     ip: "71.198.38.200"
   }
 }
 
 userAnalytics.post('UserAnalytics', data).then(function (info) {
   console.log(info);
 });
```

### In Browser JS

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="index.js"></script>
    <script>
      var userAnalytics = new UserAnalytics({
        endpoint: 'https://sample.host',
        token: '1234'
      });

      var data = {
        event: "Signed Up",
        properties: {
          distinct_id: "1",
          time: "2018-09-10T15:24:49-07:00",
          ip: "71.198.38.200"
        }
      }

      userAnalytics.post('UserAnalytics', data).then(function (info) {
        console.log(info);
      });
    </script>
  </head>
</html>
```

Read the comments in `index.js` for more usage examples.
