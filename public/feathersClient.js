const client = feathers();

// Connect to a different URL
const restClient = feathers.rest('http://localhost:3030') // for dev
// const restClient = feathers.rest('https://my-feelings-vis.herokuapp.com') // for production

// Configure an AJAX library (see below) with that client 
client.configure(restClient.fetch(window.fetch));

client.configure(feathers.authentication({
    header: 'Authorization', // the default authorization header for REST
    prefix: '', // if set will add a prefix to the header value. for example if prefix was 'JWT' then the header would be 'Authorization: JWT eyJ0eXAiOiJKV1QiLCJhbGciOi...'
    path: '/authentication', // the server-side authentication service path
    jwtStrategy: 'jwt', // the name of the JWT authentication strategy
    entity: 'user', // the entity you are authenticating (ie. a users)
    service: 'users', // the service to look up the entity
    cookie: 'feathers-jwt', // the name of the cookie to parse the JWT from when cookies are enabled server side
    storageKey: 'feathers-jwt', // the key to store the accessToken in localstorage or AsyncStorage on React Native
    storage: localStorage // Passing a WebStorage-compatible object to enable automatic storage on the client.
}));

// Connect to the `http://feathers-api.com/messages` service
// const messages = app.service('messages');
const feelings = client.service('feelings');