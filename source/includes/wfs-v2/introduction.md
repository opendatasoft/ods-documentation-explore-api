# WFS API

Opendatasoft records can be accessed through a Web Feature Service (WFS), which provides an interface allowing
requests for geographical datasets.

The WFS API provides an interface that enables requests for geographical features from the Opendatasoft records.

This documentation is designed to guide you through the usage of the WFS API in version 2.0.0 with simple conformance class. It includes information on the supported operations, examples of typical use cases, common errors, and additional resources.

If you have any questions or encounter any issues while using the WFS API, refer to the troubleshooting section or contact our support team for assistance.

Let's get started with using the WFS API in version <span style="color:green">v2.0.0</span>.
<span style="color:red">(v1.1.0 is deprecated)</span>

## Operations supported
Opendatasoft platform implements only by HTTP GET method the
5 following operations defined by the WFS standard with simple conformance class :
GetCapabilities, DescribeFeatureType, ListStoredQueries, DescribeStoredQueries, GetFeature operation with only the StoredQuery action. One stored query, that fetches a feature using its id, is available.

| Operation               | Description                                                                      |
|-------------------------|----------------------------------------------------------------------------------|
| `GetCapabilities`       | Retrieves metadata about the WFS service                                         |
| `DescribeFeatureType`   | Generates a schema description of features types                                 |
| `GetFeature`            | Retrieves features from the service and output them using the GML representation |
| `ListStoredQueries`     | Lists the stored queries that are available                                      |
| `DescribeStoredQueries` | Generates a description of the named stored queries that are available           |

## Service address and methods

> [<span style="color:white">Service entry address</span><style>a:hover{text-decoration: none;}</style>](https://documentation-resources.opendatasoft.com/api/wfs)

```http
GET https://documentation-resources.opendatasoft.com/api/wfs HTTP/1.1
```

The service can be reached at the following entry address.

The workspace `https://documentation-resources.opendatasoft.com/` is used as an example in this documentation, but you should replace it with your custom workspace name.

The WFS supports only `GET` HTTP methods in <span style="color:green">v2.0.0</span> (`POST` HTTP method is supported in <span style="color:red">v1.1.0</span> with only `text/xml` as `Content-Type` header, but this version is deprecated)

## Common parameters

When the HTTP `GET` method is used, the parameters are appended to the URL using a Keyword Value Pair (KVP)
encoding.


Here is the list of the common parameters, supported by all WFS operations:

| Operation | Description                          | Possible values                                                                                      | Optionality and use                    |
|-----------|--------------------------------------|------------------------------------------------------------------------------------------------------|----------------------------------------|
| `service` | The requested service                | `WFS`                                                                                                | One (Mandatory)                        |
| `request` | The requested operation              | `GetCapabilities`, `DescribeFeatureType`, `GetFeature`, `ListStoredQueries`, `DescribeStoredQueries` | One (Mandatory)                        |
| `version` | The requested version of the service | `2.0.0`                                                                                              | One (Mandatory except GetCapabilities) |

**Notice that all usable parameters in this API are case-insensitive**.
## Common usages

* Viewing and analyzing geographic data: QGIS or ArcGIS can be used to connect to a WFS service and visualize the retrieved data on a map. This allows users to explore and analyze the data in a familiar GIS environment.


* Filtering data based on attributes or location: Users can also use the WFS API to filter data based on attributes or location. For example, users may want to filter out features that are not relevant to their analysis or only include features near from a point of interest.


Overall, the WFS API provides a flexible and powerful tool for accessing and analyzing geographic data by other software, enabling users to perform a wide range of tasks related to spatial analysis, visualization, and mapping.

## Examples

#### GetCapabilities

* Example 1 : To retrieve the service metadata. This will return an XML document that describes the capabilities of the WFS service, including supported operations, data types, and service metadata.
> [<span style="color:white">Basic example GetCapabilities</span><style>a:hover{text-decoration: none}</style>](https://documentation-resources.opendatasoft.com/api/wfs?service=WFS&request=GetCapabilities)
```http
GET https://documentation-resources.opendatasoft.com/api/wfs?service=WFS&request=GetCapabilities HTTP/1.1
```

* Example 2 : To retrieve the service provider metadata, you can use the following URL.
> [<span style="color:white">Parameterized example GetCapabilities</span><style>a:hover{text-decoration: none}</style>](https://documentation-resources.opendatasoft.com/api/wfs?SERVICE=WFS&REQUEST=GetCapabilities&SECTIONS=ServiceProvider)
```http
GET https://documentation-resources.opendatasoft.com/api/wfs?SERVICE=WFS&REQUEST=GetCapabilities&SECTIONS=ServiceProvider HTTP/1.1
```

#### DescribeFeatureType

* Example 1 : To retrieve schema description of features types serviced by the service. This will return an XSD document that describes the features types.
> [<span style="color:white">Basic example DescribeFeatureType</span><style>a:hover{text-decoration: none}</style>](https://documentation-resources.opendatasoft.com/api/wfs?SERVICE=WFS&REQUEST=DescribeFeatureType&VERSION=2.0.0)
```http
GET https://documentation-resources.opendatasoft.com/api/wfs?SERVICE=WFS&REQUEST=DescribeFeatureType&VERSION=2.0.0 HTTP/1.1
```

* Example 2 : To retrieve schema description of a feature type. This will return the XSD document that describes an Opendatasoft dataset.
> [<span style="color:white">Parameterized example DescribeFeatureType</span><style>a:hover{text-decoration: none}</style>](https://documentation-resources.opendatasoft.com/api/wfs?SERVICE=WFS&REQUEST=DescribeFeatureType&VERSION=2.0.0&TYPENAMES=arrondissements-paris)
```http
GET https://documentation-resources.opendatasoft.com/api/wfs?SERVICE=WFS&REQUEST=DescribeFeatureType&VERSION=2.0.0&TYPENAMES=arrondissements-paris HTTP/1.1
```

#### GetFeature

* Example 1 : To retrieve features from the `arrondissements-paris` dataset.
> [<span style="color:white">Basic example GetFeature</span><style>a:hover{text-decoration: none}</style>](https://documentation-resources.opendatasoft.com/api/wfs?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=arrondissements-paris)
```http
GET https://documentation-resources.opendatasoft.com/api/wfs?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=arrondissements-paris HTTP/1.1
```

* Example 2 : To retrieve features from the `arrondissements-paris` dataset within a bounding box.
> [<span style="color:white">Parameterized example GetFeature</span><style>a:hover{text-decoration: none}</style>](https://documentation-resources.opendatasoft.com/api/wfs?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=arrondissements-paris&BBOX=(48.811090519909115,2.34832763671875,48.90686235347725,2.4300384521484375))
```http
GET https://documentation-resources.opendatasoft.com/api/wfs?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=arrondissements-paris&BBOX=(48.811090519909115,2.34832763671875,48.90686235347725,2.4300384521484375) HTTP/1.1
```

#### ListStoredQueries

* Example : To retrieve stored queries from the workspace.
> [<span style="color:white">Basic example ListStoredQueries</span><style>a:hover{text-decoration: none}</style>](https://documentation-resources.opendatasoft.com/api/wfs?SERVICE=WFS&REQUEST=ListStoredQueries&VERSION=2.0.0)
```http
GET https://documentation-resources.opendatasoft.com/api/wfs?SERVICE=WFS&REQUEST=ListStoredQueries&VERSION=2.0.0 HTTP/1.1
```

#### DescribeStoredQueries

* Example : To retrieve stored queries structure from the workspace (it gives details about input parameters and responses of stored queries).
> [<span style="color:white">Basic example DescribeStoredQueries</span><style>a:hover{text-decoration: none}</style>](https://documentation-resources.opendatasoft.com/api/wfs?SERVICE=WFS&REQUEST=DescribeStoredQueries&VERSION=2.0.0)
```http
GET https://documentation-resources.opendatasoft.com/api/wfs?SERVICE=WFS&REQUEST=DescribeStoredQueries&VERSION=2.0.0 HTTP/1.1
```

## Exception reports

> Exception example

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ExceptionReport xmlns="http://www.opengis.net/ows" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://schemas.opengis.net/ows/1.1.0/owsExceptionReport.xsd" version="2.0.0" language="en">
  <Exception exceptionCode="InvalidParameterValue" locator="service">
    <ExceptionText>Service must be WFS or CSW.</ExceptionText>
  </Exception>
</ExceptionReport>
```

When an error occurs, the service responds to the client using an Exception Report message to describe the error.

| Name            | Definition                                                                                   | Data type and value                                                                                                                | Multiplicity and use                                                            |
|-----------------|----------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| `ExceptionText` | Text describing specific exception represented by the exceptionCode                          | Character String type, not empty. Value is an exception description as defined by individual servers                               | Zero or more (optional). Omitted only when no more useful information available |
| `exceptionCode` | Code representing type of this exception                                                     | Character String type, not empty. Allowed values are specified by each implementation specification and server <br> implementation | One (mandatory)                                                                 |
| `locator`       | Indicator of location in the client's operation request where this exception was encountered | Character String type, not empty Contents defined for each allowed exceptionCode value for each operation                          | Zero or one (optional). Omitted when no useful value available                  |
