# Operations

## GetCapabilities

> `GetCapabilities` operation with the optional `Sections` parameter

```http
GET https://examples.opendatasoft.com/api/wfs?service=WFS&request=GetCapabilities&sections=OperationsMetadata,FeatureTypeList HTTP/1.1
```

> Same request using a POST method

```http
POST https://examples.opendatasoft.com/api/wfs HTTP/1.1
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<GetCapabilities xmlns="http://www.opengis.net/ows"
  xmlns:ows="http://www.opengis.net/ows"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.opengis.net/ows
  fragmentGetCapabilitiesRequest.xsd"
  service="WFS">
  <Sections>
      <Section>OperationsMetadata</Section>
      <Section>FeatureTypeList</Section>
  </Sections>
</GetCapabilities>
```

The `GetCapabilities` operation allows clients to retrieve service metadata. The response is a XML document
containing the information.

### Parameters

This is the list of the supported parameters specific to the `GetCapabilities` operation. You should also take into
consideration the common parameters. [See more](#parameters).

The existing parameters in the WFS standard which are not listed in this table are currently not supported.

Parameter | Description | Optionality and use
--------- | ----------- | -------------------
`Sections` | Unordered list of zero or more names of sections of service metadata document to be returned in service metadata <br> document. | Optional. When omitted, return complete service metadata document.
`AcceptVersions` | Prioritized sequence of one or more specification versions accepted by client, with preferred versions listed <br> first. | Optional. When omitted, return latest supported version.

### Sections

This is the list of the existing section in the service metadata. The section name can be used as a value for the
`Sections` parameter.

Section name | Contents
`ServiceIdentification` | Metadata about the the WFS implementation.
`ServiceProvider` | Metadata about the organization offering the WFS service.
`OperationsMetadata` | Metadata about the WFS operations offered by a the WFS implementation.
`FeatureTypeList` | This section defines the list of features types that are available from the service.
