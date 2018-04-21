# hackathon2018
hackathon 2018 y'all


Guide to using the batch files: 
 
You can run the webserver using load_webserver.bat
You can now access urls. Such as index.html
There is generated.html, you should not be able to get a page from it. 
If you can get a page from it, run delete_generated_survey to get rid of the page. 
You can then run "Generate_survey_from_schema" to automagically make the html page
If you go to generated.html now, you will get a page!
You can also submit results. 
Generate_results.bat will turn the stored results onto the table
(If you run generate_results.bat but A LOT of text doesn't appear, re-run it)
(if a ton of text appears, you can now visit generated webpage)

So for a full experience: 

First run delete_generated_html.bat
Second run load_webserver
Try visiting index_webpage and generated_webpage (it should not appear)
Next run generate_html_from_schema
Then try and visit generated_webpage (it should appear)
Now submit a ton of results to generated_webpage
When you are satisfied, run generate_results.bat
Now visit generated_results
There's your results