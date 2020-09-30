To run on local device just make sure docker is installed and run the command:  
**docker-compose up --build**

Next just go to http://localhost:3001 on your browser and you can access the frontend application while you can access the API documentation on http://localhost:3000/docs.

In this repository I've included the .env files but in actual working scenarios they would be excluded with .gitignore.

I have also setup both the frontend and backend to be deployed on AWS. I'm using ElasticBeanstalk to deploy the backend while using S3 and CloudFront for the frontend deployment. You can find the deployed frontend on https://etiqa-frontend.zetechlabs.com while the API documentation could be found on https://etiqa.zetechlabs.com/api
