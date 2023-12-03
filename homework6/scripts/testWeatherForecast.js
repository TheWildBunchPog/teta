import http from 'k6/http';
import { check, group } from 'k6';

export let options = {
    stages: [
        { duration: '30s', target: 25 },
        { duration: '1m', target: 50},
        { duration: '1m', target: 75 },
        { duration: '30s', target: 100},
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
            ['GET', 'http://91.185.85.213/WeatherForecast', null, params],
        ])
        check(response[0], {
            "Status code should be 200": res => res.status === 200,
        });
    });
};