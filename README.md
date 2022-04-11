# ping-them-all

This simple script send pings to servers around world and generate report with collected measurements.
It come with some predefined lists of targets you can choose from or you can define own lists.
Information about your aproximated geographical localization is attached to raport and is based on [ip-api.com](http://ip-api.com).

available targets:
  * `debianSmall` - subset of major debian mirrors - 35 targets
  * `debianBig` - most of remaining debian mirrors - 255 targets
  * `debian` - debianBig+debianSmall - 290 targets
  * `alibaba` - 20 targets
  * `aws` - 26 targets
  * `digitalocean` - 13 targets
  * `google` - 15 targets
  * `ovh` - 10 targets
  * `cloud` - alibaba+aws+digitalocean+google+ovh - 84 targets
  * `all` - debian+cloud - 374 targets
  * `<your path here>` - you may as well create custom target list - it just need to be json file with array of domains to ping


note: more targets to ping means more time to wait to get results

examples:
  * `./pta ovh google` - will collect pings to ovh and google cloud
  * `./pta debianSmall aws ./myList.json` - will collect pings to subset of debian mirrors, aws and hosts listed in `myList.json` file

example custom list file content: `["google.com", "wikipedia.org"]`

## How to run it?

First of all you will have to install [nodejs](https://nodejs.org/en/download/)

Then open console and type:
```
# git clone https://github.com/DenuvoSoftwareSolutions/ping-them-all.git
# cd ping-them-all
# npm install --only=prod
# node ./bin/pta cloud
```

Alternatively, instead using git you can download archive from github, unpack it and install dependencies with npm.

## How can I contribute?

First of all report your pings - especially to `cloud` target :)
Secondly let us know about hosts of other cloud providers we could add.

If you would like to add some new functionality or improve existing, feel free to create pull request.

## Where report bugs?

[DenuvoSoftwareSolutions/ping-them-all/issues](https://github.com/DenuvoSoftwareSolutions/ping-them-all/issues)
Please prefix title with `BUG: <title here>`

## Where can I report my pings?

[DenuvoSoftwareSolutions/ping-them-all/issues](https://github.com/DenuvoSoftwareSolutions/ping-them-all/issues)
Please prefix title with `PING: <title here>`
