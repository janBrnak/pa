import http from 'http';
import xml2js from 'xml2js';
import {map} from 'async';
import {REQUEST} from './const.js';


module.exports = () => {

  return {
    // create: create,
    read: read,
    // update: update,
    // remove: remove,
    list: list
  }

  // read
  function read(id, callback) {
    var options = this._getOptions(REQUEST.PATH + id, 'GET', REQUEST.HEADERS_XML);

    this._request(options, null, callback);
  }

  // list/search
  function list(params, callback) {
    var options = this._getOptions(REQUEST.PATH.replace('portfolios/', 'portfolioSearches/'), 'POST', REQUEST.HEADERS_XML);
    var body = this._getXML();
    var searchParams = REQUEST.SEARCH;

    this._request(options, body, callback);
  }

  function _getXML(ACTION) {
    var xml = REQUEST.XML;

    if (ACTION && REQUEST[ACTION]) {
      xml = xml.replace('%body%', REQUEST[ACTION]);
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
          if (object.fudgeEnvelope.documents) {
            unifyData = _._unifyListXMLResponse(object);  
          } else {
            unifyData = _._unifyXMLResponse(object);
          }
        });
      } else if (data && headerContentType === 'application/json' && [200, 201, 202, 203].indexOf(statusCode) >= 0) {
        unifyData = _._unifyJSONResponse(JSON.parse(data));
      } else {
        unifyData = data;
      }

      if (typeof unifyData === 'object' && unifyData.rootNode && unifyData.rootNode.positionIds.length) {
        map(unifyData.rootNode.positionIds, _._mapGetPositions, function(error, positions) {
          unifyData.rootNode.positions = [];

          if (positions.length) {
            positions.forEach((position) => {
              if (position && position.uniqueId) {
                unifyData.rootNode.positions.push(position);
              }
            });
          }

          _._callback(statusCode, method, headerMessage, unifyData, callback);
        });
      } else {
        _._callback(statusCode, method, headerMessage, unifyData, callback);
      }
    });
  }

  function _mapGetPositions(positionId, transformed) {
    positions.read(positionId, (response) => {
      transformed(false, response.data);
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

  function _unifyListXMLResponse(response) {
    var _ = this;
    var output = {};
    var envelope = response.fudgeEnvelope;
    // var portfolios = response.fudgeEnvelope.documents.fudgeField;

    // output.paging = envelope.paging;
    // output.portfolios = [];

    // if (portfolios.length) {
    //   portfolios.forEach((portfolio) => {
    //     output.portfolios.push(_._unifyXMLResponse({fudgeEnvelope: portfolio}));
    //   });
    // }

    output = response;

    return output;
  }

  function _unifyXMLResponse(response) {
    var output = {};
    var envelope = response.fudgeEnvelope;
    
    output = response;

    return output;
  }
}
