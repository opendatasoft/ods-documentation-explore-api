# Sources

> Retrieve a list of available sources on `public` domain

```shell
curl 'https://examples.opendatasoft.com/api/v2/'
```

> The above command returns

```json
{
	"links": [{
			"href": "https://examples.opendatasoft.com/api/v2",
			"rel": "self"
		},
		{
			"href": "https://examples.opendatasoft.com/api/v2/catalog",
			"rel": "catalog"
		},
		{
			"href": "https://examples.opendatasoft.com/api/v2/monitoring",
			"rel": "monitoring"
		},
		{
			"href": "https://examples.opendatasoft.com/api/v2/opendatasoft",
			"rel": "opendatasoft"
		}
	]
}
```

The search API v2 can access data from 3 different sources, depending on the type of data to search.

- `catalog`: to search data published on a requested domain
- `monitoring`: to access monitoring data from a requested domain
- `opendatasoft`: to search in the public OpenDataSoft catalog

Every call from the [catalog](#catalog) or [dataset](#dataset) APIs will be performed on the chosen data source.

<aside>
For now, the metadata API only works on the catalog data source.
</aside>


## Catalog source

> Get a list of published datasets on `public` domain

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/datasets'
```

The catalog source works on the published dataset of a requested domain. Use this source to retrieve actual data from a specific domain.

**HTTP Request**

`GET /api/v2/catalog/`

## Monitoring source

> Get a list of monitoring datasets on `public` domain

```shell
curl 'https://examples.opendatasoft.com/api/v2/monitoring/datasets'
```

The monitoring source allows to search and work on special datasets providing analysis information about a requested domain.

**HTTP Request**

`GET /api/v2/monitoring/`

<aside>
The monitoring API gives access to the data of one specific dataset containing the list of public datasets of the requested domain. Other monitoring data require specific permissions for security reasons.
</aside>


## OpenDataSoft source

> Get a list of all public datasets on OpenDataSoft Data Hub

```shell
curl 'https://examples.opendatasoft.com/api/v2/opendatasoft/datasets'
```

The OpenDataSoft allows to search and work on all available public datasets from the OpenDataSoft data network.

<aside>
The HTTP request below returns the same datasets as `https//data.opendatasoft.com/api/v2/catalog`.
</aside>

**HTTP Request**

`GET /api/v2/opendatasoft/`
