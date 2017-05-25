/*
    Ali Kutluozen - 4/9/2017
    Main application file contains an AngularJS module and a controller that contains necessary functions.
*/

"use strict";

var cli = angular.module("cli", ["ngSanitize"]);

// Main CLI Controller
cli.controller("cliController", function ($scope, $interval) {

    // VARIABLES -------------------------------------------------------------------------------------
    
    var path = new Array(); // Array used as a stack to keep track of directories visited
    path.push(new Directory("root")); // Initial directory
    var pwd = path[0]; // Present working directory
    var command, parameter; // Commands and parameters to be parsed from the input
    $scope.output = ""; // Empty output
    
    // Cache the necessary DOM elements for future use
    var out = document.getElementById("output"),
        machine = document.getElementById("machine");

    // INNER HELPER FUNCTIONS ------------------------------------------------------------------------
    
    // Adds a given message to the display
    function print(msg) {
        $scope.output += "<br />"
        var c = 0;
        var int = $interval(function () {
            if (c < msg.length) {
                $scope.output += msg[c++];
            } else {
                $interval.cancel(int);
            }
        }, 6);
    }

    // Shows the current path
    function showPath() {
        var outputString = "";
        for (var i = 0; i < path.length; i++) {
            outputString += path[i].name + "/";
        }
        return outputString;
    }

    // MAIN SCOPE FUNCTIONS -------------------------------------------------------------------------
    
    // Main execute function
    $scope.execute = function () {
        /* 
            Parsing the input: 
            The input is splitted into an array by its first whitespace occurrence.
            Then the first item of the array is set to be the command, and the second becomes the parameter
        */
        $scope.input = $scope.input.split(' ');
        command = $scope.input[0];
        parameter = $scope.input[1];

        // Reset the padding
        out.style.paddingBottom = "40px";

        // Select the appropriate action based on the command, execute it with the given parameter
        switch (command) {
                
            // Displays the help text
            case "help":
                print(
                        "MiniCLI - Help <br /><br />"
                        + " - clear: Clears the screen<br />"
                        + " - pwd: Shows the present working directory<br />"
                        + " - ls: Lists what the current directory contains<br />"
                        + " - touch &ltfilename&gt: Creates a file<br />"
                        + " - mkdir &ltdirname&gt: Creates a directory<br />"
                        + " - rmfile &ltfilename&gt: Removes a file</br />"
                        + " - rmdir &ltdirname&gt: Removes a directory<br />"
                        + " - cd &ltdirname&gt: Navigates between directories. ('..' to go back)<br />"
                        + " - exit: Shuts down the console</br >"
                     );
                out.style.paddingBottom = "200px";
                break;
            // Clears the output
            case "clear":
                $scope.output = "";
                break;

            // Displays the present working directory
            case "pwd":
                print("Present working directory: " + showPath());
                break;

            // Lists everything in the current directory
            case "ls":
                print("Viewing the contents of " + showPath() + "<br />" + pwd.toString());
                break;

            // Creates a file object with a given name, adds it to the current directory
            case "touch":
                if (parameter) {
                    if (pwd.add(new File(parameter), "file")) {
                        print("File '" + parameter + "' has been created successfully!");
                    } else {
                        print("A file with the same name already exists!");
                    }
                } else {
                    print("You must enter a filename!");
                }
                break;

            // Creates a directory object with a given name, adds it to the current directory
            case "mkdir":
                if (parameter) {
                    if (pwd.add(new Directory(parameter), "directory")) {
                        print("Directory '" + parameter + "' has been created successfully!");
                    } else {
                        print("A directory with the same name already exists!");
                    }
                } else {
                    print("You must enter a directory name!");
                }
                break;
            
            // Removes a given file
            case "rmfile":
                if (parameter) {
                    var removed = {};
                    if(removed = pwd.remove(parameter, "file")){
                        print("'" + parameter + "' has been removed.");
                    } else {
                        print("File not found!");
                    }
                } else {
                    print("You must enter a filename!");
                }
                break;
                
            // Removes a given directory
            case "rmdir":
                if (parameter) {
                    if(pwd.remove(parameter, "directory")){
                        print("'" + parameter + "' has been removed.");
                    } else {
                        print("File not found!");
                    }
                } else {
                    print("You must enter a directory name!");
                }
                break;
            
            // Mimics a shutdown by hiding the console
            case "exit":
                machine.className += "exit";
                out.className += "outputExit";
                return;
                break;

            // Navigation
            case "cd":
                if (parameter) {
                    var oldPwd = pwd, // Keep track of the old directory
                        longPath = parameter.split("/"), // Input to be split
                        needed = longPath[longPath.length - 1], // Searched directory
                        found = false, // or an object
                        flag = false,
                        startVal = 1,
                        fakepath = path.slice();
                    
                    // Absolute path settings - Start from the "root"
                    if (longPath[0] === "root") {
                        fakepath = [path[0]];
                        pwd = fakepath[0];
                    // Relative path settings
                    } else {
                        startVal = 0;
                    }
                    
                    // If the filename entered is "..", pop it from the fake path,
                    // Else, add the file to the fake path and keep searching
                    for (var i = startVal; i < longPath.length; i++) {
                        if (found = pwd.search(longPath[i], "directory")) {
                            fakepath.push(found);
                            pwd = found;
                            if (found.name === needed && i === longPath.length - 1) {   
                                // Found, assign fake path to the real one, and stop looking.
                                flag = true;
                                break;
                            }
                        } else if (longPath[i] === ".."){
                            if (fakepath.length > 1) { // Don't pop the root!
                                fakepath.pop();
                                pwd = fakepath[fakepath.length - 1];
                                flag = true;
                            }
                        } else {
                            break; // If not there, stop looking
                        }
                    }
                    
                    // The result
                    if (flag) {
                        path = fakepath; // Make the fake path the real path
                        print(showPath());
                    } else {
                        pwd = oldPwd; // Restore the old directory
                        print("Directory not found!");
                    }
                } else {
                    print("You must enter directory name!");
                }
                break;
            
            // EASTER EGG!
            // These numbers need to be entered every 108 minutes.
            case "4-8-15-16-23-42":
                location.href="https://www.youtube.com/watch?v=8JZItP_xrA8&list=PLC32AB72F9ACC0F30";
                break;

            default:
                print("Not a right command!");
                break;
        }

        // Scroll to the bottom if necessarry, clean the input area, get out
        out.scrollTop = out.scrollHeight;
        $scope.input = "";
        return;
    }
});
