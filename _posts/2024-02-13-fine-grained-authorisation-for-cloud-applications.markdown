---
layout: post
comments: true
title: "Fine-grained authorisation for cloud applications"
date: 2024-02-13 11:40:05 +0200
categories: cloud-security opa zanzibar fine-grained authorisation
tags:
- cloud-security 
- fga
background: '/assets/images/bg-fine-grained-permissions.webp'
---

As cloud applications grow in complexity, managing who has access to what can become a security nightmare. Traditional, role-based authorisation often results in **overly broad permissions**, granting access beyond what is necessary. This introduces unnecessary risk and makes compliance a constant struggle.

Fortunately, **fine-grained authorisation** offers a more granular approach, allowing you to control access based on **dynamic attributes** specific to each request. But when does this level of detail become truly valuable?

1. **Data security with dynamic sensitivity**: Imagine a healthcare platform where patient data sensitivity varies based on diagnosis or treatment stage. Fine-grained authorisation can restrict access to highly sensitive data to authorised personnel with specific needs.
2. **Context-aware access control**: Consider a microservices architecture where access needs to be tailored to the current request context. Attributes like user location, device type, or time of day can grant temporary access during maintenance or restrict sensitive actions outside business hours.
3. **Implementing granular compliance policies**: Meeting industry regulations often requires detailed access control. You can ensure compliance by automatically limiting access based on specific policies by leveraging attributes like department, project membership, or data classification.

**[When do you need attributes in fine-grained authorisation?](https://www.aserto.com/blog/attributes-authorization-when-to-use){:target="_blank"}** It is a good introduction article with examples from **Omri Gazitt**.

![Topez-architecture](/assets/images/topaz_arch.webp)

## Bibliography

- **[Topaz](https://www.topaz.sh/){:target="_blank"}**: An open-source authorisation providing fine-grained, real-time, policy-based access control for applications and APIs.
- **[Aserto](https://www.aserto.com/){:target="_blank"}**: Fine-grained, scalable authorization in minutes.
