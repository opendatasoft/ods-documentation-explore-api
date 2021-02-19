# Using the OData API

## General points

### Service address

In this documentation, we will use the words "service root" or "service document" to refer to the base address of the OData
service. For the Opendatasoft platform, this URL can be found on the `/api/odata` path, relative to the platform
hostname. Unless stated otherwise, all addresses in the rest of this documentation are relative to the service root.

### HTTP Method

The Opendatasoft OData service currently is read-only; hence the only allowed method is GET.

## Versions

The Opendatasoft platform supports versions 3.0 and 4.0 of the OData protocol. Versions requirements can be
communicated to the service via the following six headers:

Header | Description
------ | -----------
**OData-Version** | This header informs the server which version of the protocol is used by the client.
**DataServiceVersion** | This header specifies which protocol version the service should use.
**OData-MinVersion** | This header specifies the minimum version supported by the client.
**minDataServiceVersion** | This header specifies the minimum version the service should use.
**OData-MaxVersion** | This header specifies the maximum version supported by the client.
**maxDataServiceVersion** | This header specifies the maximum version the service should use.

From the next paragraph on, in order to keep things simple and relevant, all the examples in this documentation use the OData protocol version 4.0. Keep in mind however that all described features work in both supported versions. If version 3.0 uses a specific syntax or needs special attention, it will be described in the documentation.

## Metadata

```http
GET https://documentation-resources.opendatasoft.com/api/odata/$metadata HTTP/1.1
```

```xml
<edmx:Edmx xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx" Version="4.0">
    <edmx:DataServices xmlns:m="http://docs.oasis-open.org/odata/ns/metadata" m:MaxDataServiceVersion="4.0" m:DataServiceVersion="4.0">
        <Schema xmlns="http://docs.oasis-open.org/odata/ns/edm" Alias="Ods" Namespace="com.opendatasoft.odata.types">
            <ComplexType Name="GeoPoint2D">
                <Property Type="Edm.Double" Name="latitude"/>
                <Property Type="Edm.Double" Name="longitude"/>
            </ComplexType>
            <ComplexType Name="Image">
                <Property Type="Edm.Int32" Name="width"/>
                <Property Type="Edm.String" Name="format"/>
                <Property Type="Edm.String" Name="id"/>
                <Property Type="Edm.Int32" Name="height"/>
            </ComplexType>
        </Schema>
        <Schema xmlns="http://docs.oasis-open.org/odata/ns/edm" Namespace="documentation-resources.roman-emperor-images">
            <EntityType Name="roman-emperor-images">
                <Key>
                    <PropertyRef Name="recordid"/>
                </Key>
                <Property Type="Edm.String" Name="recordid" Nullable="false"/>
                <Property Type="Edm.String" Name="name"/>
                <Property Type="Edm.String" Name="image"/>
            </EntityType>
        </Schema>
        <!-- ... -->
        <Schema xmlns="http://docs.oasis-open.org/odata/ns/edm" Namespace="documentation-resources.doc-geonames-cities-5000">
    <EntityType Name="doc-geonames-cities-5000">
        <Key>
            <PropertyRef Name="recordid"/>
        </Key>
        <Property Type="Edm.String" Name="recordid" Nullable="false"/>
        <Property Type="Edm.String" Name="geonameid"/>
        <Property Type="Edm.String" Name="name"/>
        <Property Type="Edm.String" Name="asciiname"/>
        <Property Type="Edm.String" Name="alternatenames"/>
        <Property Type="Edm.String" Name="feature_class"/>
        <Property Type="Edm.String" Name="feature_code"/>
        <Property Type="Edm.String" Name="country_code"/>
        <Property Type="Edm.String" Name="cc2"/>
        <Property Type="Edm.String" Name="admin1_code"/>
        <Property Type="Edm.String" Name="admin2_code"/>
        <Property Type="Edm.String" Name="admin3_code"/>
        <Property Type="Edm.String" Name="admin4_code"/>
        <Property Type="Edm.Int32" Name="population"/>
        <Property Type="Edm.String" Name="elevation"/>
        <Property Type="Edm.Int32" Name="dem"/>
        <Property Type="Edm.String" Name="timezone"/>
        <Property Type="Edm.DateTimeOffset" Name="modification_date"/>
        <Property Type="com.opendatasoft.odata.types.GeoPoint2D" Name="geo_point_2d"/>
    </EntityType>
</Schema>
  </edmx:DataServices>
</edmx:Edmx>
```

The metadata document is located on `/$metadata`. This documents determines:

- the complex types used by the service
- the entity types found on the platform
- the entity sets offered
- a set of annotation about the entity sets

## Formats

```http
GET https://documentation-resources.opendatasoft.com/api/odata/error?$format=json HTTP/1.1
```

```json
{
    "error": {
        "message": "Resource not found for the segment 'error'",
        "code": 404
    }
}
```

```http
GET https://documentation-resources.opendatasoft.com/api/odata/error?$format=xml HTTP/1.1
```

```xml
<m:error xmlns:m="http://docs.oasis-open.org/odata/ns/metadata">
    <m:code>404</m:code>
    <m:message>Resource not found for the segment 'error'</m:message>
</m:error>
```

The service supports ATOM and JSON formats. For the JSON formats, the "minimal" and "full" metadata levels are
supported. Any request for a metadata level of "none" will be responded to with the "minimal" metadata level, as per
the standard.

There are 2 main ways of requesting a specific format:

* in the `Accept` header
* in the `$format` query parameter

The format parameter, be it in the headers or in the query string, can be either the abbreviations JSON, XML or ATOM, or
the exact MIME type requested. For the JSON format, different metadata levels can be requested by using the full MIME
type followed by `;odata.metadata=<LEVEL>` for protocol version 4.0 and `;odata=<LEVEL>metadata` for protocol
version 3.0.

To keep things simple, the rest of this article will feature examples with the JSON format, which is the default, but
keep in mind that everything will work the same in the ATOM format.

## Catalog

```http
GET https://documentation-resources.opendatasoft.com/api/odata/?$format=json HTTP/1.1
```

```json
{
"@odata.context": "https://documentation-resources.opendatasoft.com/api/odata/$metadata",
"value": [
    /* ... */
    {
        "name": "doc-geonames-cities-5000",
        "url": "doc-geonames-cities-5000"
    },
    /* ... */
    ]
}
```

The service root document displays the catalog of all datasets available through the service.

## Datasets

```http
GET https://documentation-resources.opendatasoft.com/api/odata/doc-geonames-cities-5000 HTTP/1.1
```

```json
{
    "@odata.context": "https://documentation-resources.opendatasoft.com/api/odata/$metadata#doc-geonames-cities-5000",
    "value": [
        /* ... */
        {
            "recordid": "a09667c806f6e64f81843ef3281973dd6d96dbc2",
            "name": "Independencia",
            "modification_date": "2014-04-11T00:00:00+00:00",
            "geonameid": "8858196",
            "feature_class": "P",
            "admin2_code": "011",
            "geo_point_2d": {
            "latitude": 18.87716,
            "longitude": -99.12237
            },
            "timezone": "America/Mexico_City",
            "feature_code": "PPL",
            "dem": 1446,
            "country_code": "MX",
            "admin1_code": "17",
            "alternatenames": "Independencia",
            "asciiname": "Independencia",
            "population": 7282
        },
        /* ... */
    ],
    "@odata.nextLink": "https://documentation-resources.opendatasoft.com/api/odata/doc-geonames-cities-5000?$skiptoken=100"
}
}
```

The records of a dataset can be browsed on the `/<dataset_id>` page. It is easy to navigate from the service root
document to a dataset by following the URL attribute of the catalog items.

## Paging

> Get the top 2 results

```http
GET https://documentation-resources.opendatasoft.com/api/odata/doc-geonames-cities-5000?$top=2 HTTP/1.1
```

```json
{
    "@odata.context": "https://documentation-resources.opendatasoft.com/api/odata/$metadata#doc-geonames-cities-5000",
    "value": [
        {
            "recordid": "9a5943b0ace876e384142c032f6b229a9c77e1fe",
            "name": "Marte R. Gómez (Tobarito)",
            "modification_date": "2014-04-11T00:00:00+00:00",
            "geonameid": "8858173",
            "feature_class": "P",
            "admin2_code": "018",
            "geo_point_2d": {
                "latitude": 27.36778,
                "longitude": -109.88583
            },
            "timezone": "America/Hermosillo",
            "feature_code": "PPL",
            "dem": 49,
            "country_code": "MX",
            "admin1_code": "26",
            "alternatenames": "Marte R. Gomez (Tobarito),Marte R. Gómez (Tobarito)",
            "asciiname": "Marte R. Gomez (Tobarito)",
            "population": 8700
        },
        {
            "recordid": "e2e9d83f86c4dddfeefd349be9fbdd67c7b8ce23",
            "name": "Colonia Santa Bárbara",
            "modification_date": "2014-08-18T00:00:00+00:00",
            "geonameid": "8858175",
            "feature_class": "P",
            "admin2_code": "087",
            "geo_point_2d": {
                "latitude": 19.50191,
                "longitude": -96.87817
            },
            "timezone": "America/Mexico_City",
            "feature_code": "PPL",
            "dem": 1277,
            "country_code": "MX",
            "admin1_code": "30",
            "alternatenames": "Colonia Santa Barbara,Colonia Santa Bárbara",
            "asciiname": "Colonia Santa Barbara",
            "population": 8617
        }
    ]
}
```

> Skip the top result and get the next two results

```http
GET https://documentation-resources.opendatasoft.com/api/odata/doc-geonames-cities-5000?$skip=1&$top=2 HTTP/1.1
```

```json
{
    "@odata.context": "https://documentation-resources.opendatasoft.com/api/odata/$metadata#doc-geonames-cities-5000",
    "value": [
        {
            "recordid": "e2e9d83f86c4dddfeefd349be9fbdd67c7b8ce23",
            "name": "Colonia Santa Bárbara",
            "modification_date": "2014-08-18T00:00:00+00:00",
            "geonameid": "8858175",
            "feature_class": "P",
            "admin2_code": "087",
            "geo_point_2d": {
                "latitude": 19.50191,
                "longitude": -96.87817
            },
            "timezone": "America/Mexico_City",
            "feature_code": "PPL",
            "dem": 1277,
            "country_code": "MX",
            "admin1_code": "30",
            "alternatenames": "Colonia Santa Barbara,Colonia Santa Bárbara",
            "asciiname": "Colonia Santa Barbara",
            "population": 8617
        },
        {
            "recordid": "dff5e7b1376eb0e983e3e823baa3d8ab11bc08e7",
            "name": "Bosque de Saloya",
            "modification_date": "2014-04-11T00:00:00+00:00",
            "geonameid": "8858176",
            "feature_class": "P",
            "admin2_code": "013",
            "geo_point_2d": {
                "latitude": 18.01611,
                "longitude": -92.95806
            },
            "timezone": "America/Mexico_City",
            "feature_code": "PPL",
            "dem": 8,
            "country_code": "MX",
            "admin1_code": "27",
            "alternatenames": "Bosque de Saloya",
            "asciiname": "Bosque de Saloya",
            "population": 8600
        }
    ]
}
```

Client-driven paging can be requested with the `$top` query parameter to limit the size of the response, and the
`$skip` query parameter to define the first result to display.

The server will ignore `$skip` results and then return the first `$top` items.

When paging is applied, a link to the next results will be added at the end of the payload.

<aside>
    The OData API only operates on the 10,000 first dataset results. For instance, it isn’t possible to request more than 100 pages of 100 results. To retrieve the whole content of datasets larger than 10,000 records, use <a href="../ods-search-v1/#records-download-api">the Opendatasoft Download API</a>.
</aside>


## Search

> Get all records that contain "Turin" in any of their fields

```http
GET https://documentation-resources.opendatasoft.com/api/odata/doc-geonames-cities-5000?$search=Turin HTTP/1.1
```

```json
{
    "@odata.context": "https://documentation-resources.opendatasoft.com/api/odata/$metadata#doc-geonames-cities-5000",
    "value": [
        {
            "recordid": "c8f5d3e8e38ea441d9c4bfae5809655a58d4c2e8",
            "elevation": "239",
            "name": "Turin",
            "modification_date": "2019-09-05T00:00:00+00:00",
            "geonameid": "3165524",
            "feature_class": "P",
            "admin3_code": "001272",
            "admin2_code": "TO",
            "geo_point_2d": {
                "latitude": 45.07049,
                "longitude": 7.68682
            },
            "timezone": "Europe/Rome",
            "feature_code": "PPLA",
            "dem": 245,
            "country_code": "IT",
            "admin1_code": "12",
            "alternatenames": "Augusta Taurinorum,Julia Augusta Taurinorum,Lungsod ng Turino,TRN,Tori,Torin,Torino,Torinu,Torí,Tueri,Turen,Turijn,Turim,Turin,Turina,Turinas,Turino,Turinu,Turyn,Turén,Turìn,Turín,Turīna,Tórínó,Türì,dou ling,tolino,torino,tu rin,tulin,turin,turina,twryn,twrynw,Τορίνο,Торино,Турин,Турын,Թուրին,טורין,טורינו,تورينو,تورین,टोरीनो,तोरिनो,তুরিন,துரின்,ตูริน,ཊུ་རིན།,ტურინი,トリノ,都灵,토리노,투린",
            "asciiname": "Turin",
            "admin4_code": "0012721",
            "population": 870456
        },
        {
            "recordid": "61eb5f69a96ba0c694a800f02802c0cc488aad91",
            "name": "Turinskaya Sloboda",
            "modification_date": "2019-09-02T00:00:00+00:00",
            "geonameid": "1488931",
            "feature_class": "P",
            "geo_point_2d": {
                "latitude": 57.6232,
                "longitude": 64.38575
            },
            "timezone": "Asia/Yekaterinburg",
            "feature_code": "PPL",
            "dem": 64,
            "country_code": "RU",
            "admin1_code": "71",
            "alternatenames": "Turinskaja Sloboda,Turinskaja-Sloboda,Turinskaya Sloboda,Туринская Слобода",
            "asciiname": "Turinskaya Sloboda",
            "population": 6023
        },
        {
            "recordid": "ef5d7d2506846f5581087d9070ff90e440056e86",
            "name": "Turinsk",
            "modification_date": "2019-09-05T00:00:00+00:00",
            "geonameid": "1488933",
            "feature_class": "P",
            "geo_point_2d": {
                "latitude": 58.04575,
                "longitude": 63.69605
            },
            "timezone": "Asia/Yekaterinburg",
            "feature_code": "PPL",
            "dem": 100,
            "country_code": "RU",
            "admin1_code": "71",
            "alternatenames": "Toerinsk,Tourinsk,Turins'k,Turinsk,Turynsk,tu lin si ke,twrynsk,Τουρίνσκ,Туринск,Туринськ,Турынск,Түре,تورينسك,تورینسک,圖林斯克",
            "asciiname": "Turinsk",
            "population": 18555
        },
        {
            "recordid": "e4b10f40f0dd992afc44e7cac52ede6b39f83bf5",
            "name": "Tura",
            "modification_date": "2012-12-02T00:00:00+00:00",
            "geonameid": "2014833",
            "feature_class": "P",
            "geo_point_2d": {
                "latitude": 64.27769,
                "longitude": 100.21849
            },
            "timezone": "Asia/Krasnoyarsk",
            "feature_code": "PPL",
            "dem": 214,
            "country_code": "RU",
            "admin1_code": "91",
            "alternatenames": "Toera,Toura,Tura,Turinskaya Kul'tbaza,Turinskaya Kul’tbaza,Turinskaya Kutbaza,tu la,tula,Тура,圖拉,투라",
            "asciiname": "Tura",
            "population": 5444
        }
    ]
}
```

The `$search` parameter can be used to search data.

## Restriction

> Get all cities named "Turin"

```text
GET https://documentation-resources.opendatasoft.com/api/odata/doc-geonames-cities-5000?$filter=name eq Turin
```

```json
{
    "@odata.context": "https://documentation-resources.opendatasoft.com/api/odata/$metadata#doc-geonames-cities-5000",
    "value": [
        {
            "recordid": "c8f5d3e8e38ea441d9c4bfae5809655a58d4c2e8",
            "elevation": "239",
            "name": "Turin",
            "modification_date": "2019-09-05T00:00:00+00:00",
            "geonameid": "3165524",
            "feature_class": "P",
            "admin3_code": "001272",
            "admin2_code": "TO",
            "geo_point_2d": {
                "latitude": 45.07049,
                "longitude": 7.68682
            },
            "timezone": "Europe/Rome",
            "feature_code": "PPLA",
            "dem": 245,
            "country_code": "IT",
            "admin1_code": "12",
            "alternatenames": "Augusta Taurinorum,Julia Augusta Taurinorum,Lungsod ng Turino,TRN,Tori,Torin,Torino,Torinu,Torí,Tueri,Turen,Turijn,Turim,Turin,Turina,Turinas,Turino,Turinu,Turyn,Turén,Turìn,Turín,Turīna,Tórínó,Türì,dou ling,tolino,torino,tu rin,tulin,turin,turina,twryn,twrynw,Τορίνο,Торино,Турин,Турын,Թուրին,טורין,טורינו,تورينو,تورین,टोरीनो,तोरिनो,তুরিন,துரின்,ตูริน,ཊུ་རིན།,ტურინი,トリノ,都灵,토리노,투린",
            "asciiname": "Turin",
            "admin4_code": "0012721",
            "population": 870456
        }
    ]
}
```

> Get all cities with a population between 100,000 and 100,050 inhabitants

```text
GET https://documentation-resources.opendatasoft.com/api/odata/doc-geonames-cities-5000?$filter=population gt 100000 and not population ge 100050
```

```json
{
    "@odata.context": "https://documentation-resources.opendatasoft.com/api/odata/$metadata#doc-geonames-cities-5000",
    "value": [
        {
            "recordid": "c8ed94ed7799ed2be371b705c210e3caced7003a",
            "name": "Telde",
            "modification_date": "2012-03-04T00:00:00+00:00",
            "geonameid": "2510542",
            "feature_class": "P",
            "admin3_code": "35026",
            "admin2_code": "GC",
            "geo_point_2d": {
                "latitude": 27.99243,
                "longitude": -15.41915
            },
            "timezone": "Atlantic/Canary",
            "feature_code": "PPLA3",
            "dem": 160,
            "country_code": "ES",
            "admin1_code": "53",
            "alternatenames": "Tel'de,Telde,te er de,tyldy,Телде,Тельде,تيلدي,特尔德",
            "asciiname": "Telde",
            "population": 100015
        },
        {
            "recordid": "668fa56460183a49c125bab9080a8dedba25fc87",
            "name": "Punta Cana",
            "modification_date": "2016-06-05T00:00:00+00:00",
            "geonameid": "3494242",
            "feature_class": "P",
            "admin3_code": "110103",
            "admin2_code": "1101",
            "geo_point_2d": {
                "latitude": 18.58182,
                "longitude": -68.40431
            },
            "timezone": "America/Santo_Domingo",
            "feature_code": "PPL",
            "dem": 28,
            "country_code": "DO",
            "admin1_code": "10",
            "alternatenames": "PUJ,Punta Cana,Punta Kana,Punta-Kana,Пунта Кана,Пунта-Кана",
            "asciiname": "Punta Cana",
            "admin4_code": "11010304",
            "population": 100023
        }
    ]
}
```

The `$filter` parameter can be used to apply a restriction on results.

Supported restriction operators are `eq` and `ne` for equality and inequality, `lt` and `gt` for strict inequalities and `le` and `ge` for non strict inequalities.

Multiple restriction expessions can be combined into bigger expressions with the logical operators `and` and `or`.

Expressions can be negated with the `not` operator.

## Count

> Get the number of cities with a population of more than 3 million inhabitants and the top result

```text
GET https://documentation-resources.opendatasoft.com/api/odata/doc-geonames-cities-5000?$filter=population gt 3000000&$top=1&$count=true
```

```json
{
    "@odata.context": "https://documentation-resources.opendatasoft.com/api/odata/$metadata#doc-geonames-cities-5000",
    "@odata.count": 93,
    "value": [
        {
            "recordid": "da3786f79d168b68547eb6c90fc7a8098f6f5461",
            "name": "Ibadan",
            "modification_date": "2019-09-05T00:00:00+00:00",
            "geonameid": "2339354",
            "feature_class": "P",
            "admin2_code": "31008",
            "geo_point_2d": {
                "latitude": 7.37756,
                "longitude": 3.90591
            },
            "timezone": "Africa/Lagos",
            "feature_code": "PPLA",
            "dem": 181,
            "country_code": "NG",
            "admin1_code": "32",
            "alternatenames": "IBA,Ibadan,Ibadan shaary,Ibadana,Ibadanas,Ibadano,Ibadán,abadan,aybadan,ibadan,ibadana,yi ba dan,Ìbàdàn,İbadan,Ібадан,Ибадан,Ибадан шаары,איבדאן,إبادان,إيبادان,ابادان,ਇਬਾਦਾਨ,イバダン,伊巴丹,이바단",
            "asciiname": "Ibadan",
            "population": 3565108
        }
    ]
}
```

> Get the number of records in the `doc-geonames-cities-5000` dataset

```text
GET https://documentation-resources.opendatasoft.com/api/odata/doc-geonames-cities-5000/$count
```

```text
50335
```

There are 2 ways of obtaining the number of records in a dataset:

- Using the `$count` query parameter (`$inlinecount` for protocol version 3.0)

- Navigating to the count document for a resource. This is achieved by querying `/<dataset_id>/$count`

These two methods have slightly different semantics:

- The first one returns the count relative to the payload, taking all operations into account, except for paging, and is returned along with the payload.
- The second one returns the absolute resource count, irrespective of anything
other than the number of records present on the server, and only returns the number without any other information.

## Sort

> Get all records that contain "Turin" in any of their fields and order records by population size in ascending order

```text
GET https://documentation-resources.opendatasoft.com/api/odata/doc-geonames-cities-5000?$search=Turin&$orderby=population
```

```json
{
    "@odata.context": "https://documentation-resources.opendatasoft.com/api/odata/$metadata#doc-geonames-cities-5000",
    "value": [
        {
            "recordid": "e4b10f40f0dd992afc44e7cac52ede6b39f83bf5",
            "name": "Tura",
            /* ... */
            "population": 5444
        },
        {
            "recordid": "61eb5f69a96ba0c694a800f02802c0cc488aad91",
            "name": "Turinskaya Sloboda",
            /* ... */
            "population": 6023
        },
        {
            "recordid": "ef5d7d2506846f5581087d9070ff90e440056e86",
            "name": "Turinsk",
            /* ... */
            "population": 18555
        },
        {
            "recordid": "c8f5d3e8e38ea441d9c4bfae5809655a58d4c2e8",
            "name": "Turin",
            /* ... */
            "population": 870456
        }
    ]
}
```
> Get all records that contain "Turin" in any of their fields and order records by population size in descending order

```text
GET https://documentation-resources.opendatasoft.com/api/odata/doc-geonames-cities-5000?$search=Turin&$orderby=population desc
```

```json
{
    "@odata.context": "https://documentation-resources.opendatasoft.com/api/odata/$metadata#doc-geonames-cities-5000",
    "value": [
        {
            "recordid": "c8f5d3e8e38ea441d9c4bfae5809655a58d4c2e8",
            "name": "Turin",
            /* ... */
            "population": 870456
        },
        {
            "recordid": "ef5d7d2506846f5581087d9070ff90e440056e86",
            "name": "Turinsk",
            /* ... */
            "population": 18555
        },
        {
            "recordid": "61eb5f69a96ba0c694a800f02802c0cc488aad91",
            "name": "Turinskaya Sloboda",
            /* ... */
            "population": 6023
        },
        {
            "recordid": "e4b10f40f0dd992afc44e7cac52ede6b39f83bf5",
            "name": "Tura",
            /* ... */
            "population": 5444
        }
    ]
}
```

Results returned by the service can be sorted by a field using the `$orderby` parameter. The field name can be
followed by the `asc` and `desc` keywords to specify the sort order (default is ascendant).

## Specific record

> Get the record with the recordid `c8f5d3e8e38ea441d9c4bfae5809655a58d4c2e8`

```http
GET https://documentation-resources.opendatasoft.com/api/odata/doc-geonames-cities-5000(c8f5d3e8e38ea441d9c4bfae5809655a58d4c2e8) HTTP/1.1
```

```json
{
    "@odata.context": "https://documentation-resources.opendatasoft.com/api/odata/$metadata#doc-geonames-cities-5000/$entity",
    "recordid": "c8f5d3e8e38ea441d9c4bfae5809655a58d4c2e8",
    "geonameid": "3165524",
    "name": "Turin",
    "asciiname": "Turin",
    "alternatenames": "Augusta Taurinorum,Julia Augusta Taurinorum,Lungsod ng Turino,TRN,Tori,Torin,Torino,Torinu,Torí,Tueri,Turen,Turijn,Turim,Turin,Turina,Turinas,Turino,Turinu,Turyn,Turén,Turìn,Turín,Turīna,Tórínó,Türì,dou ling,tolino,torino,tu rin,tulin,turin,turina,twryn,twrynw,Τορίνο,Торино,Турин,Турын,Թուրին,טורין,טורינו,تورينو,تورین,टोरीनो,तोरिनो,তুরিন,துரின்,ตูริน,ཊུ་རིན།,ტურინი,トリノ,都灵,토리노,투린",
    "feature_class": "P",
    "feature_code": "PPLA",
    "country_code": "IT",
    "admin1_code": "12",
    "admin2_code": "TO",
    "admin3_code": "001272",
    "admin4_code": "0012721",
    "population": 870456,
    "elevation": "239",
    "dem": 245,
    "timezone": "Europe/Rome",
    "modification_date": "2019-09-05T00:00:00+00:00",
    "geo_point_2d": {
        "latitude": 45.07049,
        "longitude": 7.68682
    }
}
```

To access a specific record, append its recordid surrounded by parentheses to the dataset address.

## Projection

> Get all records that contain "Turin" in any of their fields and select only their `name` and `population` properties using projection

```text
GET https://documentation-resources.opendatasoft.com/api/odata/doc-geonames-cities-5000?$search=Turin&$select=name, population
```

```json
{
    "@odata.context": "https://documentation-resources.opendatasoft.com/api/odata/$metadata#doc-geonames-cities-5000(name,population,recordid)",
    "value": [
        {
            "recordid": "c8f5d3e8e38ea441d9c4bfae5809655a58d4c2e8",
            "name": "Turin",
            "population": 870456
        },
        {
            "recordid": "61eb5f69a96ba0c694a800f02802c0cc488aad91",
            "name": "Turinskaya Sloboda",
            "population": 6023
        },
        {
            "recordid": "ef5d7d2506846f5581087d9070ff90e440056e86",
            "name": "Turinsk",
            "population": 18555
        },
        {
            "recordid": "e4b10f40f0dd992afc44e7cac52ede6b39f83bf5",
            "name": "Tura",
            "population": 5444
        }
    ]
}
```

Results can be projected over specific fields using the `$select` parameter.

For fields to be included in a projection, their names must be separated by a comma and an optional space.

This parameter can be used with datasets and specific records.
