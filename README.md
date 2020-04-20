VirtulHost Configuration:
<VirtualHost *:80>
    ServerAdmin admin@gmail.com
    ServerName clokiReport.test
    ServerAlias clokiReport
    DocumentRoot /var/www/html/ClokiReport/
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
    Header set Access-Control-Allow-Origin "*"
    Header always set Access-Control-Allow-Methods "POST, PUT, GET, DELETE, OPT$
    Header always set Access-Control-Allow-Headers "Content-Type"
</VirtualHost>

-------------------------------
etc/hosts configuration:

127.0.0.1       clokiReport.test
--------------------------------

/var/www/html/ClokiReport/.haccess
.haccess configuration (Required to make React routes works in Apache):

 RewriteEngine On
 RewriteBase /
 RewriteCond %{REQUEST_FILENAME} !-f
 RewriteCond %{REQUEST_FILENAME} !-d
 RewriteCond %{REQUEST_FILENAME} !-l
 RewriteRule ^.*$ / [L,QSA]

-----------------------------------------







