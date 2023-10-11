Create a virtualenv and activate it::

    $ python3 -m venv venv
    $ . venv/bin/activate

Or on Windows cmd::

    $ py -3 -m venv venv
    $ venv\Scripts\activate.bat

Install Flaskr::

    $ pip install -e .

Or if you are using the master branch, install Flask from source before
installing Flaskr::

    $ pip install -e ../..
    $ pip install -e .


Run
---

::

    $ export FLASK_APP=flaskr
    $ export FLASK_ENV=development
    $ flask init-db
    $ flask run

Or on Windows cmd::

    > set FLASK_APP=flaskr
    > set FLASK_ENV=development
    > flask init-db
    > flask run

Open http://127.0.0.1:5000 in a browser.

## Docker instructions

To create a docker image execute: 

`docker build . -t flaskr:1.0.0`

To run the docker image execute:

`docker run -p 5000:5000 flaskr:1.0.0` and visit with your browser http://localhost:5000

To run unit tests inside the container execute:

`docker run -it flaskr:1.0.0 /bin/sh`