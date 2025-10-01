# Using OAuth2 authorization

## Overview

Huwise implements the OAuth2 authorization flow, allowing third party application makers to access the data
hosted on an Huwise platform on behalf of a user while never having to deal with a password, thus avoiding any user
credential to be compromised.

The Huwise OAuth2 authorization flow is compliant with [RFC 6749](https://tools.ietf.org/html/rfc6749) and makes
use of Bearer Tokens in compliance with [RFC 6750](https://tools.ietf.org/html/rfc6750).

Application developers who want to use the Huwise APIs with OAuth2 must go through the following steps, which will be explained in this section.

1. Register their application with the Huwise platform.
2. Request approval from users via an OAuth2 authorization grant.
3. Request a bearer token that will allows them to query the Huwise platform APIs for a limited amount of time.
4. Refresh the Bearer Token when it expires.

Currently, applications are registered on a specific domain and can only access data on this domain.

## Register an application for OAuth2 authentication

![OAuth2 applications management interface](common/oauth2__applications.png)

1. Go to the **My applications** tab of your account page on the domain you want to register the application on.
2. Fill the registration form with the following information:
    * **Application name:** the name of the application
    * **Type:**
        * confidential: client password is kept secret from the user and only used from a trusted environment (e.g: a web service, where the client password is stored server-side and never sent to the user)
        * public: client password is embedded in a client-side application, making it potentially available to the world (e.g: a mobile or desktop application)
    * **Redirection URL:** the URL users will be redirected to after they have granted you permission to access their data
3. Store the resulting **client ID** and **client secret** that will be needed to perform the next steps.

## Getting an authorization grant

> Example call to `/oauth2/authorize/`

```text
GET /oauth2/authorize/?
    client_id=123456789&
    redirect_uri=https://example.com&
    response_type=code&
    state=ilovedata&
    scope=all HTTP/1.1
```

To get an authorization grant from a user:

1. Redirect them to `/oauth2/authorize/` with the appropriate query parameters.
2. The user will then be authenticated in the platform and redirected to a page identifying your application.
3. From there, the user will review the information you filled in the form described above and the scope of the requested access, and grant your application the right to access their data.
4. Once the user has accepted those terms, they will be redirected to your application's redirection URL with query parameters describing your authorization grant.

The query parameters you need to supply when redirecting the user are the following:

* `client_id`: the client ID you were given during registration
* `redirect_uri`: the redirect URI you provided during registration
* `response_type`: this should always be set to `code`
* `scopes` *(optional)*: a list of space-separated requested scopes. Currently only `all` is supported
* `state` *(optional)*: a random string of your choice

<aside>
The state parameter is not mandatory, but providing one is recommended for security reasons to verify the returned value provided in the authorization grant redirect
</aside>

> Redirection following a successful authorization

```text
HTTP/1.0 302 FOUND
Location: https://example.com?state=ilovedata&code=gKnAQc2yIfdz2mY25xxgpTY2uyG5Sv
```

The authorization grant redirect will have these values:

* `code`: a 30-characters-long authorization code
* `state`: the state passed in the request described above

The 30-character authorization code must now be converted into a bearer token within 1 hour before expiring.

## Converting an authorization grant to a bearer token

> Example call to `/oauth2/token/`

```http
POST /oauth2/token/ HTTP/1.1

client_id=cid&
    client_secret=csc&
    grant_type=authorization_code&
    code=GokshWxRFXmW0MaLHkDv5HrG6wieGs&
    scopes=all&
    redirect_uri=https://example.com&
    state=ilovedata
```

To receive a bearer token, convert the previously obtained authorization grant via a POST request to `/oauth2/token/` with the following parameters:

* `client_id`: the client ID you were given during registration
* `client_secret`: the client secret you were given during registration
* `redirect_uri`: the redirect URI you provided during registration
* `grant_type`: this should always be set to `authorization_code`
* `code`: the 30-character authorization code received as an authorization grant
* `scopes` *(optional)*: a list of space-separated requested scopes. Currently only `all` is supported
* `state` *(optional)*: a random string of your choice

> Alternative call with an `Authorization` header

```http
POST /oauth2/token/ HTTP/1.1
Authorization: Basic Y2lkOmNzYw==

grant_type=authorization_code&
    code=GokshWxRFXmW0MaLHkDv5HrG6wieGs&
    scopes=all&
    redirect_uri=https://example.com&state=ilovedata
```

Alternatively, you can pass your client ID and client secret through the Authorization header

> Example response for a bearer token request

```http
HTTP/1.0 200 OK
Content-Type: application/json
```

```json
{
    "access_token": "9kxoTUYvSxnAiMpv008NBqRiqk5xWt",
    "expires_in": 3600,
    "token_type": "Bearer",
    "state": "ilovedata",
    "scope": "all",
    "refresh_token": "jFfDUcsK9zzNMs1zwczzJxGrimPtmf"
}
```

The response to this request is a JSON representation of a bearer token, which contains the following values:

* `access_token`: the token you can use to access the user's data.
* `expires_in`: the number of seconds before token expiration
* `token_type`: the type of the token. It will always be `Bearer`
* `state`: the state passed in the request described above
* `scope`: the list of scopes of this authorization code
* `refresh_token`: a refresh token that can be used to renew this bearer token when expired

<aside>
    Unlike the access token, that can be used any number of times until expiration, the refresh token doesn't expire but can only be used once
</aside>

## Using the bearer token

> Using the token as a query parameter

```http
GET /api/end/point?access_token=9kxoTUYvSxnAiMpv008NBqRiqk5xWt HTTP/1.1
```

> Using the token in an Authorization header

```http
GET /api/end/point HTTP/1.1
Authorization: Bearer 9kxoTUYvSxnAiMpv008NBqRiqk5xWt
```

> Using the token in the request body

```http
GET /api/end/point HTTP/1.1

access_token=9kxoTUYvSxnAiMpv008NBqRiqk5xWt
```

The bearer token can be passed along requests for authentication in three different ways:

* as a query parameter of the request
* in the request's `Authorization` header
* in the request body

## Refreshing a bearer token

> Example token refresh call

```http
POST /oauth2/token/ HTTP/1.1

client_id=cid&
    client_secret=csc&
    grant_type=refresh_token&
    refresh_token=jFfDUcsK9zzNMs1zwczzJxGrimPtmf&
    scopes=all&
    redirect_uri=https://example.com&
    state=ilovedata
```

To refresh an expired bearer token, send a request to the `/oauth2/token/` endpoint, with the following query parameters:

* `client_id`: the client ID you were given during registration
* `client_secret`: the client secret you were given during registration
* `refresh_token`: the refresh token returned in the bearer token response
* `grant_type`: this should always be set to `refresh_token`
* `scopes`: a list of space-separated requested scopes. Currently only `all` is supported
* `state` *(optional)*: a random string of your choice

The response to this request is identical to the bearer token response.

