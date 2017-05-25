MiniCLI by Ali Kutluozen - 4/9/2017

This is a small JavaScript/HTML5 application that mimics some basic functionalities of common command line interfaces.
I chose AngularJS framework because of its useful two way data binding which helped me get inputs and display results
in a quick and organized manner.

*** NOTE: To get the optimum result from my custom CSS, please run the application using Google Chrome.
You can run the application from index.html

COMMANDS IMPLEMENTED AND HOW TO OPERATE THEM
To operate the system; a command and depending on the command, a parameter needs to be typed after a white space. 
Then hit the enter button to execute it.

- clear: Clears the output screen
- pwd: Displays the present working directory
- ls: Lists what the current directory contains with their types (file or directory)
- touch <filename>: Creates a file with a given name. The name has to be unique within the directory.
- mkdir <directoryname>: Creates a directory with a given name. The name has to be unique within the directory.
- rmfile <filename>: Removes a file.
- rmdir <directoryname>: Removes a directory and everything in it.
- cd <directoryname>: Navigates between directories.
	Root directory is called "root".
	- Navigating using the absolute path: cd root/folder/deeperfolder/...
	- Navigating usign the relative path: cd folder/deeperfolder/...
	- Long strings can be made to navigate deeper. E.g: cd folder/innerfolder/deepfolder/here/there
	- To navigate backwards, use ".." 
		E.g: 	cd .. (goes back one level) 
			cd ../../.. (goes back multiple levels, stops at root)
			cd ../another (goes back and then forward if such folder exists)

IMPLEMENTATION OF DIRECTORIES
For directories, I implemented a tree structure that uses arrays as folders. Created folders can hold either files or 
other folders that hold other files and folders. This eventually forms a tree structure, a natural file directory system 
that can be traversed in any direction. 
For paths, I used stack structure to keep track of directories visited.