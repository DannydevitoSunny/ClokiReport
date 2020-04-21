
### Example Configuration for Virtual HOST
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


**etc/hosts configuration:**
127.0.0.1 clokiReport.test

**Create this file inside domain root folder**
.haccess configuration (Required to make React routes works in Apache):

    RewriteEngine On
    RewriteBase /
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-l
    RewriteRule ^.*$ / [L,QSA]

### Make it work

1.Get Dependencies:
After clone the repositorie, make : **init npm** inside the project

2.Env:
Once we have our dependencies now we should set the new DOMAIN,
there is an example inside .env.example

3.Build:
Now run : **npm run build**
After execute previous command, we need go inside the project, open the folder build
and copy all the files to our root folder inside our domain, (ONLY FILES, NOT THE FOLDER)

3.PHP file:
Now we need PHP folder, which is inside the project, we must move it in the same folder
where we move builded files




