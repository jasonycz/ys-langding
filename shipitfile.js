const process = require('process')

module.exports = shipit => {
  require('shipit-deploy')(shipit)

  const user = process.env.SHIPIT_USER

  shipit.initConfig({
    office: {
      servers: `root@101.201.198.27`
    }
  })

  const localBuildPath = 'dist/'
  const deployPath = '/data/apps/ys-landing/'

  shipit.task('deploy', () => {
    shipit.local('npm run build')
    .then(() => {
      shipit.remoteCopy(
        `./${localBuildPath}`,
         deployPath
      )
    })
    .then(() => {
      shipit.log('DEPLOY SUCCESS')
    })
  })
}
