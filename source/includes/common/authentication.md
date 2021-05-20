# Authentication

An authenticated user can be granted access to restricted datasets and benefit from extended quotas for API calls. The API features an authentication mechanism for users to be granted their specific authorizations.

For the platform to authenticate a user, you need to either:

* be logged in a portal so a session cookie authenticating your user is passed along your API calls, or
* provide an API key via the Authorization header or as a query parameter.

## Finding and generating API keys

API keys are managed via your user profile page at `https://<youropendatasoftportal>.com/account/` or by clicking on your name in the header.

![Link to account settings](common/authentication__profile-link.png)

Go to the tab named **My API keys** to see your existing API keys, revoke them and create new ones.

![Account's API keys page](common/authentication__my-api-keys.png)

<aside>
By default, every API key authenticates requests as coming from your user, which means they grant the same rights (yours) to any person using them. Therefore, you should not share your keys. For advanced usages, API key permissions can be edited using the <a href="https://help.opendatasoft.com/management-api/#api-keys">API key management API</a>.
</aside>

## Providing API keys within requests

> Unauthenticated request on a private portal

``` http
> GET https://private-portal.opendatasoft.com/api/v2/catalog/datasets/ HTTP/1.1

< HTTP/1.0 401 Unauthorized
```

> Authenticated request using an `Authorization: Apikey <API_KEY>` header

``` http
> GET https://private-portal.opendatasoft.com/api/v2/catalog/datasets/ HTTP/1.1
Authorization: Apikey 7511e8cc6d6dbe65f9bc8dae19e08c08a2cab96ef45a86112d303eee

< HTTP/1.0 200 OK
```

``` json
{
    "total_count": 4,
    "links": [{
        "href": "https://private-portal.opendatasoft.com/api/v2/catalog/datasets?include_app_metas=False&limit=10&offset=0",
        "rel": "self"
    }, {
        "href": "https://private-portal.opendatasoft.com/api/v2/catalog/datasets?include_app_metas=False&limit=10&offset=0",
        "rel": "first"
    }, {
        "href": "https://private-portal.opendatasoft.com/api/v2/catalog/datasets?include_app_metas=False&limit=10&offset=0",
        "rel": "last"
    }],
    "datasets": [...]
}
```

> Authenticated request using an API key as a query parameter

``` http
> GET https://private-portal.opendatasoft.com/api/v2/catalog/datasets/?apikey=7511e8cc6d6dbe65f9bc8dae19e08c08a2cab96ef45a86112d303eee HTTP/1.1

< HTTP/1.0 200 OK
```

``` json
{
    "total_count": 4,
    "links": [{
        "href": "https://private-portal.opendatasoft.com/api/v2/catalog/datasets?include_app_metas=False&limit=10&offset=0",
        "rel": "self"
    }, {
        "href": "https://private-portal.opendatasoft.com/api/v2/catalog/datasets?include_app_metas=False&limit=10&offset=0",
        "rel": "first"
    }, {
        "href": "https://private-portal.opendatasoft.com/api/v2/catalog/datasets?include_app_metas=False&limit=10&offset=0",
        "rel": "last"
    }],
    "datasets": [...]
}
```

If you try to access a private portal's catalog without being authenticated, the API returns a `401 Unauthorized` error.

After generating an API key, you can use it to make authenticated requests. Depending on the permissions granted to the user for which the API key has been created, the JSON response contains only data about the datasets this user can access on the portal.

It is good practice to pass the API key to the `Authorization` header in the following format:

`Authorization: Apikey <API_KEY>`

Alternatively, you can pass the API key as a query parameter in the following format:

`apikey=<API_KEY>`

Replace `<API_KEY>`with your API key.

<aside class="important">
<p>We recommend passing the API key via a header over in a query parameter because headers are not stored in your browser history or server logs, minimizing the risk of exposure of your API key.</p>
</aside>
