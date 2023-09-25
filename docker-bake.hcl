
// aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin 786821818288.dkr.ecr.eu-central-1.amazonaws.com

variable "ECR_REGISTRY" {
 default ="786821818288.dkr.ecr.eu-central-1.amazonaws.com"
}
variable "REACT_APP_AUTH0_CLIENT_ID" {
 default ="psatPpfAz1GplkLf1NSWsRZ8Bwqw5yT2"
}
variable "REACT_APP_AUTH0_DOMAIN" {
 default ="dev-goheenrpmn102mmq.us.auth0.com"
}

variable "TAGVERSION" {
 default = formatdate("YYYY.MM.DD", timestamp())
}
group "default" {
  targets = [
    "dev-fr",
  ]
}

target "dev-de" {
  dockerfile = "Dockerfile"
  tags = ["${ECR_REGISTRY}/marqoola-ui:latest", "${ECR_REGISTRY}/marqoola-ui:dev-de",  "${ECR_REGISTRY}/marqoola-ui:dev-de-${TAGVERSION}"]
  context = "."
  args = {
    REACT_APP_API_URL = "https://dev-de.marqoola.app/api/"
    REACT_APP_AUTH0_CLIENT_ID = "${REACT_APP_AUTH0_CLIENT_ID}"
    REACT_APP_AUTH0_DOMAIN = "${REACT_APP_AUTH0_DOMAIN}"

    REACT_APP_AUTH0_AUDIENCE = "https://dev.marqoola.app/api/"
  }
  labels = {
    builton = timestamp()
    test = "hello"
  }
}


target "dev-fr" {
    inherits = ["dev-de"]
  tags = ["${ECR_REGISTRY}/marqoola-ui:dev-fr-${TAGVERSION}", "${ECR_REGISTRY}/marqoola-ui:dev-fr"]
  context = "."
  args = {
    REACT_APP_API_URL = "https://dev-fr.marqoola.app/api/"
  }
}
