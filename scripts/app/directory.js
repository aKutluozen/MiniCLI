/* 
    Ali Kutluozen - 4/9/2017
    
    Directory class contains a name, a type, and an array of contents.
    The more items added to its array, the more it grows.
    If another directory item is added to the contents array, it naturally forms a tree structure.
*/

function Directory(name) {
    this.type = "directory";
    this.name = name;
    this.contents = new Array();
};

// Member functions of Directory
Directory.prototype = {
    
    // Gets the number of contents in the current directory
    getSize: function () {
        return this.contents.length;
    },

    // Adds an item to the current directory
    add: function (item, type) {
        if (!this.search(item.name, type)) {
            this.contents.push(item);
            return true;
        } else {
            return false;
        }
    },

    // Removes an item from current directory
    remove: function (item, type) {        
        for (var i = 0; i < this.contents.length; i++) {
            if (this.contents[i].name === item && this.contents[i].type === type) {
                return this.contents.splice(i, 1);
            }
        }
        return false;
    },

    // Searches the current directory, returns the object or false
    search: function (name, type) {
        var found = false;
        for (var i = 0; i < this.contents.length; i++) {
            if (this.contents[i].name === name && this.contents[i].type === type) {
                found = this.contents[i];
            }
        }
        return found;
    },
    
    // Lists the current directory items
    toString: function () {
        var out = document.getElementById("output"),
            pb = 0,
            outputString = "";

        for (var i = 0; i < this.contents.length; i++) {
            outputString += " - " + this.contents[i].name + " : " + this.contents[i].type;
            if (i < this.contents.length - 1) {
                outputString += "<br />";
            }

            // Dynamically expand the padding to fit the scrolling screen
            pb += 20;
            out.style.paddingBottom = pb + "px";
        }

        if (this.contents.length === 0) {
            outputString += "Directory is empty";
        }
        return outputString;
    }
}
