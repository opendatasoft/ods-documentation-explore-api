# OpenDataSoft Management API Documentation

## Building the documentation

### Prerequisites

You will need bundler to build the documentation.

```shell
bundle install --path vendor/bundle
```

### Development server

To run the development server

```shell
bundle exec middleman server
```

You can now see the docs at http://localhost:4567.

### Build

```shell
bundle exec middleman build
```

## Writing rules

All endpoints should include:

* A *definition*

  URL attributes are specified all caps between curly braces `{}`.

  The URL must include the full path and scheme.

  ```markdown
  ```HTTP
  GET https://{DOMAIN_ID}.opendatasoft.com/api/management/v2/datasets/{DATASET_UID}/metadata/{TEMPLATE_NAME}/{METADATA_NAME}
  ```

* An *example request*

  A real-life example. Be careful not to include your actual username and password.

  ```markdown
  ```HTTP
  curl https://yourdomain.opendatasoft.com/api/management/v2/datasets/da_XXXXXX/metadata/default/title/ \
      -u username:password \
      -X DELETE
  ```
  ```

* An *example response*

  The real-life response to the example request.

  You can do ellipsis with `{...}`.

  ```markdown
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
  ```