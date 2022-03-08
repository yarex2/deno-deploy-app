resource "aws_dynamodb_table" "dynamodb_table" {
  name = var.TABLE_NAME

  billing_mode = "PAY_PER_REQUEST"
  # read_capacity  = 20
  # write_capacity = 20

  hash_key  = "id"
  range_key = "timestamp"

  attribute {
    name = "id"
    type = "S"
  }

  # attribute {
  #   name = "message"
  #   type = "S"
  # }

  attribute {
    name = "timestamp"
    type = "N"
  }

  tags = {
    Name        = "dynamodb_table"
    Environment = "test-dev"
  }
}
