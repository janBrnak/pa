const XML =
  '<?xml version=\'1.0\' encoding=\'UTF-8\'?>' +
  '<fudgeEnvelope>' +
  '%body%' +
  '</fudgeEnvelope>';

const CREATE =
  '<position type="message">' +
    '<quantity type="string">%quantity%</quantity>' +    // 100
    '<securityLink type="message">' +
      '<externalId type="message">' +
        '<ID type="message">' +
          '<Scheme type="string">%scheme%</Scheme>' +  // Ticker
          '<Value type="string">%value%</Value>' +     // SPY
        '</ID>' +
      '</externalId>' +
    '</securityLink>' +
    '<trades type="message"/>' +
    '<attributes type="message"/>' +
  '</position>';

const UPDATE =
  '<uniqueId type="string">%uniqueId%</uniqueId>' +    // DbPos~1043~6
  '<position type="message">' +
    '<quantity type="string">%quantity%</quantity>' +
    '<securityLink type="message">' +
      '<externalId type="message">' +
        '<ID type="message">' +
          '<Scheme type="string">%scheme%</Scheme>' +      // Ticker
          '<Value type="string">%value%</Value>' +         // SPY
        '</ID>' +
      '</externalId>' +
    '</securityLink>' +
    '<trades type="message"/>' +
    '<attributes type="message"/>' +
  '</position>';

const SEARCH = {
  positionObjectIds: '<positionObjectIds type="string">%positionObjectIds%</positionObjectIds>',
  tradeObjectIds: '<tradeObjectIds type="string">%tradeObjectIds%</tradeObjectIds>',
  securityIdSearch: '<securityIdSearch type="string">%securityIdSearch%</securityIdSearch>',
  securityIdValue: '<securityIdValue type="string">%securityIdValue%</securityIdValue>',
  positionProviderId: '<positionProviderId type="string">%positionProviderId%</positionProviderId>',
  tradeProviderId: '<tradeProviderId type="string">%tradeProviderId%</tradeProviderId>',
  minQuantity: '<minQuantity type="string">%minQuantity%</minQuantity>',
  maxQuantity: '<maxQuantity type="string">%maxQuantity%</maxQuantity>',
  uniqueIdScheme: '<uniqueIdScheme type="string">Ticker%uniqueIdScheme%</uniqueIdScheme>',
  pagingRquest: '<pagingRquest type="string">%pagingRquest%</pagingRquest>',
  versionCorrection: '<versionCorrection type="string">%versionCorrection%</versionCorrection>'
};

module.exports = {
  REQUEST: {
    PATH: '/jax/components/PositionMaster/default/positions/',
    PATH_SEARCH: '/jax/positions.json',
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
    XML: XML,
    CREATE: CREATE,
    READ: null,
    UPDATE: UPDATE,
    DELETE: null,
    SEARCH: SEARCH,
  },
  RESPONSE: {

  }
};

/** POSITIONS http://localhost:8090/jax/components/PositionMaster/default
**********************************

CREATE
----------------------------------
POST /jax/components/PositionMaster/default/positions

REQUEST:
Content-Type: application/xml
Accept: application/xml

<?xml version='1.0' encoding='UTF-8'?>
<fudgeEnvelope>
  <position type="message">
    <quantity type="string">4444</quantity>
    <securityLink type="message">
      <externalId type="message">
        <ID type="message">
          <Scheme type="string">Ticker</Scheme>
          <Value type="string">SPY</Value>
        </ID>
      </externalId>
    </securityLink>
    <trades type="message"/>
    <attributes type="message"/>
  </position>
  <fudgeField0 ordinal="0" type="string">com.opengamma.master.position.PositionDocument</fudgeField0>
  <fudgeField0 ordinal="0" type="string">com.opengamma.master.AbstractDocument</fudgeField0>
  <fudgeField0 ordinal="0" type="string">org.joda.beans.impl.direct.DirectBean</fudgeField0>
</fudgeEnvelope>

RESPONSE:
<?xml version='1.0' encoding='UTF-8'?>
<fudgeEnvelope>
  <versionFromInstant type="datetime">2016-08-24T22:58:21.254071Z</versionFromInstant>
  <correctionFromInstant type="datetime">2016-08-24T22:58:21.254071Z</correctionFromInstant>
  <position type="message">
    <uniqueId type="string">DbPos~1037~0</uniqueId>
    <quantity type="string">4444</quantity>
    <securityLink type="message">
      <externalId type="message">
        <ID type="message">
          <Scheme type="string">Ticker</Scheme>
          <Value type="string">SPY</Value>
        </ID>
      </externalId>
    </securityLink>
    <trades type="message"/>
    <attributes type="message"/>
    <name type="string">4444 x SPY</name>
  </position>
  <uniqueId type="string">DbPos~1037~0</uniqueId>
  <fudgeField0 ordinal="0" type="string">com.opengamma.master.position.PositionDocument</fudgeField0>
  <fudgeField0 ordinal="0" type="string">com.opengamma.master.AbstractDocument</fudgeField0>
  <fudgeField0 ordinal="0" type="string">org.joda.beans.impl.direct.DirectBean</fudgeField0>
</fudgeEnvelope>

READ
----------------------------------
GET /jax/components/PositionMaster/default/positions/{positionId}

REQUEST:
Content-Type: application/xml
Accept: application/xml

RESPONSE:
<?xml version='1.0' encoding='UTF-8'?>
<fudgeEnvelope>
  <versionFromInstant type="datetime">2016-08-24T20:12:54.533909Z</versionFromInstant>
  <correctionFromInstant type="datetime">2016-08-24T20:12:54.533909Z</correctionFromInstant>
  <position type="message">
    <uniqueId type="string">DbPos~1005~16</uniqueId>
    <quantity type="string">2000</quantity>
    <securityLink type="message">
      <externalId type="message">
        <ID type="message">
          <Scheme type="string">Ticker</Scheme>
          <Value type="string">SPY</Value>
        </ID>
      </externalId>
    </securityLink>
    <trades type="message"/>
    <attributes type="message"/>
    <name type="string">2000 x SPY</name>
  </position>
  <uniqueId type="string">DbPos~1005~16</uniqueId>
  <fudgeField0 ordinal="0" type="string">com.opengamma.master.position.PositionDocument</fudgeField0>
  <fudgeField0 ordinal="0" type="string">com.opengamma.master.AbstractDocument</fudgeField0>
  <fudgeField0 ordinal="0" type="string">org.joda.beans.impl.direct.DirectBean</fudgeField0>
</fudgeEnvelope>

UPDATE
----------------------------------
POST: /jax/components/PositionMaster/default/positions/{positionId}   // DbPos~1005

REQUEST:
Content-Type: application/xml
Accept: application/xml

<?xml version='1.0' encoding='UTF-8'?>
<fudgeEnvelope>
  <versionFromInstant type="datetime">2016-08-24T22:50:22.903112Z</versionFromInstant>
  <correctionFromInstant type="datetime">2016-08-24T22:50:22.903112Z</correctionFromInstant>
  <position type="message">
    <uniqueId type="string">DbPos~1005~25</uniqueId>
    <quantity type="string">2222</quantity>
    <securityLink type="message">
      <externalId type="message">
        <ID type="message">
          <Scheme type="string">Ticker</Scheme>
          <Value type="string">SPY</Value>
        </ID>
      </externalId>
    </securityLink>
    <trades type="message"/>
    <attributes type="message"/>
    <name type="string">2000 x SPY</name>
  </position>
  <uniqueId type="string">DbPos~1005~25</uniqueId>
  <fudgeField0 ordinal="0" type="string">com.opengamma.master.position.PositionDocument</fudgeField0>
  <fudgeField0 ordinal="0" type="string">com.opengamma.master.AbstractDocument</fudgeField0>
  <fudgeField0 ordinal="0" type="string">org.joda.beans.impl.direct.DirectBean</fudgeField0>
</fudgeEnvelope>

RESPONSE:
<?xml version='1.0' encoding='UTF-8'?>
<fudgeEnvelope>
  <versionFromInstant type="datetime">2016-08-24T22:53:38.884096Z</versionFromInstant>
  <correctionFromInstant type="datetime">2016-08-24T22:53:38.884096Z</correctionFromInstant>
  <position type="message">
    <uniqueId type="string">DbPos~1005~26</uniqueId>
    <quantity type="string">2222</quantity>
    <securityLink type="message">
      <externalId type="message">
        <ID type="message">
          <Scheme type="string">Ticker</Scheme>
          <Value type="string">SPY</Value>
        </ID>
      </externalId>
    </securityLink>
    <trades type="message"/>
    <attributes type="message"/>
    <name type="string">2222 x SPY</name>
  </position>
  <uniqueId type="string">DbPos~1005~26</uniqueId>
  <fudgeField0 ordinal="0" type="string">com.opengamma.master.position.PositionDocument</fudgeField0>
  <fudgeField0 ordinal="0" type="string">com.opengamma.master.AbstractDocument</fudgeField0>
  <fudgeField0 ordinal="0" type="string">org.joda.beans.impl.direct.DirectBean</fudgeField0>
</fudgeEnvelope>

DELETE
----------------------------------
DELETE: /jax/components/PositionMaster/default/positions/{positionId}

REQUEST:
Content-Type: application/xml
Accept: application/xml

RESPONSE:
empty
**/
