import csvParse from 'csv-parse/lib/sync';
import EventEmitter from 'events';
import fs from 'fs';
import path from 'path';
import filterByRegExp from '../lib/filter-by-reg-exp';
import logger from '../lib/logger';
import postalCodesDb from './postal-codes';

class LocationsDataContainer extends EventEmitter {
  constructor() {
    super();

    this.data = null;
    this.init();
  }

  async init() {
    try {
      logger.info('Locations data container: Initializing…');

      // Load locations from CSV data file
      this.data = csvParse(
        fs.readFileSync(
          path.resolve(__dirname, '../../data/locations.csv').toString()
        ),
        { columns: true }
      );

      logger.info('Locations data container: Initialized.');
      this.emit('initialized');
    } catch (initError) {
      logger.error(initError);
      this.emit('error', initError);
    }
  }

  assertInitialized() {
    if (this.data === null) {
      throw new Error('Locations data container is not initialized');
    }
  }

  find(query) {
    this.assertInitialized();
    const regExpFilteredFranchisees = filterByRegExp(this.data, query);

    const postalCodes = postalCodesDb.data;

    const isPostalCodeAndCountryCodeInPostalCodesFilter = franchisee => {
      return postalCodes.some(postalCode => {
        return (
          postalCode.postalCode === franchisee.postalCode &&
          postalCode.countryCode === franchisee.countryCode
        );
      });
    };

    return regExpFilteredFranchisees.filter(
      isPostalCodeAndCountryCodeInPostalCodesFilter
    );
  }

  getFranchiseeCountPerCountry() {
    const franchiseeCountPerCountry = {};

    for (const franchisee of this.data) {
      const franchiseeCountryCode = franchisee.countryCode;

      if (franchiseeCountPerCountry[franchiseeCountryCode] === undefined) {
        franchiseeCountPerCountry[franchiseeCountryCode] = 1;
      } else {
        franchiseeCountPerCountry[franchiseeCountryCode] =
          franchiseeCountPerCountry[franchiseeCountryCode] + 1;
      }
    }

    /**
     note for Loris :
     if there is not need to count, we can use the interesting _.groupBy() function :
      const franchiseesByCountry = _.groupBy(
        this.data,
        franchisee => franchisee.countryCode
      );
     */

    return franchiseeCountPerCountry; // ex: { "FR" : 890, "AN" : 2, "GB": 3 };
  }
}

const db = new LocationsDataContainer();

export default db;
