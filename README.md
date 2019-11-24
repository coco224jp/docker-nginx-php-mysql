docker-nginx-php-mysql
===

This is a template of project for the develop web application using following features.

<br>

## Feature
 - nginx 
 - PHP
 - MySQL

<br>

## Usage 

 ### Create Project

  1. Clone this repository.
  ```sh
    git clone --depth 1 https://github.com/snst-lab/docker-nginx-php-mysql <project name>
  ```

  2. Change Directory
  ```sh
    cd <project name>
  ```

  3. Run command below to setup modules and launch container 
  ```sh
    make install
  ```

  4. set .env file to MySQL configs
  ```
    DATABASE=
    ROOTPASS=
    USERNAME=
    USERPASS=
  ```

  5. Build container & start servers
  ```sh
  	docker-compose -f ./docker-compose.yml up --build
  ```

  6. Login to container 
  ```sh
    docker ps   //Check container ID with ps command first
    docker exec -it <container_id> bash
  ```