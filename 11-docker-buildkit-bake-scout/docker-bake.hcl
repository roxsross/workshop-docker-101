variable "TAG" {
  default = "1.0.0"
}

variable "REPO" {
  default = "roxsross/buildkit-demo"
}

group "default" {
  targets = ["app"]
}

target "app" {
  context    = "."
  dockerfile = "Dockerfile"
  tags       = ["${REPO}:${TAG}", "${REPO}:latest"]
  platforms  = ["linux/amd64", "linux/arm64"]
}
