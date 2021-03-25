module.exports = {
  apps: [
    {
      name: 'Flarum Badge API',
      script: './index.js',
      log_file: 'combined_pm2.log',
      watch: true,
      watch_delay: 2000,
      ignore_watch: ['*.log'],
      args: ['--color', '--time'],
      // cwd: 'dist',
      // watch_options: {
        // cwd: 'dist',
      // },
    },
  ],
}
