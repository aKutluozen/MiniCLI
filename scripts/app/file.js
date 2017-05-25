/* 
    Ali Kutluozen - 4/9/2017
    
    File class contains a name, a type, and an empty string of contents.
    Instances of this class can be added to the system using the methods of Directory class.
*/

function File(name) {
    this.type = "file";
    this.name = name;
    this.contents = "";
}
