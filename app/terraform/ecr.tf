resource "aws_ecr_repository" "backend_ecr_repo" {
    name = "dd_backend_ecr_repo"
}

resource "aws_ecr_repository" "frontend_ecr_repo" {
    name = "dd_frontend_ecr_repo"
}
