const CREATE =
  '<?xml version=\'1.0\' encoding=\'UTF-8\'?>' +
  '<fudgeEnvelope>' +
  '</fudgeEnvelope>';

const UPDATE =
  '<?xml version=\'1.0\' encoding=\'UTF-8\'?>' +
  '<fudgeEnvelope>' +
  '</fudgeEnvelope>';

const SEARCH =
  '<?xml version=\'1.0\' encoding=\'UTF-8\'?>' +
  '<fudgeEnvelope>' +
      '<objectIds type="string"></objectIds>' +
      '<externalIdSearch type="string"></externalIdSearch>' +
      '<externalIdValue type="string">SPY</externalIdValue>' +
      '<externalIdScheme type="string">Ticker</externalIdScheme>' +
      '<attributes type="string"></attributes>' +
      '<name type="string"></name>' +
      '<securityType type="string">ETF</securityType>' +
      '<sortOrder type="string"></sortOrder>' +
      '<fullDetail type="string"></fullDetail>' +
      '<uniqueIdScheme type="string"></uniqueIdScheme>' +
  '</fudgeEnvelope>';

module.exports = { 
  REQUEST: {
    PATH: '/jax/components/SecurityMaster/default/securities/',
    PATH_SEARCH: '/jax/securities.json',
    HEADERS_JSON: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    HEADERS_XML: {
      'Accept': 'application/xml',
      'Content-Type': 'application/xml'
    },
    OPTIONS: {
      protocol: 'http:',
      hostname: process.env.OG_HOST || '127.0.0.1',
      port: process.env.OG_PORT || 8090,
      path: '', // PATH | PATH_SEARCH ...
      method: null, // GET | POST | DELETE
      headers: {}  // HEADERS_JSON || HEADERS_XML
    },
    CREATE: CREATE,
    READ: null,
    UPDATE: UPDATE,
    DELETE: null
  },
  RESPONSE: {

  }
};