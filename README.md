# speak-andrew
I messed around with Lyrebird https://lyrebird.ai/ enough to know how I'll sound if I ever become half robot.

I also looked at the Merlin voice project a bit as well https://github.com/CSTR-Edinburgh/merlin

Though Lyrebird proved far easier to start with and build off of, it's not open source and therefore difficult to learn from and help improve. 

I haven't found a way to shorten the time it takes to generate my voice when given text, but I tried various caching mechanisms (redis, http-cache-middleware) and settled on just making my own.
At the moment the caching isn't very "smart" but I would like to improve it with time :)

## Demo https://speak-andrew.herokuapp.com
