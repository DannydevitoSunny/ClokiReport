

<p class="has-line-data" data-line-start="1" data-line-end="13">VirtulHost Configuration:<br>
&lt;VirtualHost :80&gt;<br>
ServerAdmin <a href="mailto:admin@gmail.com">admin@gmail.com</a><br>
ServerName clokiReport.test<br>
ServerAlias clokiReport<br>
DocumentRoot /var/www/html/ClokiReport/<br>
ErrorLog ${APACHE_LOG_DIR}/error.log<br>
CustomLog ${APACHE_LOG_DIR}/access.log combined<br>
Header set Access-Control-Allow-Origin “”<br>
Header always set Access-Control-Allow-Methods &quot;POST, PUT, GET, DELETE, OPT$<br>
Header always set Access-Control-Allow-Headers “Content-Type”<br>
&lt;/VirtualHost&gt;</p>
<p class="has-line-data" data-line-start="14" data-line-end="16">etc/hosts configuration:<br>
127.0.0.1 clokiReport.test</p>
<p class="has-line-data" data-line-start="17" data-line-end="19">/var/www/html/ClokiReport/.haccess<br>
.haccess configuration (Required to make React routes works in Apache):</p>
<p class="has-line-data" data-line-start="20" data-line-end="26">RewriteEngine On<br>
RewriteBase /<br>
RewriteCond %{REQUEST_FILENAME} !-f<br>
RewriteCond %{REQUEST_FILENAME} !-d<br>
RewriteCond %{REQUEST_FILENAME} !-l<br>
RewriteRule ^.*$ / [L,QSA]</p>

