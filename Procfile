/*web: (cd site; python -m http.server $PORT &) && (python bot.py)*/ 
/*web: (cd site; php -S localhost:$PORT &) && (python bot.py)*/
web: (vendor/bin/heroku-php-apache2 site/ -C site/apache_app.conf &) && (python bot.py)
