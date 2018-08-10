<!-- Answers to the Short Answer Essay Questions go here -->

1.  Describe Middleware, Sessions (as we know them in express), bcrypt and JWT.
- Seems like everything in node is middleware. Middleware is, software in between or in the middle of, the client and the server. A request is usually sent by the client to the server. Middleware has the ability to grab the request from the client and modify it before sending it along it way to the endpoint. Middleware can be global, eg, it applies to all requests or it can be local, eg it applies only to a particular endpoint(s). 

- Sessions are the classic way to implement authentication. Express-session is a library that helps us use sessions in node. When a user is authenticated (via their username/password) a session object can be attached to the request via `req.session = session_object`. A simple use case would be to place the username as the session object. The library is set up so that each request and response will now have that session in the request. Sessions are tied to a per client / per device.

- bcrypt is hashing library. Hashing is different from encryption where hashing is 1-way and while encryptions is 2 way, thus decryption. brcrypt is a library usually used to _hash_ a password before storing it into a database. This ensures that the users actual password is never known or stored.

- JWT is JSON Web Tokens. It's a newer spec for authentication, an alternative to sessions.  JWT can set created and set at the same point in the req/res cycle as sessions. The only difference is that JWTs are not automatically added to the requests like sessions. They have to be sent by the client each time for each subsequest request. Due to this requirement, JWTs are often stored in local storage on the client's browswer.

2.  What does bcrypt do in order to prevent attacks?
- bcrypt hashes the hash in multiple rounds. Each round can be specified and is usually 2^n, where n is specified by the developer. This prevents rainbow table attacks.

3.  What are the three parts of the JSON Web Token?

-A JWT is a string with 3 sections delimited with a period. A header, payload and the signature. The header ususally holds the type of token and the hashing algorithm. The payload contains the claims. Claims can be registered, public or private. Registered claims are predefined that are recommended but not required. examples are iss (issuer), exp (expiration), sub (subject), etc. Public claims are ones that are application specific.
