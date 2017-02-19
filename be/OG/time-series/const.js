const XML =
  '<?xml version=\'1.0\' encoding=\'UTF-8\'?>' +
  '<fudgeEnvelope>' +
  '%body%' +
  '</fudgeEnvelope>';

const SEARCH = {
  objectIds: '<objectIds type="string">%objectIds%</objectIds>',
  externalIdSearch: '<externalIdSearch type="string">%externalIdSearch%</externalIdSearch>',
  externalIdValue: '<externalIdValue type="string">%externalIdValue%</externalIdValue>',
  validityDate: '<validityDate type="string">%validityDate%</validityDate>',
  name: '<name type="string">%name%</name>',
  dataSource: '<dataSource type="string">%dataSource%</dataSource>',
  dataProvider: '<dataProvider type="string">%dataProvider%</dataProvider>',
  dataField: '<dataField type="string">%dataField%</dataField>',
  observationTime: '<observationTime type="string">%observationTime%</observationTime>',
  uniqueIdScheme: '<uniqueIdScheme type="string">%uniqueIdScheme%</uniqueIdScheme>',
  pagingRequest: '<pagingRequest type="string">%pagingRequest%</pagingRequest>',
  versionCorrection: '<versionCorrection type="string">%versionCorrection%</versionCorrection>'
};

module.exports = {
  REQUEST: {
    PATH_INFO: '/jax/components/HistoricalTimeSeriesMaster/default/infos/',
    PATH_DATA_POINTS: '/jax/components/HistoricalTimeSeriesMaster/default/dataPoints/',
    HEADERS_XML: {
      'Accept': 'application/xml',
      'Content-Type': 'application/xml'
    },
    OPTIONS: {
      protocol: 'http:',
      hostname: '80.241.212.28', // process.env.OG_HOST || '127.0.0.1',
      port: 8080, // process.env.OG_PORT || 8090,
      path: '', // PATH | PATH_SEARCH ...
      method: null, // GET | POST | DELETE
      headers: {}
    },
    XML: XML,
    CREATE: null,
    READ: null,
    UPDATE: null,
    DELETE: null,
    SEARCH: SEARCH
  },
  RESPONSE: {

  }
};
