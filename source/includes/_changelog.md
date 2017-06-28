# Changelog

The changelog of a dataset is the list of all changes that have been made on different sections of the dataset. Every action taken on any resource through POST, PUT or DELETE creates an entry in the changelog. These entries consist of the time and day at which the change occured, the user who created the new state, the diff between the old and the new state of the dataset and the sections in which the change happened.

## The change object

### Attributes

Attribute | Description
--------- | -----------
`change_id` <br> *string* | Unique identifier for the change
`dataset` <br> <em class="expandable">expandable</em> | The dataset
`user` <br> <em class="expandable">expandable</em> | Unique identifier of the dataset linked to the object
`timestamp` <br> *string* | Unique identifier of the user who created the object
`diff` <br> *string* | Name of the function the job is running
`sections` <br> *object* | Parameters passed to the job's function

## List all changes

> Definition

```HTTP
GET https://{DOMAIN_ID}.opendatasoft.com/api/management/v2/datasets/{DATASET_ID}/changes/
```

Returns a list of changes for this datasets.

### Parameters

Parameter | Description
--------- | -----------
dataset_id <br> *string* | **required** ID of the dataset whose changes we want to list


```shell
curl https://yourdomain.opendatasoft.com/api/management/v2/datasets/yourdataset/changes/ \
    -u username:password
```


> Example response

```json
[
    {...},
    {
        "change_id": 126,
        "dataset": {
            "dataset_id": "yourdataset"
        },
        "user": {
            "username": "username"
        },
        "timestamp": "2017-06-07T15:16:05.701266+00:00",
        "diff": null,
        "sections": [
            "metadata",
            "data"
        ]
    },
    {...}
]
```



## Restore a changes

> Definition

```HTTP
GET https://{DOMAIN_ID}.opendatasoft.com/api/management/v2/datasets/{DATASET_ID}/restore_change/{CHANGE_ID}/
```

Returns a list of changes for this datasets.

### Parameters

> Example request

```shell
curl https://yourdomain.opendatasoft.com/api/management/v2/restore_change/126/ \
    -u username:password
```

Parameter | Description
--------- | -----------
dataset_id <br> *string* | **required** ID of the dataset to restore to a previous change
change_id <br> *string* | **required** ID of the change to restore

