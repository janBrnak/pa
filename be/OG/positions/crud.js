const http = require('http');
const xml2js = require('xml2js');
const { map } = require('async/map');
const {REQUEST} = require('./const.js');

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
    var options = _getOptions(REQUEST.PATH, 'POST', REQUEST.HEADERS_XML);
    var body = _getXML('CREATE')
            .replace('%quantity%', position.quantity)
            .replace('%scheme%', position.scheme)
            .replace('%value%', position.value);

    _request(options, body, callback);
  }

  // read
  function read(id, callback) {
    var options = _getOptions(REQUEST.PATH + id, 'GET', REQUEST.HEADERS_XML);

    _request(options, null, callback);
  }

  // update
  function update(position, callback) {
    read(position.id, (response) => {
      var uniqueId = response.data && response.data.uniqueId ? response.data.uniqueId : 0;
      var options = _getOptions(REQUEST.PATH + position.id, 'POST', REQUEST.HEADERS_XML);
      var body = _getXML('UPDATE')
              .replace('%uniqueId%', uniqueId)
              .replace('%quantity%', position.quantity)
              .replace('%scheme%', position.scheme)
              .replace('%value%', position.value);

      _request(options, body, callback);
    });
  }

  // delete
  function remove(id, callback) {
    var options = _getOptions(REQUEST.PATH + id, 'DELETE', REQUEST.HEADERS_XML);

    _request(options, null, callback);
  }

  // list
  function list(params, callback) {
    var options = _getOptions(REQUEST.PATH_SEARCH, 'GET', REQUEST.HEADERS_JSON);
    var body = _getXML('SEARCH', params);

    _request(options, body, callback);
  }

  function _getXML(ACTION, params) {
    var xml = REQUEST.XML;
    
    if (ACTION && typeof REQUEST[ACTION] === "string") {
      xml = xml.replace('%body%', REQUEST[ACTION]);
    } else if (ACTION && typeof REQUEST[ACTION] === "object" && params) {
      let i = null;
      let body = '';

      for(i in params) {
        if (params[i] && REQUEST[ACTION][i]) {
          body += REQUEST[ACTION][i].replace('%' + i + '%', params[i]);
        }
      };

      xml = xml.replace('%body%', body);
    } else {
      xml = xml.replace('%body%', '');
    }

    return xml;
  }

  function _getOptions(path, method, headers) {
    var options = REQUEST.OPTIONS;

    options.path = path;
    options.method = method;
    options.headers = headers;

    return options;
  }

  function _request(options, body, callback) {
    var data = '';
    var request = http.request(options);

    request.on('error', (e) => {
      console.log(`problem with request: ${e.message}`);
    });

    request.on('response', (message) => {
      _response(options.method, message, callback);
    });

    if (body) {
      request.write(body);
    }
    
    request.end();

    return request;
  }

  function _response(method, response, callback) {
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
          unifyData = _unifyXMLResponse(object);
        });
      } else if (data && headerContentType === 'application/json' && [200, 201, 202, 203].indexOf(statusCode) >= 0) {
        unifyData = _unifyJSONResponse(JSON.parse(data));
      } else {
        unifyData = data;
      }

      _callback(statusCode, method, headerMessage, unifyData, callback);
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
    var envelope = response.fudgeEnvelope;

    output.id = envelope.position.uniqueId.replace(/(DbPos\~)([0-9]+)(\~[0-9]+)/, '$2');
    output.uniqueId = envelope.position.uniqueId;
    output.name = envelope.position.name;
    output.quantity = envelope.position.quantity;
    output.scheme = envelope.position.securityLink.externalId.ID.Scheme;
    output.value = envelope.position.securityLink.externalId.ID.Value;
    output.attributes = envelope.position.attributes;
    output.trades = envelope.position.trades;
    output.versionFromInstant = envelope.versionFromInstant;
    output.correctionFromInstant = envelope.correctionFromInstant;

    return output;
  }

  function _unifyJSONResponse(response) {
    var output = {};
    var split = [];

    output.header = response.header;
    output.positions = [];

    if (response.data && response.data.length) {
      response.data.forEach((value) => {
        split = value.split('|');

        output.positions.push({
          id: split[0],
          name: split[1],
          quantity: split[2],
          trades: split[3]
        });
      });
    }

    return output;
  }
}
