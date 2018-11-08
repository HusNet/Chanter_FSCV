# Chanter.ch

## Informations

<i>Keywords: Chanter.ch - Fédération des Sociétés de Chant du Valais - FSCV</i>


## Technical documentation

Technical documentation for chanter.ch webmasters.

### Pre-requisite

This project uses **Node.js**, **Materialize**, **Pug** and **Docker**.

Please visit the [official Docker website](https://www.docker.com/) for more information about Docker.

### Downloads

One [Docker](https://www.docker.com/get-started) is installed, download the project [Chanter.ch](https://github.com/R-Men/Chanter_FSCV) from GitHub with this [link](https://github.com/R-Men/Chanter_FSCV/archive/master.zip).

### Project deployment

Open a terminal in your `Chanter_FSCV` folder.

If you want to deploy for Production [click here](#prod).

If you want to deploy for Development [click here](#dev).

<hr>

#### <a name="dev"></a>Development deployment

##### 1. Database

Open your database workbench.

Launch the [script](./database/install/DiagramDBChanter_dev.sql) `DiagramDBChanter_dev.sql`

Add a user named **dev** with password *unlucky* and add him to the previous created database.

##### 2. Run the app

Run :

    docker-compose build && docker-compose -f docker-compose.override.yml up -d

<hr>

#### <a name="prod"></a>Production deployment

##### 1. Database

Run :

    docker-compose build && docker-compose -f docker-compose.yml up -d

Open `phpmyadmindomains.your-domain.tld` in a browser.

Launch the [script](./database/install/DiagramDBChanter_prod.sql) `DiagramDBChanter_prod.sql`.

Add a user named **prod** with password *unlucky* and add him to the previous created database.

##### 2. Run the app

Run :

    docker-compose build && docker-compose -f docker-compose.yml up -d

