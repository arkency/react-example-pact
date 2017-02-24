import React from 'react';
import App from './App';
import { shallow, mount } from 'enzyme';
import waitUntil from 'wait-until-promise';

// import Pact from 'pact';
let Pact = require('pact')

const path = require('path');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe("Dog's API", () => {
  let url = 'http://localhost';

  const port = 8989;
  const provider = Pact({
    port: port,
    log: path.resolve(process.cwd(), 'logs', 'mockserver-integration.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    spec: 2,
    consumer: 'App',
    provider: 'Rails',
    cors: true,
  });

  const EXPECTED_BODY = [{dog: 1}];

  beforeAll(() => {
    return provider.setup();
  });

  afterAll(() => {
    return provider.finalize();
  });

  describe("works", () => {
    beforeAll(done => {
      const interaction = {
        state: 'i have a list of projects',
        uponReceiving: 'a request for projects',
        withRequest: {
          method: 'GET',
          path: '/dogs',
          // headers: { 'Accept': 'application/json' }
        },
        willRespondWith: {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
          body: EXPECTED_BODY
        }
      };
      // return provider.addInteraction(interaction).then(done);
      provider.addInteraction(interaction).
        then(done, (e)=>{ console.log(e); console.log(e.total); console.log("problem with addInteration"); done(); }).
        catch((e) => { console.log(e); });
    });

    it('2', done => {
      const app = mount(<App />);
      expect(app.contains(<h2>Welcome to React</h2>)).toEqual(true);

      waitUntil(()=>{
        return app.contains(<p>PARSED</p>);
      }).then(()=>{
        expect(app.contains(<p>PARSED</p>)).toEqual(true);
        done();
      });
    });

    // verify with Pact, and reset expectations
    it('successfully verifies', () => provider.verify())
  });
});