const http = require('http');
const xml2js = require('xml2js');
const map = require('async/map');
const REQUEST = require('./const.js');

module.exports = () => {

  return {
    create: create,
    read: read,
    update: update,
    remove: remove,
    list: list
  }

  // create
  function create(position, callback) {
    var options = this._getOptions(REQUEST.PATH, 'POST', REQUEST.HEADERS_XML);
    var create = REQUEST.CREATE
            .replace('%quantity%', position.quantity)
            .replace('%scheme%', position.scheme)
            .replace('%value%', position.value);

    this._request(options, create, callback);
  }

  // read
  function read(id, callback) {
    var options = this._getOptions(REQUEST.PATH + id, 'GET', REQUEST.HEADERS_XML);
    console.log(id, options);
    this._request(options, null, callback);
  }

  // update
  function update(position, callback) {
    var _ = this;

    _.read(position.id, (response) => {
      var uniqueId = response.data && response.data.uniqueId ? response.data.uniqueId : 0;
      var options = this._getOptions(REQUEST.PATH + position.id, 'POST', REQUEST.HEADERS_XML);
      var update = REQUEST.UPDATE
              .replace('%uniqueId%', uniqueId)
              .replace('%quantity%', position.quantity)
              .replace('%scheme%', position.scheme)
              .replace('%value%', position.value);

      _._request(options, update, callback);
    });
  }

  // delete
  function remove(id, callback) {
    var options = this._getOptions(REQUEST.PATH + id, 'DELETE', REQUEST.HEADERS_XML);

    this._request(options, null, callback);
  }

  // list
  function list(params, callback) {
    var options = this._getOptions(REQUEST.PATH_SEARCH, 'GET', REQUEST.HEADERS_JSON);
    var options = REQUEST.OPTIONS;

    options.path += '?minquantity=' + (params.minquantity ? params.minquantity : '');
    options.path += '&maxquantity=' + (params.maxquantity ? params.maxquantity : '');
    options.path += '&identifier=' + (params.identifier ? params.identifier : '');
    options.path += '&pgIdx=' + (params.pgIdx ? params.pgIdx : '');
    options.path += '&pgSze=' + (params.pgSze ? params.pgSze : '');

    this._request(options, null, callback);
  }

  function _getOptions(path, method, headers) {
    var options = REQUEST.OPTIONS;

    options.path = path;
    options.method = method;
    options.headers = headers;

    return options;
  }

  function _request(options, body, callback) {
    var _ = this;
    var data = '';
    var request = http.request(options);

    request.on('error', (e) => {
      console.log(`problem with request: ${e.message}`);
    });

    request.on('response', (message) => {
      _._response(options.method, message, callback);
    });

    if (body) {
      request.write(body);
    }
    
    request.end();

    return request;
  }

  function _response(method, response, callback) {
    var _ = this;
    var data = '';
    var unifyData = {};
    var statusCode = response.statusCode;
    var headerContentType = response.headers['content-type'];
    var headerMessage = response.headers['x-opengamma-exceptionmessage'] || null;

    response.setEncoding('utf8');
    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      if (data && headerContentType === 'application/xml' && [200, 201, 202, 203].indexOf(statusCode) >= 0) {
        xml2js.parseString(data, {async: false, ignoreAttrs: true, explicitArray: false, trim: true}, function (err, object) {
          unifyData = _._unifyXMLResponse(object);
        });
      } else if (data && headerContentType === 'application/json' && [200, 201, 202, 203].indexOf(statusCode) >= 0) {
        unifyData = _._unifyJSONResponse(JSON.parse(data));
      } else {
        unifyData = data;
      }

      _._callback(statusCode, method, headerMessage, unifyData, callback);
    });
  }
  
  function _callback(code, method, message, data, callback) {
    var response = {
      code: code,
      method: method,
      message: message,
      data: data
    }

    if (callback instanceof Function) {
      callback(response);
    }
    
    console.log('\n******************************************\n');
    console.log(response);
    console.log('\n******************************************\n');
  }

  function _unifyXMLResponse(response) {
    var output = {};

    // output.uniqueId = response.fudgeEnvelope.position.uniqueId;
    // output.name = response.fudgeEnvelope.position.name;
    // output.quantity = response.fudgeEnvelope.position.quantity;
    // output.scheme = response.fudgeEnvelope.position.securityLink.externalId.ID.Scheme;
    // output.value = response.fudgeEnvelope.position.securityLink.externalId.ID.Value;
    // output.attributes = response.fudgeEnvelope.position.attributes;
    // output.trades = response.fudgeEnvelope.position.trades;
    // output.versionFromInstant = response.fudgeEnvelope.versionFromInstant;
    // output.correctionFromInstant = response.fudgeEnvelope.correctionFromInstant;
    output = response;
    return output;
  }

  function _unifyJSONResponse(response) {
    var output = {};
    var split = [];

    // output.header = response.header;
    // output.positions = [];

    // if (response.data && response.data.length) {
    //   response.data.forEach((value) => {
    //     split = value.split('|');

    //     output.positions.push({
    //       id: split[0],
    //       name: split[1],
    //       quantity: split[2],
    //       trades: split[3]
    //     });
    //   });
    // }
    output = response;

    return output;
  }
}
