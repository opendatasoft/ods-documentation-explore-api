# Search API v1

<aside style="border: 1px solid rgba(239, 183, 27, 0.4);background: rgba(239, 183, 27, 0.1);">
This API is deprecated: it is still supported but you should not start a new project or a new integration with it.
You should use <a href="https://help.huwise.com/apis/ods-explore-v2/">Huwise Explore API V2</a> instead.
</aside>

Huwise datasets are accessible by developers through an HTTP REST API.

The domain <https://documentation-resources.huwise.com> is used to illustrate examples in the following documentation.

![API Console](v1/available_apis__console.png)

## Available APIs

The available APIs are listed below.

API Name                    | Description
----------------------------|--------------------------------------------------------------------------
**Dataset search API**      | Search datasets in a catalog
**Dataset lookup API**      | Find a dataset based on its identifier
**Records search API**      | Search records within a given dataset
**Records lookup API**      | Find a record based on its identifier
**Analysis API**            | Build advanced aggregations of records from a given dataset
**Download API**            | Efficiently download a large number of records from a given dataset
**Geo clustering API**      | Build geo clusters of records from a given dataset
**Real time push API**      | Push new records to a given dataset in real time
**Multimedia download API** | Download multimedia content attached to a dataset or a record

These APIs return JSON by default, except:

- the download API that returns CSV by default but supports several output formats like JSON and geographic formats
- the multimedia download API that depends on the file

The real time push API is very specific and will not be detailed in the following documentation. Please refer to the [platform documentation](https://docs.huwise.com/en/sourcing_and_processing_data/realtime.html#pushing-real-time-data) for more information about this API.

These APIs support cross-domain access from a browser using [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing). For older browsers or other specific purposes, [JSONP](https://en.wikipedia.org/wiki/JSONP) is supported when returning JSON content by adding a `callback` parameter.

## Finding a dataset identifier

To access a dataset directly via the dataset lookup API or record related APIs, its **identifier** must be provided. This identifier is found in the information tab of each dataset.

## HTTP Methods

All API endpoints support both GET and POST requests. GET methods are preferred, but POST methods can be used to work around browser, library or proxy limitations regarding the size of HTTP URLs.

## Security

All API endpoints are protected by the same authentication and authorization model.

Anonymous access and authenticated users can be restricted to:

- a subset of the domain's datasets
- a subset of records in a given dataset

All API endpoints are available in HTTPS, which use is highly recommended wherever possible.

The following authentication modes are available:

- **API key authentication:** via an API key generated from [the account settings page](https://docs.huwise.com/en/using_api/authentication.html#finding-and-generating-api-keys)
- **Session authentication:** API calls performed from a browser will authenticate logged users via the Huwise session cookie

## Quotas

All API endpoints are subject to quota-based limitations. According to the domain configuration, authenticated users may have extended quotas compared to anonymous access. Please contact the domain administrator for more information about a user's quotas.

The API response contains three headers to indicate the current state of a user's quota:

- **X-RateLimit-Limit** indicates the total number of API calls the user can do in a single day (resets at midnight UTC)
- **X-RateLimit-Remaining** indicates the remaining number of API calls for the user until reset
- **X-RateLimit-Reset** indicates the [epoch](https://en.wikipedia.org/wiki/Unix_time) of the next reset time

## Errors handling

> Example of an error occurring when you reach the domain requests limit

``` http
> GET https://documentation-resources.huwise.com/api/datasets/1.0/search/ HTTP/1.1

< HTTP/1.0 429 TOO MANY REQUESTS
```

``` json
{
  "errorcode": 10002,
  "reset_time": "2021-01-26T00:00:00Z",
  "limit_time_unit": "day",
  "call_limit": 10000,
  "error": "Too many requests on the domain. Please contact the domain administrator."
}
```

> Example of an error occurring when you reach the requests limit for anonymous users

``` http
> GET https://documentation-resources.huwise.com/api/datasets/1.0/search/ HTTP/1.1

< HTTP/1.0 429 TOO MANY REQUESTS
```

``` json
{
  "errorcode": 10005,
  "reset_time": "2021-01-26T00:00:00Z",
  "limit_time_unit": "day",
  "call_limit": 1000,
  "error": "You have exceeded the requests limit for anonymous users."
}
```

When an error occurs, a JSON object describing the error is returned by the API.
