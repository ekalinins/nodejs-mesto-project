require('dotenv').config();

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF = 'origin/main',
} = process.env;

module.exports = {
  apps: [{
    name: 'api-service',
    script: 'dist/app.js',
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/ekalinins/nodejs-mesto-project.git',
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp ./.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/current`,
      'post-deploy': 'pwd && source ~/.nvm/nvm.sh && npm ci && npm run build && pm2 startOrRestart ecosystem.config.js',
    },
  },
};
