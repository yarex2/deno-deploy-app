resource "aws_vpc" "main_vpc" {
    cidr_block = "10.0.0.0/16"
    enable_dns_hostnames = true
    enable_dns_support = true
}

resource "aws_subnet" "main_public_1" {
    vpc_id = "${aws_vpc.main_vpc.id}"
    cidr_block = "10.0.1.0/24"
    map_public_ip_on_launch = "true"
    availability_zone = "${var.AWS_REGION}a"

    tags = {
        Name = "main_public_1"
    }
}

resource "aws_subnet" "main_public_2" {
    vpc_id = "${aws_vpc.main_vpc.id}"
    cidr_block = "10.0.2.0/24"
    map_public_ip_on_launch = "true"
    availability_zone = "${var.AWS_REGION}a"

    tags = {
        Name = "main_public_2"
    }
}

resource "aws_subnet" "main_private_1" {
    vpc_id = "${aws_vpc.main_vpc.id}"
    cidr_block = "10.0.3.0/24"
    map_public_ip_on_launch = "false"
    availability_zone = "${var.AWS_REGION}a"

    tags = {
        Name = "main_private_1"
    }
}

resource "aws_internet_gateway" "main_gateway" {
    vpc_id = "${aws_vpc.main_vpc.id}"

    tags = {
        Name = "main"
    }
}


resource "aws_route" "internet_access" {
    route_table_id = "${aws_vpc.main_vpc.main_route_table_id}"
    destination_cidr_block = "0.0.0.0/0"
    gateway_id = "${aws_internet_gateway.main_gateway.id}"
}
