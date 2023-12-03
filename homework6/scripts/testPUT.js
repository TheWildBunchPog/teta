import http from 'k6/http';
import { check, group } from 'k6';

export let options = {
    stages: [
        { duration: '30s', target: 100 },
        { duration: '1m', target: 200},
        { duration: '1m', target: 300 },
        { duration: '1m', target: 400},
        { duration: '1m', target: 500 },
        { duration: '30s', target: 600},
    ],
};

export default function () {
    group('API uptime check', () => {
        const params = {
            headers: {
                'Content-Type': 'application/json',
                "Host": "weather-api.sre-cource-student-16",
            },
        };
        const response = http.batch([
            ['PUT', 'http://91.185.85.213/Cities/25', {'name': 'Karaganda'}, params],
            ['PUT', 'http://91.185.85.213/Forecast/25', {'id': 25, 'cityId': 25, 'dateTime': 1699689555, 'temperature': 30, 'summary': 'Sunny'}, params],
        ])
        check(response[0], {
            "Status code should be 200": res => res.status === 200,
        });
    });
};