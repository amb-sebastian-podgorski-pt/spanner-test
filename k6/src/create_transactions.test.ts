import http from "k6/http";
import {check} from "k6";
import {Options} from "k6/options";
import {SharedArray} from "k6/data";
// @ts-ignore
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

const API_BASE_URL = __ENV.API_BASE_URL || 'https://perftest-371677414206.europe-central2.run.app/api';

interface PersonId {
    id: string
}

function randomCurrency() {
    return Math.random() < 0.5 ? "EUR" : "USD";
}

function getRandomAmount(min: number, max: number) {
    const minCents = min * 100;
    const maxCents = max * 100;
    const randomCents = Math.floor(Math.random() * (maxCents - minCents + 1)) + minCents;
    return (randomCents / 100).toFixed(2);
}

function getPersonIds(): PersonId[] {
    return new SharedArray('persons', function () {
        return papaparse.parse(open(`persons.csv`), {header: true}).data
    });
}

const data = getPersonIds();

function createTransaction(personId: string, amount: string, currency: string) {
    const transaction = JSON.stringify({
        amount: amount,
        currency: currency,
    });

    return http.post(`${API_BASE_URL}/persons/${personId}/transactions`, transaction, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }, tags: {
            name: 'addTransaction'
        }
    })
}

export let options: Options = {
    scenarios: {
        persons: {
            preAllocatedVUs: 5,
            maxVUs: 50,
            executor: "ramping-arrival-rate",
            stages: [
                {target: 500, duration: '1m'},
                {target: 500, duration: '4m'},
            ]
        }
    },
    thresholds: {
        http_req_duration: ['p(95)<500'],
        http_req_failed: ['rate<0.01'],
    },

}

export default () => {
    const personId: string = data[Math.floor(Math.random() * data.length)].id;
    const res = createTransaction(personId,
        getRandomAmount(10, 50),
        randomCurrency()
    );

    check(res, {
        'status is 201': () => res.status === 201,
        'transaction data is valid': () => {
            try {
                const body = JSON.parse(res.body as string);
                return body &&
                    typeof body === 'object' &&
                    body.id !== undefined
            } catch {
                return false;
            }
        },
    });
};