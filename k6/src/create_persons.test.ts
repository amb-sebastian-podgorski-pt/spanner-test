import http from "k6/http";
import {check} from "k6";
import {Options} from "k6/options";
import scenario from 'k6/execution'

// @ts-ignore
    import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.3.0/index.js'

const API_BASE_URL = __ENV.API_BASE_URL || 'https://perftest-371677414206.europe-central2.run.app/api';

function addPerson(index: number) {
    const person = JSON.stringify({
        firstName: 'FN' + index,
        lastName: 'LN' + index,
        email: uuidv4() + '@spanner.gmail.com'
    });

    return http.post(`${API_BASE_URL}/persons`, person, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }, tags: {
            name: 'addPerson'
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
    const res = addPerson(currentIndex);

    check(res, {
        'status is 200': () => res.status === 200,
        'person data is valid': () => {
            try {
                const body = JSON.parse(res.body as string);
                return body &&
                    typeof body === 'object' &&
                    body.id !== undefined &&
                    body.firstName !== undefined &&
                    body.lastName !== undefined &&
                    body.email !== undefined;
            } catch {
                return false;
            }
        },
    });
};