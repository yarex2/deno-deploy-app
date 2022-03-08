variable "AWS_ACCESS_KEY" {}
variable "AWS_SECRET_KEY" {}

variable "AWS_REGION" {
  type = string
  default = "eu-central-1"
}

variable "PROFILE" {
  type = string
  default = "dd_user"
}

variable "TABLE_NAME" {
  type = string
  default = "Todos"
}

