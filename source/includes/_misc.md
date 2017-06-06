# Misc

## Jobs

### The job object

#### Attributes

Attribute | Description
--------- | -----------
job_id <br> *string* | Unique identifier for the object
domain_id <br> *string* | Unique identifier of the domain linked to the object
dataset_uid <br> *string* | Unique identifier of the dataset linked to the object
user_id <br> *string* | Unique identifier of the user who created the object
function <br> *string* | Name of the function the job is running
params <br> *object* | Parameters passed to the job's function
state <br> *string* | Current state of the job. <br> Possible values are `started`, `running`, `done`, `error`, `waiting`
progresses <br> *array* | TODO
result <br> *object* | The job's function's response, available if `state` is `done`

### List all jobs

> Definition

```HTTP
GET https://yourdomain.opendatasoft.com/api/management/v2/jobs/
```

Returns a list of your jobs.

#### Arguments

> Example request

```shell
curl https://yourdomain.opendatasoft.com/api/management/v2/jobs/
    -u username:password
```

#### Returns

> Example response

```json
{

}
```

### Retrieve a job

> Definition

```HTTP
GET https://yourdomain.opendatasoft.com/api/management/v2/jobs/{job_id}/
```

Retrieves the job with the given ID.


#### Parameters

> Example request

```shell
curl https://yourdomain.opendatasoft.com/api/management/v2/jobs/jo_ZEXxzA/
    -u username:password
```

Parameter | Description
--------- | -----------
job_id <br> **REQUIRED** | ID of the job to retrieve

> Example response

```json
{

}
```

#### Returns

Returns a [job](#the-job-object) if a valid job ID was provided. Returns an error otherwise.