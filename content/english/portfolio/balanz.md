---
title: "Deployment to the cloud"
date: 5
# page header background image
page_header_bg: "images/banner/banner1.jpg.webp"
description: "Deployment of an non-cloud native application in the public cloud
using AWS."
# clients
images: 
  - "images/clients/balanz-smaller.webp"
customer:
  name: "Balanz"
  logo: "images/clients/balanz-smaller.webp"
  url: "https://balanz.com/"
buttons:
  label : "I want this"
  style : "solid"
  link : "contact"
# filter types
featured: ["transformation"]
types: ["costs reduction", "public cloud"]
tech: ["AWS", "Terraform", "Ansible", "WAF", "ECS", "Redis"]
problem: "Deploying to the public cloud an application not designed for it.
Additionally, it would be subjected to high levels of demand and rigorous
security requirements. The applications connect via VPNs to APIs from external
providers, which increases complexity. It is developed and distributed across a
large number of repositories, further complicating its deployment when making
modifications to it."
solution: "We tackled the complexity of the application through a thorough
refactor, allowing its deployment on AWS under rigorous security and auditing
standards. Detailed review of the repositories facilitated the refactor to
execute the application in a containerized manner. We defined the infrastructure
on AWS and implemented it using infrastructure as code, leveraging tools like
GitHub Actions to create pipelines that enable automatic and simplified
deployments. The solution included the use of technologies such as ECS Cluster,
WAF, VPCs, RDS, Load Balancers, VPNs (StrongSwan), GitHub, Terraform, Redis, and
Ansible, ensuring a robust, secure, and easily manageable environment for the
client."
---
