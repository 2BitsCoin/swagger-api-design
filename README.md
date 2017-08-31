# Waves API v2 [_working draft_]

## Deployment
```
pacman -S node docker
node server.js
docker pull swaggerapi/swagger-ui
docker run -p 80:8080 -e "API_URL=http://localhost:8888/node.v2.yaml" swaggerapi/swagger-ui
```
or replace the path to a YAML file in the last command. For example, to see the matcher API:
```
docker run -p 80:8080 -e "API_URL=http://localhost:8888/matcher.v2.yaml" swaggerapi/swagger-ui
```
You will be able to specify the API design file later, on the page opened in browser.

And then open http://localhost.

## Disclaimer
As far as Swagger UI doesn't fully support `oneOf` property we decided to use `#` to indicate those parameters which can be replaced by each other. Generally, there are two cases for `#` notation.

**First**. The situations where only one of the values can be used. For example:
```
recipient#address:
    $ref: '#/schemas/Address'
recipient#alias:
    $ref: '#/schemas/Alias'
```
means that there is one field `recipient` which can be an address **or** an alias.

The similar case is with the errors which are related to one HTTP code (e.g. code 400 means "wrong request" and the exact wrong parameters may differ).

**Second**. The list which must be merged together, for example:
```
list#transfer:
    type: array
    items:
        $ref: 'components.yaml#/schemas/TransferTransaction'
list#issue:
    type: array
    items:
        $ref: 'components.yaml#/schemas/IssueTransaction'
list#reissue:
    type: array
    items:
        $ref: 'components.yaml#/schemas/ReissueTransaction'
list#burn:
    type: array
    items:
        $ref: 'components.yaml#/schemas/BurnTransaction'
```
means that the response will contain only one `list` property combined of all `#`-marked parts.