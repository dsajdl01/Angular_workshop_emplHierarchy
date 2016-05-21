
# Angular_workshop_emplHierarchy repository

***
## Purpose

The idea is to get practice on writing application using AngularJS and demonstrate my knowledge to develop single page application. 

## About
The application Employment hierarchy enable to user assume identity as any employee. Depend on the employee accessibility the user would get view on other employees. When the assumed employee has highest accessibility then the viewer is able to modify employees records or create a new employee and assign new details to created employee.

## Testing
Each controller, service and directive is tested by using Karma Jasmine.

 > * to confirm karma test, run from HierarchyProject depository following command:

     
     karma start test/karma.conf.js
     
     
## Runnig project
To run Employment hierarchy application in your machine clone repository and then it is able to run it on you local hoset: *'localhost:8081'*. It also needs to be installed either *http-server* or *python*.

### Using Http-server

To run any application with http-server, it needs to be installed node.js
Just type in your terminal:

		
		node --version
		

If you receive something like *v0.10.37* then your PC has node.js if not go to [node](https://nodejs.org/en/)

If you do not have Http-server then type in your terminal:

	
	sudo npm install -g Http-server
	

Now, all is ready go to HierarchyProject directory and type:

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
