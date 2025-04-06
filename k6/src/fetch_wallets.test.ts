import http from "k6/http";
import {check} from "k6";
import {Options} from "k6/options";
import scenario from 'k6/execution'
import {SharedArray} from "k6/data";
// @ts-ignore
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

const API_BASE_URL = __ENV.API_BASE_URL || `https://perftest-371677414206.europe-central2.run.app/api`;

interface PersonId {
    id: string
}

function getPersonIds(): PersonId[] {
    return new SharedArray('persons', function () {
        return papaparse.parse(open(`persons.csv`), {header: true}).data
    });
}

const data = getPersonIds();

function fetchWallet(personId: string) {
    return http.get(`${API_BASE_URL}/persons/${personId}/wallets`, {
        headers: {
            'Accept': 'application/json',
        }, tags: {
            name: 'fetchWallet'
        }
    })
}

export let options: Options = {
    scenarios: {
        persons: {
            executor: 'shared-iterations',
            vus: 50,
            iterations: 100000,
            maxDuration: '5m'
        }
    },
    thresholds: {
        http_req_duration: ['p(95)<500'],
        http_req_failed: ['rate<0.01'],
    },

}

export default () => {
    const currentIndex = scenario.scenario.iterationInInstance;
    const personId: string = data[currentIndex].id;
    const res = fetchWallet(personId);

    // console.log(personId)

    check(res, {
        'status is 200': () => res.status === 200,
        'wallet data is valid': () => {
            try {
                const body = JSON.parse(res.body as string);
                return body;
            } catch {
                return false;
            }
        },
    });
};