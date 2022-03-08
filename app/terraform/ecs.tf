# Backend server
resource "aws_ecs_task_definition" "backend_task" {
    family = "dd_app_backend_family"
    requires_compatibilities = ["FARGATE"]
    network_mode = "awsvpc"

    // Valid sizes are shown here: https://aws.amazon.com/fargate/pricing/
    memory = "512"
    cpu = "256"

    // Fargate requires task definitions to have an execution role ARN to support ECR images
    execution_role_arn = "${aws_iam_role.ecs_role.arn}"

    container_definitions = <<EOT
[
    {
        "name": "dd_app_backend_container",
        "image": "${aws_ecr_repository.backend_ecr_repo.repository_url}:latest",
        "memory": 512,
        "essential": true,
        "portMappings": [
            {
                "containerPort": 3000,
                "hostPort": 3000
            }
        ]
    }
]
EOT

    depends_on = [
        aws_ecr_repository.backend_ecr_repo,
    ]
}

resource "aws_ecs_cluster" "backend_cluster" {
    name = "dd_app_backend_cluster"
}

resource "aws_ecs_service" "backend_service" {
    name = "dd_app_backend_service"

    cluster = "${aws_ecs_cluster.backend_cluster.id}"
    task_definition = "${aws_ecs_task_definition.backend_task.arn}"

    launch_type = "FARGATE"
    desired_count = 1

    network_configuration {
        subnets = ["${aws_subnet.main_public_1.id}"]
        security_groups = ["${aws_security_group.dd_backend_security_group.id}"]
        assign_public_ip = true
    }
}

# Frontend client
resource "aws_ecs_task_definition" "frontend_task" {
    family = "dd_app_frontend_family"
    requires_compatibilities = ["FARGATE"]
    network_mode = "awsvpc"

    // Valid sizes are shown here: https://aws.amazon.com/fargate/pricing/
    memory = "512"
    cpu = "256"

    // Fargate requires task definitions to have an execution role ARN to support ECR images
    execution_role_arn = "${aws_iam_role.ecs_role.arn}"

    container_definitions = <<EOT
[
    {
        "name": "dd_app_frontend_container",
        "image": "${aws_ecr_repository.frontend_ecr_repo.repository_url}:latest",
        "memory": 512,
        "essential": true,
        "portMappings": [
            {
                "containerPort": 8080,
                "hostPort": 8080
            }
        ]
    }
]
EOT

    depends_on = [
        aws_ecr_repository.frontend_ecr_repo,
    ]
}

resource "aws_ecs_cluster" "frontend_cluster" {
    name = "dd_app_frontend_cluster"
}

resource "aws_ecs_service" "frontend_service" {
    name = "dd_app_frontend_service"

    cluster = "${aws_ecs_cluster.frontend_cluster.id}"
    task_definition = "${aws_ecs_task_definition.frontend_task.arn}"

    launch_type = "FARGATE"
    desired_count = 1

    network_configuration {
        subnets = ["${aws_subnet.main_public_2.id}"]
        security_groups = ["${aws_security_group.dd_frontend_security_group.id}"]
        assign_public_ip = true
    }
}
