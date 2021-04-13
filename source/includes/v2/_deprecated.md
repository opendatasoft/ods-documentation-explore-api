# Deprecated endpoints

The following endpoints are deprecated and will be removed in a future release.


## Catalog aggregates
`GET /api/v2/catalog/aggregates`


<aside>
Will be removed in september 2021.
</aside>

##### URL Parameters

Parameter  | Default | Description
---------  | ------- | -----------
`select`   | None    | Select clause for aggregation (see [select clause in ODSQL documentation](#select-clause))
`where`    | None    | Filter expression used to restrict returned datasets (see [where clause in ODSQL documentation](#where-clause))
`group_by` | None    | Group by clause for aggregation (see [group_by clause in ODSQL documentation](#group-by-clause))
`timezone` | UTC     | Timezone applied on datetime fields in query and response
`limit`    | None    | Number of items to return


##### New endpoint

`GET /api/v2/catalog/aggregates` has moved to `GET /api/v2/catalog/datasets?group_by`. They are equivalent except the output format, which has changed. See [searching-datasets](#searching-datasets).


## Dataset aggregates
`GET /api/v2/catalog/datasets/<dataset_id>/aggregates`

<aside>
Will be removed in september 2021.
</aside>

##### URL Parameters

Parameter  | Default | Description
---------  | ------- | -----------
`select`   | None    | Select clause for aggregation (see [select clause in ODSQL documentation](#select-clause))
`where`    | None    | Filter expression used to restrict returned datasets (see [where clause in ODSQL documentation](#where-clause))
`group_by` | None    | Group by clause for aggregation (see [group_by clause in ODSQL documentation](#group-by-clause))
`timezone` | UTC     | Timezone applied on datetime fields in query and response
`limit`    | None    | Number of items to return


##### New endpoint

`GET /api/v2/catalog/datasets/<dataset_id>/aggregates` has moved to `GET /api/v2/catalog/datasets/<dataset_id>/records`, which are equivalent. See [searching-datasets](#searching-records).
