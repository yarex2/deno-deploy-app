resource "aws_security_group" "dd_backend_security_group" {
    name = "dd_backend_security_group"
    description = "Allow TLS inbound traffic on port 80 (http)"
    vpc_id = "${aws_vpc.main_vpc.id}"

    ingress {
        from_port = 80
        to_port = 3000
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
}

resource "aws_security_group" "dd_frontend_security_group" {
    name = "dd_frontend_security_group"
    description = "Allow TLS inbound traffic on port 80 (http)"
    vpc_id = "${aws_vpc.main_vpc.id}"

    ingress {
        from_port = 80
        to_port = 80
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
}
