#!/bin/sh

echo 'Updating system packages ...';
apk update;

echo 'Adding tzdata package ...';
apk --no-cache add tzdata;

echo 'Cleaning packages cache ...';
rm -rf /var/cache/apk/*;


# NODE_OPTIONS=--max-old-space-size=1536;
