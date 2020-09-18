import express from 'express';
import locations from '../models/locations';
import convertObjectToCsv from '../lib/convertObjectToCsv';
import streamResponse from '../lib/streamer';

const locationsRouter = express.Router();

locationsRouter.get('/franchisee-by-country', (req, res) => {
  const franchiseeCountPerCountry = locations.getFranchiseeCountPerCountry();

  const csv = convertObjectToCsv(franchiseeCountPerCountry);

  const fileName = 'franchisee-by-country.csv';
  streamResponse(csv, res, fileName, 'text/csv');
});

export default locationsRouter;
