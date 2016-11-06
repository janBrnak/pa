const http = require('http');
const xml2js = require('xml2js');
const {map} = require('async');
const {REQUEST} = require('./const.js');
const Positions = require('../positions/crud.js');

const positions = Positions();

module.exports = () => {

  return {
    create: create,
    read: read,
    update: update,
    remove: remove,
    list: list
  }

  // create
  function create(portfolio, positionIds, callback) {
    var options = _getOptions(REQUEST.PATH, 'POST', REQUEST.HEADERS_XML);
    var body = _getXML('CREATE')
            .replace('%name%', portfolio.name)
            .replace('%rootName%', portfolio.rootName)
            .replace('%positionIds%', _createPositionIds(positionIds));  // positionIds

    _request(options, body, callback);
  }

  // read
  function read(id, callback) {
    var options = _getOptions(REQUEST.PATH + id, 'GET', REQUEST.HEADERS_XML);

    _request(options, null, callback);
  }

  // update
  function update(portfolio, positionIds, callback) {

    read(portfolio.id, (response) => {
      var uniqueId = response.data && response.data.uniqueId ? response.data.uniqueId : 0;
      var options = _getOptions(REQUEST.PATH + portfolio.id, 'POST', REQUEST.HEADERS_XML);
      var body = _getXML('UPDATE')
              .replace('%uniqueId%', uniqueId)
              .replace('%name%', portfolio.name)
              .replace('%rootName%', portfolio.rootName)
              .replace('%positionIds%', _createPositionIds(positionIds || response.data.rootNode.positionIds));  // positionIds

      _request(options, body, callback);
    });
  }

  // delete
  function remove(id, callback) {
    var options = _getOptions(REQUEST.PATH + id, 'DELETE', REQUEST.HEADERS_XML);

    _request(options, null, callback);
  }

  // list/search
  function list(params, callback) {
    var options = _getOptions(REQUEST.PATH.replace('portfolios/', 'portfolioSearches/'), 'POST', REQUEST.HEADERS_XML);
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

  function _request(options, body, callback) {console.log(options);
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
          if (object.fudgeEnvelope.documents) {
            unifyData = _unifyListXMLResponse(object);  
          } else {
            unifyData = _unifyXMLResponse(object);
          }
        });
      } else if (data && headerContentType === 'application/json' && [200, 201, 202, 203].indexOf(statusCode) >= 0) {
        unifyData = _unifyJSONResponse(JSON.parse(data));
      } else {
        unifyData = data;
      }

      if (typeof unifyData === 'object' && unifyData.rootNode && unifyData.rootNode.positionIds.length) {
        map(unifyData.rootNode.positionIds, _mapGetPositions, function(error, positions) {
          unifyData.rootNode.positions = [];

          if (positions.length) {
            positions.forEach((position) => {
              if (position && position.uniqueId) {
                unifyData.rootNode.positions.push(position);
              }
            });
          }

          _callback(statusCode, method, headerMessage, unifyData, callback);
        });
      } else {
        _callback(statusCode, method, headerMessage, unifyData, callback);
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
    var output = {};
    var envelope = response.fudgeEnvelope;
    var portfolios = response.fudgeEnvelope.documents.fudgeField;

    output.paging = envelope.paging;
    output.portfolios = [];

    if (portfolios.length) {
      portfolios.forEach((portfolio) => {
        output.portfolios.push(_unifyXMLResponse({fudgeEnvelope: portfolio}));
      });
    }

    return output;
  }

  function _unifyXMLResponse(response) {
    var output = {};
    var envelope = response.fudgeEnvelope;
    var positionIds = [];

    if (typeof envelope.portfolio.rootNode.positionIds.fudgeField === 'string') {
      positionIds = [envelope.portfolio.rootNode.positionIds.fudgeField];
    } else {
      positionIds = envelope.portfolio.rootNode.positionIds.fudgeField;
    }
    
    output.id = envelope.portfolio.uniqueId.replace(/(DbPrt\~)([0-9]+)(\~[0-9]+)/, '$2');
    output.uniqueId = envelope.portfolio.uniqueId;
    output.name = envelope.portfolio.name;
    output.rootNode = envelope.portfolio.rootNode;
    output.rootNode.positionIds = positionIds;
    output.attributes = envelope.portfolio.attributes;
    output.visibility = envelope.visibility.fudgeField1;
    output.versionFromInstant = envelope.versionFromInstant;
    output.correctionFromInstant = envelope.correctionFromInstant;

    return output;
  }

  function _unifyJSONResponse(response) {
    var output = {};

    output = response;

    return output;
  }

  function _createPositionIds(positionIds) {
    var idPattern = '<fudgeField type="string">%id%</fudgeField>';
    var ids = '';
    var output = '';

    if (positionIds instanceof Array && positionIds.length) {
      positionIds.forEach((id) => {
        ids += idPattern.replace('%id%', id);
      });
      output = REQUEST.POSITION_IDS.replace('%ids%', ids);
    }

    return output;
  }
}
