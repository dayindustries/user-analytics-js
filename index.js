;(function () {

var fetch;
var headers;
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  fetch = require('node-fetch');
  Headers = fetch.Headers;
} else {
  fetch = window.fetch;
  Headers = window.Headers;
}

/**
 * Creates a UserAnalytics service object.
 * @constructor
 * @param {object} options - An object of options for the service object.
 * @param {string} options.token - An Amazon API Gateway token.
 * @param {string} options.endpoint - An Amazon API Gateway endpoint.
 * @example
 * var userAnalytics = new UserAnalytics({
 *   token: '...',
 *   endpoint: 'https://4i0ifsvq23.execute-api.us-west-2.amazonaws.com/staging'
 * });
 */
function UserAnalytics (options) {
  var options = options || {};
  this.token = options.token;
  if (!this.token) {
    throw new Error('token must be provided');
  }

  this.endpoint = options.endpoint;

  if (!this.endpoint) {
    throw new Error('endpoint must be provided');
  }

  this.headers = new Headers({
    'x-api-key': this.token,
    'Content-Type': 'application/json'
  });
}

/**
 * Get a list of user analytics stream corresponding to AWS Kinesis streams.
 * @example
 * userAnalytics.list().then(function (info) {
 *   console.log(info);
 * });
 */
UserAnalytics.prototype.list = function () {
  return fetch([this.endpoint, '/streams'].join(''), {
    method: 'GET',
    headers: this.headers
  })
    .then(function(response) {
      return response.json();
    });
};

/**
 * Describes a user analytics stream corresponding to an AWS Kinesis stream.
 * @param {string} streamName - The stream to describe.
 * @example
 * userAnalytics.describe('UserAnalytics').then(function (info) {
 *   console.log(info);
 * });
 */
UserAnalytics.prototype.describe = function (streamName) {
  return fetch([this.endpoint, '/streams/', streamName].join(''), {
    method: 'GET',
    headers: this.headers
  })
    .then(function(response) {
      return response.json();
    });
};

/**
 * Submits a UserAnalytics event.
 * @param {string} streamName - The stream to which we will submit.
 * @param {object} data - The analytics data to submit.
 * @example
 * var data = {
 *   event: "Signed Up",
 *   properties: {
 *     distinct_id: "1",
 *     time: "2018-09-10T15:24:49-07:00",
 *     ip: "71.198.38.200"
 *   }
 * }
 *
 * userAnalytics.post('UserAnalytics', data).then(function (info) {
 *   console.log(info);
 * });
 */
UserAnalytics.prototype.post = function (streamName, data) {
  return fetch([this.endpoint, '/streams/', streamName].join(''), {
    method: 'POST',
    headers: this.headers,
    body: JSON.stringify(data)
  })
    .then(function(response) {
      return response.json();
    });
};

/**
 * Converts a `Date` object into a `String` timestamp that Athena understands.
 * @param {Date} date - The `Date` object to convert.
 * @example
 * var date = new Date();
 * date.toISOString().replace(/T/, ' ').replace(/Z/, '');
 * //=> '2018-11-06 21:45:32.080'
 */
UserAnalytics.toAthenaTimestamp = function (date) {
  return date.toISOString().replace(/T/, ' ').replace(/Z/, '');
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = UserAnalytics;
} else {
  window.UserAnalytics = UserAnalytics;
}

})();
