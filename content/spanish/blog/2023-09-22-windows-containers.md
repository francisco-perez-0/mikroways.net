---
title: "Contenedores nativos de Microsoft Windows usando docker"
date: 2023-09-22T16:30:00-03:00
# page header background image
page_header_bg: "images/banner/banner2.jpg.webp"
# post thumb
image: "images/blog/whale-flying.jpeg"
# post author
author: "Christian Rodriguez"
# taxonomies
categories: ["DevSecOps" ]
tags: ["windows", "docker", "infrastructure"]
# meta description
description: "Contenedores nativos de Microsoft Windows usando docker"
# save as draft
draft: false
---
# Contenedores nativos de Microsoft Windows usando docker

En Mikroways utilizamos mucho los contenedores. Somos pioneros en utilizar esta
tecnología desde antes del lanzamiento correspondiente a la primer versión
estable de docker. Sin embargo, siempre trabajamos con contenedores Linux.

Cuando aprendemos contenedores, siempre aparece una comparativa entre los
contenedores y la virtualización. A continuación vemos cómo funciona la
virtualización:

{{< figure src="/images/blog/containers/virtualized-app.webp" >}}

Ahora vemos qué sucede durante la contenerización:

{{< figure src="/images/blog/containers/containerized-app.webp" >}}

Como puede verse, al contenerizar, el sistema operativo de base es compartido por
todas las aplicaciones. Esta diferencia es **fundamental** porque es la causante
de la popularidad de los contenedores debido a la eficiencia lograda por
compartir el mismo sistema operativo de base.

Entonces, aquí aparece el primer punto donde los caminos se abren en diferentes
direcciones:

* Contenedores que corren en Linux porque el sistema de base es Linux.
* Contenedores que corren en Windows porque el sistema de base es Windows.

Como los contenedores en Linux son muy populares, la mayoría de las imágenes
disponibles que solemos encontrar ejemplos corresponde a este tipo de
contenedores. Sin embargo, en el plano de Microsoft, hay contenedores
específicos para cargas de trabajo que requieren este sistema opertativo de
base.

## Docker en Microsoft Windows

Lo primero que tenemos que aclarar es que en los inicios de docker, los únicos
contenedores que existían eran los de Linux. [^1]

Recién en 2017, [Windows Server
2016](https://learn.microsoft.com/en-us/archive/msdn-magazine/2017/april/containers-bringing-docker-to-windows-developers-with-windows-server-containers)
ofrece soporte de contenedores Windows. Y este trabajo de Microsoft nació como un
proyecto ambicioso en el año 2014, cuando la adopción de contenedores se
multiplicó y creció exponencialmente con la liberación de kubernetes.

Pero seguramente, recordarás que para el 2017, los usuarios de Windows ya podían
trabajabar con docker. Y acá otra vez la confusión aparece como en tantos
planos de la informática, porque utilizamos terminología similar, o incluso
igual, para referirnos a distintos temas. Docker ofreció muchas formas de correr
contenedores en máquinas Windows, pero todas basadas en la virtualización de un
Linux porque los contenedores a correr eran Linux. Entonces los usuarios corrían
el cliente docker desde su desktop conectando al daemon dockerd que ejecuta en
una virtual corriendo Linux. Inicialmente se podía correr docker usando una
solución que se llamaba [docker machine](https://github.com/docker/machine).
Pero esta solución fue discontinuada en favor del actual [docker desktop](https://www.docker.com/products/docker-desktop/),
un producto que permite correr docker en múltiples plataformas.

Además, y casi simultáneamente, Microsoft
trabajaba en [WSL o Windows Subsystem for
Linux](https://learn.microsoft.com/en-us/windows/wsl/).
Con esta nueva capacidad, los usuarios de Microsoft Windows pueden instalar
docker en cualquier distribución soportada por WSL. Sin embargo, como WSL no
soporta systemd, los servicios no se mantienen corriendo como se espera. Pero
esto no es un impedimento:

* O se procede con docker desktop y saca mayor provecho al uso de wsl, como se
  explica en la [propia documentación](https://docs.docker.com/desktop/wsl/), o
* Se puede usar dockerd como se [sugiere en este excelente
  post](https://dev.to/bowmanjd/install-docker-on-windows-wsl-without-docker-desktop-34m9),
  que además recomienda usar podman en lugar de docker.

Hasta aquí, como podrá notarse, hemos explicado diferentes formas de cómo correr
contenedores linux, pero sólo mencionamos al pasar sobre los contenedores
Windows. Ahora hablaremos de ellos.

## Contenedores Windows con docker

Como sucede con cualquier contenedor, la idea de lograr encapsular en una imagen
de contenedores toda la configuración necesaria para correr una aplicación, se
mantiene y aplica por igual en este caso. 

Desde Mikroways, estamos convencidos que la contenerización es un excelente
mecanismo por medio del cuál ordenamos en un simple Dockerfile los pasos
manuales, que antes una persona seguía para desplegar una aplicación en un nuevo
ambiente, o ante una recuperación ante desastres. Además, contenerizar ofrece
nuevas ventajas como es la escalabilidad de aplicaciones, auto sanado y service
discovery de una forma simple.

Con la introducción anterior, cabe mencionar entonces que el espectro cubierto
por esta solución basada en contenedores windows aplica a proyectos que dependan
de aplicaciones desarrolladas en .Net Framework en las versiones 3.x o 4.x. Las
aplicaciones desarrolladas en .Net Core pueden correr tanto en windows como linux
containers. Por cuestiones de performance y adopción por las grades comunidades
o plataformas como kubernetes, se suele elegir utilizar contenedores linux en
estas aplicaciones.

Por tanto, si disponemos de una aplicación .Net Framework que queramos
contenerizar, siempre que sea posible por las dependencias que la aplicación
necesite para correr, podremos avanzar en este sentido. Lo mismo aplica a
aplicaciones o servicios que corran en windows nano server o windows core.

## Instalando un engine de contenedores en windows

La instalación está muy clara en la [página oficial de
Microsoft](https://learn.microsoft.com/en-us/virtualization/windowscontainers/quick-start/set-up-environment?tabs=dockerce#windows-server-1).
En ella se explica cómo instalar:

* Docker CE / Moby
* Mirantis container runtime
* Containerd

> El uso de containerd es el recomendado para clusters kubernetes que deban
> tener nodos con la posibilidad de correr contenedores windows.

Una vez instalado el engine de contenedores preferido, podremos trabajar con
contendores, como lo hacemos con Linux. Elegimos Docker CE en nuestro caso.

## Corriendo nuestro primer contenedor en windows

Probamos primero el comando `docker info` desde una consola de powershell:

![windows docker
info](/images/blog/containers/windows-docker-info.png)

Como vemos, el `OSType` es **windows**, así como el `Storage Driver` es uno
específico de windows.

La primer prueba que haremos, será justamente para dejar constancia que no
podemos correr contenedores linux en un engine windows.

![windows docker run linux container](/images/blog/containers/windows-docker-run-alpine.png)

Pero sí podemos correr una imagen de windows. Es interesante leer la
documentación que provee la página correspondiente a la [imagen oficial de
windows](https://hub.docker.com/_/microsoft-windows), donde
muestran las diferentes versiones de windows (servercore y nano), como así
también tags y arquitecturas.

Corremos entonces una imagen e imprimimos un mensaje:

![windows docker run
nanoserver](/images/blog/containers/windows-docker-run-nano.png)

## Construimos una imagen

Crearemos una imagen que copia el código de un desarrollo en .Net Framework 4.8.
El despliegue requiere la configuración de un IIS con un AppPool que será
realizado durante el build utilizando Powershell:

{{< highlight dockerfile "linenos=table" >}}

FROM mcr.microsoft.com/dotnet/framework/aspnet:4.8-windowsservercore-ltsc2022

WORKDIR /inetpub/myapp

RUN powershell -Command \
        $ErrorActionPreference = 'Stop'; \
        $ProgressPreference = 'SilentlyContinue'; \
        \
        Import-Module WebAdministration; \
        # Stop and remove standard app pools
        Stop-WebAppPool -Name DefaultAppPool; \
        Remove-WebAppPool -Name DefaultAppPool; \
        # Create a new web app pool
        $appPool = New-Item -Path "IIS:\\AppPools\\myapp"; \
        $appPool.managedRuntimeVersion = 'v4.0'; \
        $appPool.managedPipelineMode = 'Integrated'; \
        New-WebSite -Name myapp -Port 80 -ApplicationPool "myapp" \
          -PhysicalPath "%SystemDrive%\inetpub\myapp"; \
        \
        Remove-Item -Force -Recurse $Env:Temp\*;

COPY ./code .
CMD [ "myapp" ]
{{< / highlight >}}

Como puede verse, se asume el código de la aplicación está dentro de la carpeta
loca `code/`. Esta imagen basada en aspnet 4.8 puede inferirse está basada en
windows core 2022, dando soporte del framework .Net versión 4.8. Lo que hacemos
con el `RUN` es configurar un AppPool de IIS y un Site indicando la carpeta
desde donde servir los archivos.

Finalmente, como en windows el proceso de IIS es w3svc, el entrypoint que
heredamos en esta imagen se basa en un proceso de Microsoft llamado
[IIS.ServiceMonitor](https://github.com/microsoft/IIS.ServiceMonitor) que se
encarga de monitorizar el estado del servicio **w3svc** para un AppPool que es
espcificado como argumento al ServiceMonitor.

El resultado de buildear la imagen anterior se obtiene corriendo:

![docker windows build](/images/blog/containers/windows-docker-build.png)

## Corriendo el contenedor creado

Dado que la imagen construida la llamamos **demo**, podemos lanzar el contenedor
usando:

{{< highlight bash >}}
docker run -p 8080:80 --rm -d demo
{{< / highlight >}}

Y probamos con un navegador el resultado:

![windows container run](/images/blog/containers/windows-docker-run-app.png)

## Conclusiones

Usar contenedores es un excelente recurso porque trabajamos con infraestructura
inmutable. Esto hasta ahora, era algo que aprovechamos al máximo cuando se
trataba de aplicaciones y servicios Linux. Pero ahora, con la posibilidad que
nos da Microsoft, expandimos el ecosistema de contenedores a nuevos destinos,
donde aplicaciones legadas de nuestros clientes pueden portarse a contenedores
windows con un esfuerzo menor que actualizar el framework.

[^1]: Existían los contenedores de Solaris además de [LXC](https://linuxcontainers.org/).
De hecho docker en sus primeras versiones era un wrapper de LXC.
