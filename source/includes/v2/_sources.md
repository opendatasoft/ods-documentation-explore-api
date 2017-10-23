# Sources

> Retreive a list of available sources on `public` domain

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

Search APIv2 can access data from 3 different sources. They are used to controlled the type of data to search on.

- `catalog`: search in data published in requested domain
- `monitoring`: access monitoring data for requested domain
- `opendatasoft`: search in all public OpenDataSoft catalog. 

Every calls on [datasets](#datasets) or [records](#records) APIs will be performed on the requested data source.

## Catalog 

> Get a list of published datasets on `public` domain

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/datasets
```

Catalog source works on published dataset of requested domain. This is the source to use for retrieve actual data for a specific domain.

### HTTP Request

`GET /api/v2/catalog/`

<aside>
This source is used by default in all examples.
</aside>

## Monitoring

> Get a list of monitoring datasets on `public` domain

```shell
curl 'https://examples.opendatasoft.com/api/v2/monitoring/datasets
```

Monitoring source works on special datasets providing analysis informations about the requested domain. 

### HTTP Request

`GET /api/v2/monitoring/`

<aside>
Appart of a public dataset listing, other monitoring data require specific security permissions.
</aside>

## OpenDataSoft

> Get a list of all public datasets on OpenDataSoft Data Hub

```shell
curl 'https://examples.opendatasoft.com/api/v2/opendatasoft/datasets
```

> Note : This can also be done by directly requesting `catalog` source on `data.opendatasoft.com` domain

```shell
curl 'https://data.opendatasoft.com/api/v2/catalog/datasets
```

This source works on all available public datasets of OpenDataSoft Data Hub. This works as a shortcut of `https//data.opendatasoft.com/api/v2/catalog`. 

### HTTP Request

`GET /api/v2/opendatasoft/`
