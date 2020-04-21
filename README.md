<h3 class="code-line" data-line-start=1 data-line-end=2 ><a id="Example_Configuration_for_Virtual_HOST_1"></a>Example Configuration for Virtual HOST</h3>
<p class="has-line-data" data-line-start="2" data-line-end="11">VirtulHost Configuration:<br>
<strong>VirtualHost :80</strong><br>
ServerAdmin <a href="mailto:admin@gmail.com">admin@gmail.com</a><br>
ServerName clokiReport.test<br>
ServerAlias clokiReport<br>
DocumentRoot /var/www/html/ClokiReport/<br>
ErrorLog ${APACHE_LOG_DIR}/error.log<br>
CustomLog ${APACHE_LOG_DIR}/access.log combined<br>
<strong>VirtualHost</strong></p>
<p class="has-line-data" data-line-start="12" data-line-end="14"><strong>etc/hosts configuration:</strong><br>
127.0.0.1 clokiReport.test</p>
<p class="has-line-data" data-line-start="15" data-line-end="17"><strong>Create this file inside domain root folder</strong><br>
.haccess configuration (Required to make React routes works in Apache):</p>
<pre><code>RewriteEngine On
RewriteBase /
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-l
RewriteRule ^.*$ / [L,QSA]
</code></pre>
<h3 class="code-line" data-line-start=25 data-line-end=26 ><a id="Make_it_work_25"></a>Make it work</h3>
<p class="has-line-data" data-line-start="27" data-line-end="29">1.Get Dependencies:<br>
After clone the repositorie, make : <strong>init npm</strong> inside the project</p>
<p class="has-line-data" data-line-start="30" data-line-end="33">2.Env:<br>
Once we have our dependencies now we should set the new DOMAIN,<br>
there is an example inside .env.example</p>
<p class="has-line-data" data-line-start="34" data-line-end="38">3.Build:<br>
Now run : <strong>npm run build</strong><br>
After execute previous command, we need go inside the project, open the folder build<br>
and copy all the files to our root folder inside our domain, (ONLY FILES, NOT THE FOLDER)</p>
<p class="has-line-data" data-line-start="39" data-line-end="42">3.PHP file:<br>
Now we need PHP folder, which is inside the project, we must move it in the same folder<br>
where we move builded files</p>