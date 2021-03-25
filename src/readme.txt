Hello!

You can use this super-cool service to create a badge that shows if your
Flarum ext is up-to-date and compatible with the latest version of Flarum.

To use it, just fire a request to:

%%BASE_URL%%/v1/compat-latest/:packageName

For example:

%%BASE_URL%%/v1/compat-latest/davwheat/custom-sidenav-links


-------------------------------------------------------------------------------

There are a few limitations:

- your badge will be cached for 1 hour on users' browsers (they may not see any
  updates to your badge for up to an hour after you update your extension)

- your badge will be cached on my server for up to 30 mins (noone may see an
  update to your badge for up to 30 mins after you update your extension)

- this service relies on the Extiverse API, so we rely on them providing
  up-to-date info about extensions

-------------------------------------------------------------------------------

This service is provided free by David Wheatley (davwheat).

Uptime is not guaranteed, and this service may go down at any time, for any
reason, and for any length of time.

https://github.com/davwheat
