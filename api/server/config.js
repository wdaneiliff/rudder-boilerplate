'use strict';

import Confidence from 'confidence';
import path from 'path';

const criteria = {
    env: process.env.NODE_ENV
};

const config = {

  $meta: 'Our main Application config',

  pkg: require('../package.json'),

  server : {
    debug: {
      $filter: 'env',
      production: false,
      test: false,
      $default: {
        log: ['error'],
        request: ['error']
      }
    }
  },

  connection : {
    port : process.env.EXTERNAL_PORT,
    host : '0.0.0.0'
  },

  api: {
    swagger: {
      info: {
        title: 'Rudder API',
        description: 'The official API for the Rudder platform.',
      },
      securityDefinitions: [{
        type: 'apiKey',
        in: 'header',
        name: 'Authorization'
      }]
    }
  },

  security: {
    saltWorkFactor: 10,
    jwtSecret: 'T6^9v@q24c&WVhUv)3.Zu3'
  },

  logging : {
    ops: {
      interval: 1000
    },
    reporters: {
      $filter: 'env',
      test: {},
      $default: {
        console: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ log: '*', response: '*' }]
          }, {
            module: 'good-console'
          },
          'stdout'
        ]
      }
    }
  },

  aws: {
    accessKeyId: '',
    secretAccessKey: '',
    region: 'us-west-2'
  },

  media: {
    bucket: '',
    prefix: ''
  },

  db: {
    sequelize: {
      name: process.env.RUDDER_DB_NAME,
      user: process.env.RUDDER_DB_USER,
      pass: process.env.RUDDER_DB_PASS,
      port: process.env.RUDDER_DB_PORT,
      host: process.env.RUDDER_DB_HOST,
      dialect: 'postgres',
      logging: {
        $filter: 'env',
        test: false,
        $default: console.log
      },
      models: 'server/**/*.Model.js',
      sequelize: {
        define: {
          paranoid: true // Data should never be deleted, only flagged as deleted
        }
      }
    }
  }

}

const store = new Confidence.Store(config);

export default {
  get(key) {
    return store.get(key, criteria);
  },
  meta(key) {
    return store.meta(key, criteria);
  }
}
