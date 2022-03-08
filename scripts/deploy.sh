cd ./app/terraform
terraform apply

backend_ecr_repo_url=`cat ./output/backend_ecr_repo_url`
frontend_ecr_repo_url=`cat ./output/frontend_ecr_repo_url`

ACCOUNT_ID=$(aws sts get-caller-identity | jq -r ".Account")
aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin "$ACCOUNT_ID.dkr.ecr.eu-west-1.amazonaws.com"

docker tag deno-deploy-server:latest "$backend_ecr_repo_url":latest
docker push "$backend_ecr_repo_url":latest

docker tag deno-deploy-client:latest "$frontend_ecr_repo_url":latest
docker push "$frontend_ecr_repo_url":latest
