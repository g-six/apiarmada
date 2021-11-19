import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
type Region = 'ap-southeast-1' | 'us-east-2'
const serverlessConfiguration: AWS = {
  org: 'xsquad',
  app: 'rjwheels',
  service: 'auth',
  frameworkVersion: '2',
  plugins: [
    'serverless-esbuild',
    'serverless-offline'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: process.env.AWS_REGION as Region,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { hello },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    'serverless-offline': {
      httpPort: 4000
    }
  },
};

module.exports = serverlessConfiguration;
