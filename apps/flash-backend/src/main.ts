/* eslint-disable @nx/enforce-module-boundaries */
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import express from 'express';
import { Routes } from './controller/routes';
import { dbConfig } from './config/env';
import { connectToMongoDB } from '../../../libs/shared/db_connector/mongo_connector';

async function init() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // Initialize Express router with our routes
  const expressApp = express();
  
  // Add middleware to parse JSON bodies
  expressApp.use(express.json());
  expressApp.use(express.urlencoded({ extended: true }));

  // Enable CORS
  expressApp.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });

  const routes = new Routes();
  expressApp.use('/api/v1/flash_backend', routes.router);
  expressApp.get('/checking', (req, res) => {
    res.send('server is running');
  })
  app.use(expressApp);
 
  const port = dbConfig.PORT || 3000;
  connectToMongoDB();
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

init();
