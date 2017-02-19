const XML =
  '<?xml version=\'1.0\' encoding=\'UTF-8\'?>' +
  '<fudgeEnvelope>' +
  '%body%' +
  '</fudgeEnvelope>';

const CREATE =
  '<portfolio type="message">' +
    '<name type="string">%name%</name>' +
    '<rootNode type="message">' +
      '<name type="string">%rootName%</name>' +
      '<childNodes type="message"/>' +
      '%positionIds%' +
    '</rootNode>' +
    '<attributes type="message"/>' +
  '</portfolio>' +
  '<visibility type="message">' +
    '<fudgeField0 ordinal="0" type="string">com.opengamma.master.DocumentVisibility</fudgeField0>' +
    '<fudgeField1 ordinal="1" type="string">VISIBLE</fudgeField1>' +
  '</visibility>';

const UPDATE =
  '<uniqueId type="string">%uniqueId%</uniqueId>' +
  '<portfolio type="message">' +
    '<name type="string">%name%</name>' +
    '<rootNode type="message">' +
      '<name type="string">%rootName%</name>' +
      '<childNodes type="message"/>' +
      '%positionIds%' +
    '</rootNode>' +
    '<attributes type="message"/>' +
  '</portfolio>';

const SEARCH = {
  portfolioObjectIds: '<portfolioObjectIds type="string">%portfolioObjectIds%</portfolioObjectIds>',
  nodeObjectIds: '<nodeObjectIds type="string">%nodeObjectIds%</nodeObjectIds>',
  name: '<name type="string">%name%</name>',
  sortOrder: '<sortOrder type="string">%sortOrder%</sortOrder>',
  depth: '<depth type="string">%depth%</depth>',  // -1
  includePositions: '<includePositions type="string">%includePositions%</includePositions>',   // true
  visibility: '<visibility type="string">%visibility%</visibility>', // VISIBLE
  uniqueIdScheme: '<uniqueIdScheme type="string">%uniqueIdScheme%</uniqueIdScheme>',
  pagingRequest: '<pagingRequest type="string">%pagingRequest%</pagingRequest>',
  versionCorrection: '<versionCorrection type="string">%versionCorrection%</versionCorrection>'
};


const POSITION_IDS =
  '<positionIds type="message">' +
    '%ids%' + // <fudgeField type="string">%id%</fudgeField>
  '</positionIds>';

module.exports = {
  REQUEST: {
    PATH: '/jax/components/PortfolioMaster/default/portfolios/',
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
    CREATE: CREATE,
    READ: null,
    UPDATE: UPDATE,
    DELETE: null,
    SEARCH: SEARCH,
    POSITION_IDS: POSITION_IDS
  },
  RESPONSE: {

  }
};

/** PORTFOLIOS http://localhost:8090/jax/components/PortfolioMaster/default
**********************************

CREATE
----------------------------------
POST: /jax/components/PortfolioMaster/default/portfolios/

REQUEST:
Content-Type: application/xml
Accept: application/xml

<?xml version='1.0' encoding='UTF-8'?>
<fudgeEnvelope>
  <portfolio type="message">
    <name type="string">Jano Test</name>
    <rootNode type="message">
      <name type="string">Jano Root</name>
      <positionIds type="message">
        <fudgeField type="string">DbPos~1002</fudgeField>
      </positionIds>
    </rootNode>
    <attributes type="message"/>
  </portfolio>
  <visibility type="message">
    <fudgeField0 ordinal="0" type="string">com.opengamma.master.DocumentVisibility</fudgeField0>
    <fudgeField1 ordinal="1" type="string">VISIBLE</fudgeField1>
  </visibility>
  <fudgeField0 ordinal="0" type="string">com.opengamma.master.portfolio.PortfolioDocument</fudgeField0>
  <fudgeField0 ordinal="0" type="string">com.opengamma.master.AbstractDocument</fudgeField0>
  <fudgeField0 ordinal="0" type="string">org.joda.beans.impl.direct.DirectBean</fudgeField0>
</fudgeEnvelope>

RESPONSE:
<?xml version='1.0' encoding='UTF-8'?>
<fudgeEnvelope>
  <versionFromInstant type="datetime">2016-08-24T22:22:58.392009Z</versionFromInstant>
  <correctionFromInstant type="datetime">2016-08-24T22:22:58.392009Z</correctionFromInstant>
  <portfolio type="message">
    <uniqueId type="string">DbPrt~1014~0</uniqueId>
    <name type="string">Jano2 Test</name>
    <rootNode type="message">
      <uniqueId type="string">DbPrt~1015~0</uniqueId>
      <portfolioId type="string">DbPrt~1014~0</portfolioId>
      <name type="string">Jano2 Root</name>
      <childNodes type="message"/>
      <positionIds type="message"/>
    </rootNode>
    <attributes type="message"/>
  </portfolio>
  <uniqueId type="string">DbPrt~1014~0</uniqueId>
  <visibility type="message">
    <fudgeField0 ordinal="0" type="string">com.opengamma.master.DocumentVisibility</fudgeField0>
    <fudgeField1 ordinal="1" type="string">VISIBLE</fudgeField1>
  </visibility>
  <fudgeField0 ordinal="0" type="string">com.opengamma.master.portfolio.PortfolioDocument</fudgeField0>
  <fudgeField0 ordinal="0" type="string">com.opengamma.master.AbstractDocument</fudgeField0>
  <fudgeField0 ordinal="0" type="string">org.joda.beans.impl.direct.DirectBean</fudgeField0>
</fudgeEnvelope>

READ
----------------------------------
GET: /jax/components/PortfolioMaster/default/portfolios/{portfolioId}  //DbPrt~1010

REQUEST:
Content-Type: application/xml
Accept: application/xml

RESPONSE:
<?xml version='1.0' encoding='UTF-8'?>
<fudgeEnvelope>
  <versionFromInstant type="datetime">2016-08-24T20:51:08.932992Z</versionFromInstant>
  <correctionFromInstant type="datetime">2016-08-24T20:51:08.932992Z</correctionFromInstant>
  <portfolio type="message">
    <uniqueId type="string">DbPrt~1010~2</uniqueId>
    <name type="string">Jano Test</name>
    <rootNode type="message">
      <uniqueId type="string">DbPrt~1011~2</uniqueId>
      <portfolioId type="string">DbPrt~1010~2</portfolioId>
      <name type="string">Jano Root</name>
      <childNodes type="message"/>
      <positionIds type="message">
        <fudgeField type="string">DbPos~1002</fudgeField>
      </positionIds>
    </rootNode>
    <attributes type="message"/>
  </portfolio>
  <uniqueId type="string">DbPrt~1010~2</uniqueId>
  <visibility type="message">
    <fudgeField0 ordinal="0" type="string">com.opengamma.master.DocumentVisibility</fudgeField0>
    <fudgeField1 ordinal="1" type="string">VISIBLE</fudgeField1>
  </visibility>
  <fudgeField0 ordinal="0" type="string">com.opengamma.master.portfolio.PortfolioDocument</fudgeField0>
  <fudgeField0 ordinal="0" type="string">com.opengamma.master.AbstractDocument</fudgeField0>
  <fudgeField0 ordinal="0" type="string">org.joda.beans.impl.direct.DirectBean</fudgeField0>
</fudgeEnvelope>

UPDATE
----------------------------------
POST: http://localhost:8090/jax/components/PortfolioMaster/default/portfolios/{portfolioId}  //DbPrt~1010

REQUEST:
Content-Type: application/xml
Accept: application/xml

<?xml version='1.0' encoding='UTF-8'?>
<fudgeEnvelope>
  <versionFromInstant type="datetime">2016-08-24T20:46:23.697853Z</versionFromInstant>
  <correctionFromInstant type="datetime">2016-08-24T20:46:23.697853Z</correctionFromInstant>
  <portfolio type="message">
    <uniqueId type="string">DbPrt~1010~8</uniqueId>
    <name type="string">Jano Test</name>
    <rootNode type="message">
      <uniqueId type="string">DbPrt~1011~0</uniqueId>
      <portfolioId type="string">DbPrt~1010~0</portfolioId>
      <name type="string">Jano Root</name>
      <childNodes type="message"/>
      <positionIds type="message">
        <fudgeField type="string">DbPos~1002</fudgeField>
      </positionIds>
    </rootNode>
    <attributes type="message"/>
  </portfolio>
  <uniqueId type="string">DbPrt~1010~8</uniqueId>
  <visibility type="message">
    <fudgeField0 ordinal="0" type="string">com.opengamma.master.DocumentVisibility</fudgeField0>
    <fudgeField1 ordinal="1" type="string">VISIBLE</fudgeField1>
  </visibility>
  <fudgeField0 ordinal="0" type="string">com.opengamma.master.portfolio.PortfolioDocument</fudgeField0>
  <fudgeField0 ordinal="0" type="string">com.opengamma.master.AbstractDocument</fudgeField0>
  <fudgeField0 ordinal="0" type="string">org.joda.beans.impl.direct.DirectBean</fudgeField0>
</fudgeEnvelope>

RESPONSE:
<?xml version='1.0' encoding='UTF-8'?>
<fudgeEnvelope>
  <versionFromInstant type="datetime">2016-08-24T22:32:25.284846Z</versionFromInstant>
  <correctionFromInstant type="datetime">2016-08-24T22:32:25.284846Z</correctionFromInstant>
  <portfolio type="message">
    <uniqueId type="string">DbPrt~1010~10</uniqueId>
    <name type="string">Jano Test</name>
    <rootNode type="message">
      <uniqueId type="string">DbPrt~1011~10</uniqueId>
      <portfolioId type="string">DbPrt~1010~10</portfolioId>
      <name type="string">Jano Root</name>
      <childNodes type="message"/>
      <positionIds type="message">
        <fudgeField type="string">DbPos~1002</fudgeField>
      </positionIds>
    </rootNode>
    <attributes type="message"/>
  </portfolio>
  <uniqueId type="string">DbPrt~1010~10</uniqueId>
  <visibility type="message">
    <fudgeField0 ordinal="0" type="string">com.opengamma.master.DocumentVisibility</fudgeField0>
    <fudgeField1 ordinal="1" type="string">VISIBLE</fudgeField1>
  </visibility>
  <fudgeField0 ordinal="0" type="string">com.opengamma.master.portfolio.PortfolioDocument</fudgeField0>
  <fudgeField0 ordinal="0" type="string">com.opengamma.master.AbstractDocument</fudgeField0>
  <fudgeField0 ordinal="0" type="string">org.joda.beans.impl.direct.DirectBean</fudgeField0>
</fudgeEnvelope>

DELETE
----------------------------------
DELETE :/jax/components/PortfolioMaster/default/portfolios/{portfolioId}

REQUEST:
Content-Type: application/xml
Accept: application/xml

RESPONSE:
empty
**/
