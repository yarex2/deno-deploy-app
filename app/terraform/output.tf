
output "backend_ecr_repo_url" {
  value = aws_ecr_repository.backend_ecr_repo.repository_url
}

output "frontend_ecr_repo_url" {
  value = aws_ecr_repository.frontend_ecr_repo.repository_url
}

resource "local_file" "backend_ecr_repo_url_file" {
    content  = aws_ecr_repository.backend_ecr_repo.repository_url
    filename = "./output/backend_ecr_repo_url"
}

resource "local_file" "frontend_ecr_repo_url_file" {
    content  = aws_ecr_repository.frontend_ecr_repo.repository_url
    filename = "./output/frontend_ecr_repo_url"
}
