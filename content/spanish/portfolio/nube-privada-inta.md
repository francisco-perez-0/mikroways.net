---
title: "Nube privada de INTA"
date: 2021-03-01
page_header_bg: "images/banner/banner1.jpg.webp"
description: "Caso de éxito que relata la implementación de una nube privada en
INTA y la migración de sus aplicaciones legacy allí."
images: 
  - "images/portfolio/private-cloud.webp"
customer:
  name: "INTA"
  logo: "images/clients/inta.png.webp"
  url: "https://www.inta.gob.ar"
buttons:
  label : "Quiero esto"
  style : "solid"
  link : "contact"
# filter types
types: ["nube privada", "migración a la nube", "ci/cd"]
# used technologies
tech: ["Kubernetes", "Docker", "VMware Vsphere", "Terraform", "Ansible",
"Cluster API", "MinIO", "Velero"]
# porjects link
# meta description
# Problem overview
problem: "El principal desafío consistía en migrar una gran cantidad de
aplicaciones legacy, que corrían en sistemas operativos muy desactualizados y
sin soporte, pero que no se podían actualizar de forma simple por tener
dependencias funcionales con esos sistemas operativos. A la vez, la variabilidad
existente entre servidores hacía que cada equipo dependiera exclusivamente de
una persona."
# Solution overview
solution: "Quitamos las dependencias entre las aplicaciones y el sistema
operativo de base e implementamos una nube privada basada en Kubernetes. También
estandarizamos y automatizamos la forma de desplegar las aplicaciones sobre la
nube privada. Con esto, logramos desafectar un gran número de servidores
físicos; así eliminamos la dependencia entre cada servidor y un técnico y
agilizamos sustancialmente el despliegue de aplicaciones."
draft: true
---

Tras evaluar la situación en la que se encontraba el organismo, no solo en
relación con el proyecto sino pensando en su gestión futura, determinamos que lo
conveniente era generar una nube privada y migrar allí todas las aplicaciones y
servicios que, hasta el momento, se prestaban en los servidores a reemplazar.

Para esto, dividimos el trabajo en dos partes:

* Empaquetar en contenedores las aplicaciones para que todas sus dependencias
  quedaran autocontenidas.
* Diseñar e implementar la infraestructura de IT que constituiría la nube
  privada.

Con el objetivo de acortar tiempos, creamos  dos equipos de trabajo para avanzar
paralelamente con el desarrollo de la solución.

La nube privada la desarrollamos con Kubernetes sobre VMware Vsphere, que es la
plataforma de virtualización del organismo, y su generación quedó totalmente
automatizada usando Terraform, Ansible y Cluster API. Esto permite replicarla y
restaurarla rápidamente y de forma idéntica.

Sobre dicha infraestructura, con sistemas operativos y librerías completamente
actualizados, desplegamos las aplicaciones contenerizadas.

Sumado a lo anterior, también:

* Desarrollamos pipelines de CI/CD, lo que permite que cualquier persona del
  equipo pueda hacer los despliegues de las aplicaciones, en contraposición con
la necesidad previa de contar con el experto específico de cada sistema.
* Instalamos un stack de monitoreo basado en Prometheus, Grafana y Alert Manager
  para tener una visión del estado histórico y presente de la infraestructura, y
para recibir alertas en caso de un problema que lo amerite.
