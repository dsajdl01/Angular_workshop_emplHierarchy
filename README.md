
# Angular_workshop_emplHierarchy repository

***
## Purpose

The idea is to get practice on writing application using AngularJS and demonstrate my knowledge to develop single page application. 

## About
The application Employment hierarchy enable users to assume identity as any employee. Depend on the employee accessibility the user would get view on other employees. When the assumed employee has highest accessibility then the viewer is able to modify employees record or create a new employee and assign new details to created employee.

## Testing
Each controller, service, module and directive is tested by using Karma Jasmine.

 > * to confirm karma test, run from HierarchyProject depository following command:

     
     	./node_modules/karma/bin/karma start HierarchyProject/test/karma.conf.js 
	./node_modules/karma/bin/karma start HierarchyProject/test/karma.conf.ci.js 

If karma test is not running, ensure that you have nodejs (see nodeJS insalation below) and to install Karma (and all the plugins your project called HierarchyProject) locally in the project's directory by typing following commands:

	$ sudo npm install karma --save-dev
	$ sudo npm install karma-jasmine karma-chrome-launcher --save-dev

to run karma with coverage (karma.conf.ci.js) it needs to be installed karma-caverage by typing following comand:

	$ sudo npm install karma karma-coverage --save-dev
     
## Runnig project
To run Employment hierarchy application in your machine clone repository into your PC. App is able to run from your local host: *'localhost:8081'*. It can be run either by *http-server* or by *python*.

### Using Http-server

To run any application with http-server, it needs to be installed node.js
Just type to your terminal:

		
		node --version
		

If you receive something like *v0.10.37* then your PC has node.js, if not go to [node](https://nodejs.org/en/)
or type following comands:

	cd /opt
	sudo wget https://nodejs.org/download/release/v0.10.45/node-v0.10.45-linux-x64.tar.gz # (try to keep update node)
	sudo tar zxf node-v0.10.45-linux-x64.tar.gz  #(or whatever the name of the file after the download is)
	sudo ln -s /opt/node-v0.10.45-linux-x64 /opt/node
	sudo ln -s /opt/node/bin/node /usr/bin/node
	sudo ln -s /usr/bin/node /usr/bin/nodejs

check all is fine by escaping the directory or running a new terminal (both commands should now show version v0.10.45)
	cd
	node -v
	nodejs -v
	sudo rm  /opt/node-v0.10.45-linux-x64.tar.gz   #clean up

If you do not have Http-server then type to your terminal:

	
	sudo npm install -g Http-server
	

Now, all is ready, go to HierarchyProject directory and type:

	http-server
	
### Python 

to check if you CP has python type 

	
	python --version
	

If yes, go to HierarchyProject directory and type:
	
	python -m SimpleHTTPServer 8081
	

## Deceleration

### Employment hierarchy application

> * Application is just created for education and practicing purposes 
> * Any names and data are imaginary 
> * created by David Sajdl 2016 
