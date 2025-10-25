package compliance

# Kubernetes compliance policies for Inopsio infrastructure

# Check for resources without resource limits
resource_without_limits(container) {
    not container.resources.limits
}

# Check for resources without resource requests
resource_without_requests(container) {
    not container.resources.requests
}

# Check for containers running as root
container_as_root(container) {
    container.securityContext.runAsUser == 0
}

# Check for containers without security context
container_without_security_context(container) {
    not container.securityContext
}

# Check for pods without security context
pod_without_security_context(pod) {
    not pod.spec.securityContext
}

# Check for pods without service account
pod_without_service_account(pod) {
    not pod.spec.serviceAccountName
}

# Check for services without type specified
service_without_type(service) {
    not service.spec.type
}

# Check for ingress without TLS
ingress_without_tls(ingress) {
    not ingress.spec.tls
}

# Check for configmaps with sensitive data
configmap_with_sensitive_data(configmap) {
    data := configmap.data
    sensitive_keys := {"password", "secret", "key", "token", "credential"}
    some key in sensitive_keys
    data[key]
}

# Check for secrets without proper type
secret_without_type(secret) {
    not secret.type
}

# Check for deployments without replicas
deployment_without_replicas(deployment) {
    not deployment.spec.replicas
    deployment.spec.replicas == 0
}

# Check for services without selectors
service_without_selector(service) {
    not service.spec.selector
}

# Main compliance check
violations[msg] {
    container := input.kubernetes.containers[_]
    resource_without_limits(container)
    msg := sprintf("Container %s has no resource limits", [container.name])
}

violations[msg] {
    container := input.kubernetes.containers[_]
    resource_without_requests(container)
    msg := sprintf("Container %s has no resource requests", [container.name])
}

violations[msg] {
    container := input.kubernetes.containers[_]
    container_as_root(container)
    msg := sprintf("Container %s is running as root", [container.name])
}

violations[msg] {
    container := input.kubernetes.containers[_]
    container_without_security_context(container)
    msg := sprintf("Container %s has no security context", [container.name])
}

violations[msg] {
    pod := input.kubernetes.pods[_]
    pod_without_security_context(pod)
    msg := sprintf("Pod %s has no security context", [pod.name])
}

violations[msg] {
    pod := input.kubernetes.pods[_]
    pod_without_service_account(pod)
    msg := sprintf("Pod %s has no service account", [pod.name])
}

violations[msg] {
    service := input.kubernetes.services[_]
    service_without_type(service)
    msg := sprintf("Service %s has no type specified", [service.name])
}

violations[msg] {
    ingress := input.kubernetes.ingresses[_]
    ingress_without_tls(ingress)
    msg := sprintf("Ingress %s has no TLS configuration", [ingress.name])
}

violations[msg] {
    configmap := input.kubernetes.configmaps[_]
    configmap_with_sensitive_data(configmap)
    msg := sprintf("ConfigMap %s contains sensitive data", [configmap.name])
}

violations[msg] {
    secret := input.kubernetes.secrets[_]
    secret_without_type(secret)
    msg := sprintf("Secret %s has no type specified", [secret.name])
}

violations[msg] {
    deployment := input.kubernetes.deployments[_]
    deployment_without_replicas(deployment)
    msg := sprintf("Deployment %s has no replicas configured", [deployment.name])
}

violations[msg] {
    service := input.kubernetes.services[_]
    service_without_selector(service)
    msg := sprintf("Service %s has no selector", [service.name])
}
