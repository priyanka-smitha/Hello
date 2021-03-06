MILESTONE 3 - CSC591 DevOps
-------------------------------

Project Team Members:

1] Priyanka Shankaran (priyan)

2] Smitha Sathyanarayana (ssathya)

-------------------------------

**Step 1: The ability to configure a deployment environment automatically, using a configuration management tool, such as ansible, or configured using vagrant/docker.**

1] The remote deployment environment that we have chosen as part of our project is AWS EC2. 

2] For automatic configuration, we have used  AWS CloudFormation templates.
![alt deploy](screenshots_deploy/cloudformation.png)

3] The CloudFormation template in turn creates EC2 instances automatically.
![alt deploy](screenshots_deploy/ec2.png)

4] The screenshot below shows a small sample of our CloudFormation template file. The repository contains a gistfile1.js which contains the entire code of our CloudFormation template. 

![alt deploy](screenshots_deploy/gistfile.png)

We can see that git is automatically configured on our EC2 instance. Any other project dependencies can also be set up using AWS CloudFormation.

 

**Step 2: The ability to deploy a self-contained/built application to the deployment environment. That is, this action should occur after a build step in your pipeline.**
 
1] We are using Jenkins as our build server. Our deployment to the EC2 instances will be successful only after the build is successful in Jenkins. 

2] For Jenkins to talk to the EC2 deployment servers, we have configured the 'publish over SSH' plugin in Jenkins as seen in the screenshot below.

![alt deploy](screenshots_deploy/pubssh.png)

![alt deploy](screenshots_deploy/sshserver.png)

3] We have the following EC2 instances as our deployment servers. 

![alt deploy](screenshots_deploy/ec2.png)

4] The following configuration has been done on 52.5.190.167 to deploy the first version of our application(app.js).

![alt deploy](screenshots_deploy/commands.png) 

**Step 3: The deployment must occur on an actual remote machine/VM (e.g. AWS, droplet, VCL), and not a local VM.**

1] To check if our application has deployed successfully on the remote EC2 instance, type the public IP address of the EC2 server to view the application.

![alt deploy](screenshots_deploy/world.png)

Our application is deployed successfully as seen in the screenshot.

**Step 4: The ability to perform a canary release.**

1] For performing a simulation of Canary Release, we initially deployed the production version(app.js) of the application on two EC2 instances. 

2] We selectively chose 52.5.183.101 as our canary deployment server. We then deployed version 2 of our application which is "app1.js" to the canary server. 

3] Thus we are considering the server with IP address 52.5.190.167 as our production server and the server with IP address 52.5.183.101 as our canary server.

![alt deploy](screenshots_deploy/canary.png)

![alt deploy](screenshots_deploy/blue.png)

We can see that the second version deployed on the canary has "Hello blue" instead of "Hello world". 

4] In the next step, we monitor the canary server for instability or faults and kill the canary, if the application behaves erroneously.

**Step 5: The ability to monitor the deployed application for alerts/failures (using at least 2 metrics).**

1] We monitor the canary server with monitoring code, which can be found at: https://github.com/priyanka-smitha/Monitoring.

We use memory and the CPU Idle time as the metrics to monitor the health and behaviour of the second version(app1.js) of our application on the canary.

![alt deploy](screenshots_deploy/monitoring.png)

2] We have a proxy server running on port 4000 of the canary, which always points to the production server by default.Thus, we can fall back to this server, if some error condition occurs to the canary server.The complete code can be found mentioned in the link above.

3] The canary **dies** when the CPU has a load higher than a particular threshold. app1.js has some CPU intensive code and hence the canary is **killed**.

![alt deploy](screenshots_deploy/canary_code.png)

4]The proxy routes the traffic of the canary to the production server as shown below. On port 4000 the canary points to the production server.

![alt deploy](screenshots_deploy/canary_world.png)

If the version 2 is stable on the canary for a long time, then we can deploy it on our production server too.

The configuration file of Jenkins can be found in our repository and is called 'config.xml'. 

