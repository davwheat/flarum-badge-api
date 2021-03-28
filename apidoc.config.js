module.exports = {
  name: 'Flarum Badge API',
  version: '1.0.0',
  description: 'A simple and free API for everything you need related to Flarum extensions.',
  title: 'Docs - Flarum Badge API',
  apidoc: {
    title: 'Flarum Badge API',
    base_url: 'https://flarum-badge-api.davwheat.dev/',
  },
  details: [
    'This API is meant for simple use in public-facing applications for ease of use. This is not intended to be used in a client-server application: instead you should implement the Extiverse API yourself.',
    'This service offers no uptime guarantee, and may suffer downtime at any moment, for any reason. The service will remain up for as long as feasible.',
  ],
  vcs: {
    url: 'https://github.com/davwheat/flarum-badge-api',
    service: 'GitHub',
  },
  template: {
    withGenerator: false,
  },
}
