# OpenDataSoft Management API Documentation

https://docs.opendatasoft.com/api/

* [Building the documentation](#building-the-documentation)
* [Writing rules](#writing-rules)

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

### Deploy

The `develop` branch is automatically deployed to https://betadocs.opendatasoft.com/api/

The `master` branch is automatically deployed to https://docs.opendatasoft.com/api/

## Writing rules

### General considerations

* **All titles must be followed by an introduction paragraph**
  This paragraph should explain what the section is about, what the reader will find in it and define all concepts and terms used.
* **Nice descriptions and definitions**
  Don't use the same terms for a thing and its description. Use other words keeping in mind that the reader may not be familiar with the concepts used.
* **Just the right size**
  Explanations should not overwhelm the reader by being too long but must be long enough for anybody to understand.
* **Always add an example**
  Each section or subsection should include an example illustrating what it's about. If the objects you are describing can have different shapes depending on some value, include multiple examples.
* **Use bullet points, not enumeration**
* **No (frigging) parentheses** They are used to signify content of lesser importance.
* **2, not two**
* **Neither we nor you** Use another phrasing
* **Identifier rather than ID** One is understandable by everyone, the other only by seasoned developers

### Objects and endpoints

Most of this documentation describes endpoints in the API.

* Endpoints relative to the same object should be grouped together in the same section
* The section should be named with the object's name in plural form (e.g. `Datasets`)
* The section should contain a first subsection describing the object and then a subsection for each endpoint

All endpoints should include:

* A *definition*

  URL attributes are specified all caps between curly braces `{}`.

  The URL must include the full path and scheme.

  ```HTTP
  GET https://{DOMAIN_ID}.opendatasoft.com/api/management/v2/datasets/{DATASET_UID}/metadata/{TEMPLATE_NAME}/{METADATA_NAME}
  ```

* A list of parameters

  Parameter descriptions should not have pronoun at the beginning nor punctuation at the end

* An *example request*

  A real-life example. Be careful not to include your actual username and password.

  ```HTTP
  curl https://yourdomain.opendatasoft.com/api/management/v2/datasets/da_XXXXXX/metadata/default/title/ \
      -u username:password \
      -X DELETE
  ```

* An *example response*

  The real-life response to the example request.

  You can do ellipsis with `{...}`.

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