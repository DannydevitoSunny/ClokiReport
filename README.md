<h3 class="code-line" data-line-start=1 data-line-end=2 ><a id="Example_Configuration_for_Virtual_HOST_1"></a>Example Configuration for Virtual HOST</h3>
<p class="has-line-data" data-line-start="2" data-line-end="3">VirtulHost Configuration:</p>
<pre><code>&lt;VirtualHost *:80&gt;
    ServerAdmin admin@gmail.com
    ServerName clokiReport.test
    ServerAlias clokiReport
    DocumentRoot /var/www/html/ClokiReport/
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
    Header set Access-Control-Allow-Origin &quot;*&quot;
    Header always set Access-Control-Allow-Methods &quot;POST, PUT, GET, DELETE, OPT$
    Header always set Access-Control-Allow-Headers &quot;Content-Type&quot;
&lt;/VirtualHost&gt;
</code></pre>
<p class="has-line-data" data-line-start="17" data-line-end="19"><strong>etc/hosts configuration:</strong><br>
127.0.0.1 clokiReport.test</p>
<p class="has-line-data" data-line-start="20" data-line-end="22"><strong>Create this file inside domain root folder</strong><br>
.haccess configuration (Required to make React routes works in Apache):</p>
<pre><code>RewriteEngine On
RewriteBase /
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-l
RewriteRule ^.*$ / [L,QSA]
</code></pre>
<h3 class="code-line" data-line-start=30 data-line-end=31 ><a id="Make_it_work_30"></a>Make it work</h3>
<p class="has-line-data" data-line-start="32" data-line-end="34">1.Get Dependencies:<br>
After clone the repositorie, make : <strong>init npm</strong> inside the project</p>
<p class="has-line-data" data-line-start="35" data-line-end="38">2.Env:<br>
Once we have our dependencies now we should set the new DOMAIN,<br>
there is an example inside .env.example</p>
<p class="has-line-data" data-line-start="39" data-line-end="43">3.Build:<br>
Now run : <strong>npm run build</strong><br>
After execute previous command, we need go inside the project, open the folder build<br>
and copy all the files to our root folder inside our domain, (ONLY FILES, NOT THE FOLDER)</p>
<p class="has-line-data" data-line-start="44" data-line-end="47">3.PHP file:<br>
Now we need PHP folder, which is inside the project, we must move it in the same folder<br>
where we move builded files</p>