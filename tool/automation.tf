terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "~> 4.0"
    }
    random = {
      source = "hashicorp/random"
      version = "3.4.1"
    }
  }

  backend "s3" {
    bucket = "metacraft-terraform-states"
    key = "{{{id}}}"
    region = "ap-northeast-1"
  }
}

provider "aws" {
  region = "ap-northeast-1"
}

locals {
  originId = "walless-s3"
}

resource "aws_s3_bucket" "home" {
  bucket = "{{{id}}}"
}

resource "aws_s3_bucket_website_configuration" "home" {
  bucket = aws_s3_bucket.home.bucket

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}

resource "aws_cloudfront_distribution" "home" {
  enabled = true
  is_ipv6_enabled = true
  default_root_object = "index.html"
  aliases = ["{{{alias}}}"]

  origin {
    domain_name = aws_s3_bucket.home.bucket_regional_domain_name
    origin_id = local.originId
  }

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    viewer_protocol_policy = "redirect-to-https"
    target_origin_id = local.originId

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  custom_error_response {
    error_code = 403
    error_caching_min_ttl = 10
    response_page_path = "/index.html"
    response_code = 200
  }

  custom_error_response {
    error_code = 404
    error_caching_min_ttl = 10
    response_page_path = "/index.html"
    response_code = 200
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    ssl_support_method = "sni-only"
    acm_certificate_arn = "{{{sslArn}}}"
  }
}

output "homeCloudFrontId" {
  value = aws_cloudfront_distribution.home.id
}
