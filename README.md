# Serverless Repository

This repository contains serverless infrastructure code for managing email verification for new users. The project is built using AWS services like Lambda, SNS, and integrates with SendGrid for email sending. The serverless setup leverages Terraform for infrastructure management.

## Overview

This project automates user email verification using AWS Lambda, SNS, and SendGrid. Upon user creation, an SNS message triggers a Lambda function to send a verification email.

## Setup and Installation

### Prerequisites

- **AWS CLI**: Installed and configured.
- **Terraform**: Version `>= 0.12`.
- **Node.js**: Version `18.x` or compatible with Lambda.

### Installation

1. Clone the repository
2. Install dependencies for the Lambda function
3. Deploy with Terraform

