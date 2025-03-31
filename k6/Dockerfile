FROM grafana/k6:1.0.0-rc1

# Copy your test scripts into the container
COPY dist/ /scripts/

# Set entrypoint to run the k6 test
ENTRYPOINT ["k6", "run", "/scripts/create_persons.test.js"]