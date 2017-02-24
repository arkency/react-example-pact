import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow, mount } from 'enzyme';
// var waitsfor = require('waitsfor');
import waitUntil from 'wait-until-promise';


// import Pact from 'pact';

let Pact = require('pact')

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
// });











const path = require('path');
// const Pact = require('../../../src/pact.js');
// const getMeDogs = require('../index').getMeDogs;

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
  });

  const EXPECTED_BODY = [{dog: 1}];

  beforeAll(() => provider.setup());

  afterAll(() => provider.finalize());

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
      provider.addInteraction(interaction).then(done, done)
    });

    // i  t('returns a sucessful body', done => {
    //   // return getMeDogs({ url, port })
    //   //   .then(response => {
    //   //     expect(response.headers['content-type']).toEqual('application/json')
    //   //     expect(response.data).toEqual(EXPECTED_BODY)
    //   //     expect(response.status).toEqual(200)
    //   //     done()
    //   //   })
    //
    //   const div = document.createElement('div');
    //   ReactDOM.render(<App />, div);
    //   done();
    // });

    it('2', done => {
      const app = mount(<App />);
      console.log("rendered");
      expect(app.contains(<h2>Welcome to React</h2>)).toEqual(true);
      // waitsfor.waitsFor(function() { return true; }).then(done);
      // waitUntil(function() { return true; }).then(done);
      waitUntil(()=>{
        expect(app.contains(<p>PARSED</p>)).toEqual(true);
      }).then(done);
    });

    // verify with Pact, and reset expectations
    it('successfully verifies', () => provider.verify())
  });
});