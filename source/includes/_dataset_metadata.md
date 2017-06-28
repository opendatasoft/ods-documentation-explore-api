# Dataset metadata

Dataset metadata are grouped within metadata templates that you can think of as namespaces. On top of the `default` metadata template, you may also find (depending on your domain's configuration) the `inspire`, `dcat` or `citadeljson` templates. Many other templates also exist and you can contact the support to define your own templates.

## The metadata definition object

This object contains all the information necessary to generate a form component for the given metadata.

### Attributes



## The metadata object

### Attributes

> Example object

```json
{
    "name": "title",
    "template": "default",
    "definition": {},
    "value": "My agenda",
    "remote_value": "agendav2",
    "override_remote_value": true
}
```

Attribute | Description
--------- | -----------
`name` <br> *string* | Identifier for the object (inherited from the [definition](#the-metadata-definition-object)'s name)
`template` <br> *string* | Identifier for the metadata template the object falls in
`definition` <br> *[form object](#the-form-object)* <br> <em class="expandable">expandable</em> | The definition of the metadata type and widget
`value` <br> *type depends on `definition` type* | The object's value (may not be the indexed value, see below)
`remote_value` <br> *type depends on `definition` type* | The remote object's metadata value (see below)
`override_remote_value` <br> *boolean* | Flag indicating whether the indexed value is `value` or `remote_value`

In the case of federated and harvested datasets, metadata values are automatically collected from the remote source, showing up in the object as `remote_value`. You can however override this value with your own, specifying it in `value` and setting the `override_remote_value` flag to `True`. This flag determines which value will show up in the explore API output.

## List all metadata

Returns a list of metadata for the dataset with the given UID.

> Definition

```HTTP
GET https://{YOURDOMAIN}.opendatasoft.com/api/management/v2/datasets/{DATASET_ID}/metadata/
```

### Parameters

No parameters.

> Example request

```shell
curl https://yourdomain.opendatasoft.com/api/management/v2/datasets/da_XXXXXX/metadata/ \
    -u username:password
```

### Returns

The full list of [metadata objects](#the-metadata-object).

> Example response

```json
[
    {
        "name": "title",
        "template": "default",
        "definition": {},
        "value": "My agenda",
        "remote_value": "agendav2",
        "override_remote_value": true
    },
    {...},
    {...}
]
```

## Retrieve a metadata

Retrieves the metadata with the given name within the given template.

> Definition

```HTTP
GET https://{DOMAIN_ID}.opendatasoft.com/api/management/v2/datasets/{DATASET_UID}/metadata/{TEMPLATE_NAME}/{METADATA_NAME}/
```

### Parameters

No parameters.

> Example request

```HTTP
curl https://yourdomain.opendatasoft.com/api/management/v2/datasets/da_XXXXXX/metadata/default/title/ \
    -u username:password
```


### Returns

A [metadata object](#the-metadata-object).

> Example response

```json
{
    "name": "title",
    "template": "default",
    "definition": {},
    "value": "My agenda",
    "remote_value": "agendav2",
    "override_remote_value": true
}
```

## Update a metadata value

> Definition

```HTTP
PUT https://{YOURDOMAIN}.opendatasoft.com/api/management/v2/datasets/{DATASET_UID}/{TEMPLATE_NAME}/{METADATA_NAME}/
```

### Parameters

> Example request

```HTTP
curl https://yourdomain.opendatasoft.com/api/management/v2/datasets/da_XXXXXX/metadata/default/title/ \
    -u username:password \
    -X PUT \
    -d '{"value": "The best agenda", "override_remote_value": true}'
```

#### General case

Parameter | Description
--------- | -----------
`value` <br> *type depends on `definition` type* | The new metadata value. <br> Must conform to the metadata definition's type. Can be `null`.

#### For federated and harvested datasets

Parameter | Description
--------- | -----------
`value` <br> *type depends on `definition` type* | The new metadata value. <br> Must conform to the metadata definition's type. Can be `null`.
`override_remote_value` <br> *boolean* | Whether the explore API should return the `remote_value` as metadata value or not

### Returns

The updated [metadata object](#the-metadata-object).

> Example response

```json
{
    "name": "title",
    "template": "default",
    "definition": {},
    "value": "The best agenda",
    "remote_value": "agendav2",
    "override_remote_value": true
}
```


## Reset a metadata value

Resets a metadata value, that is deleting the `value` property and setting the `override_remote_value` flag to `false` (federated and harvested datasets only). The metadata value won't show up in the explore API output anymore (unless it is a federated or harvested dataset with a `remote_value` set).

> Definition

```HTTP
DELETE https://{YOURDOMAIN}.opendatasoft.com/api/management/v2/datasets/{DATASET_UID}/{TEMPLATE_NAME}/{METADATA_NAME}/
```

> Example request

```HTTP
curl https://yourdomain.opendatasoft.com/api/management/v2/datasets/da_XXXXXX/metadata/default/title/ \
    -u username:password \
    -X DELETE
```

> Example response

```json
{
    "name": "title",
    "template": "default",
    "definition": {},
    "value": null,
    "remote_value": "agendav2",
    "override_remote_value": false
}
```
