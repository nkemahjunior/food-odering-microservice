FROM prom/prometheus:v3.2.0

USER root
RUN apk add --no-cache aws-cli
USER prometheus

ENTRYPOINT ["/bin/sh", "-c"]
CMD ["aws s3 cp s3://my-monitoring-configs/prometheus.yml /etc/prometheus/prometheus.yml && /bin/prometheus --config.file=/etc/prometheus/prometheus.yml"]