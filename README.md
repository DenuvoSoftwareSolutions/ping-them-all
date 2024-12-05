# ping-them-all

September 2022, &copy; Denuvo GmbH

This simple script sends pings to servers around the world and generates a report with collected measurements.
It comes with several predefined lists of targets you can choose from or you can define your own lists.
Information about your approximated geographical location is attached to the report and is based on [ip-api.com](http://ip-api.com).

See the accompanying writeup [Your ping will not improve!](https://denuvosoftwaresolutions.github.io/ping-them-all/ping.html).

Available targets:
  * `debianSmall` - subset of major Debian mirrors - 35 targets
  * `debianBig` - most of remaining Debian mirrors - 255 targets
  * `debian` - debianBig+debianSmall - 290 targets
  * `alibaba` - 20 targets
  * `aws` - 26 targets
  * `digitalocean` - 13 targets
  * `google` - 15 targets
  * `ovh` - 10 targets
  * `cloud` - alibaba+AWS+digitalocean+google+OVH - 84 targets
  * `all` - debian+cloud - 374 targets
  * `<your path here>` - you may as well create custom target list - it just needs to be a JSON file with array of domains to ping


Note: more targets to ping means more time to wait for to get results

Examples:
  * `./pta ovh google` - will collect pings to OVH and Google cloud
  * `./pta debianSmall aws ./myList.json` - will collect pings to subset of Debian mirrors, AWS and hosts listed in `myList.json` file

Example custom list file content: `["google.com", "wikipedia.org"]`

## How to run it?

First of all you will have to install [nodejs](https://nodejs.org/en/download/)

Then open a console and type:
```
$ git clone https://github.com/DenuvoSoftwareSolutions/ping-them-all.git
$ cd ping-them-all
$ npm install --only=prod
$ node ./bin/pta cloud
```

Alternatively, instead using git you can [download an archive from Github](https://github.com/DenuvoSoftwareSolutions/ping-them-all/archive/refs/heads/master.zip), unpack it, and install dependencies with npm.

## How can I contribute?

First of all, please report your pings - especially to `cloud` target :) - It should take around 5 minutes to complete.

Secondly, let us know about hosts of other hosting providers we could add.

If you would like to add some new functionality or improve existing, feel free to create pull request.

## Where report bugs?

[DenuvoSoftwareSolutions/ping-them-all/issues](https://github.com/DenuvoSoftwareSolutions/ping-them-all/issues)
Please prefix title with `BUG: <title here>`

## Where can I report my pings?

[DenuvoSoftwareSolutions/ping-them-all/issues](https://github.com/DenuvoSoftwareSolutions/ping-them-all/issues)
Please prefix title with `PING: <title here>`
