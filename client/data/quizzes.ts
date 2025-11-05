export interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Subject {
  name: string;
  questions: Question[];
}

export const quizzes: Record<string, Subject> = {
  Python: {
    name: "Python",
    questions: [
      {
        id: 1,
        text: "What is the correct file extension for Python files?",
        options: [".python", ".py", ".pyt", ".p"],
        correctIndex: 1,
        explanation:
          "Python files use the .py extension. For example, myprogram.py is a valid Python file.",
      },
      {
        id: 2,
        text: "Which keyword is used to create a function in Python?",
        options: ["function", "def", "define", "func"],
        correctIndex: 1,
        explanation:
          "The 'def' keyword is used to define functions in Python. Example: def my_function(): ...",
      },
      {
        id: 3,
        text: "What is the output of print(len('hello'))?",
        options: ["5", "6", "hello", "error"],
        correctIndex: 0,
        explanation:
          "The len() function returns the number of characters in a string. 'hello' has 5 characters.",
      },
      {
        id: 4,
        text: "Which of the following is a mutable data type in Python?",
        options: ["tuple", "string", "list", "frozenset"],
        correctIndex: 2,
        explanation:
          "Lists are mutable, meaning you can change their contents. Tuples, strings, and frozensets are immutable.",
      },
      {
        id: 5,
        text: "What does the range(5) function return?",
        options: [
          "[1, 2, 3, 4, 5]",
          "[0, 1, 2, 3, 4]",
          "(0, 1, 2, 3, 4)",
          "0 to 4",
        ],
        correctIndex: 1,
        explanation:
          "range(5) generates numbers from 0 to 4 (not including 5). It's commonly used in loops.",
      },
      {
        id: 6,
        text: "How do you create a dictionary in Python?",
        options: [
          "{key: value}",
          "[key: value]",
          "(key: value)",
          "<key: value>",
        ],
        correctIndex: 0,
        explanation:
          "Dictionaries are created using curly braces {}. Example: my_dict = {'name': 'Alice', 'age': 25}",
      },
      {
        id: 7,
        text: "What is the output of 10 // 3 in Python?",
        options: ["3.33", "3", "4", "3.0"],
        correctIndex: 1,
        explanation:
          "The // operator performs integer division. 10 // 3 equals 3 (without remainder).",
      },
      {
        id: 8,
        text: "Which statement is used to exit a loop prematurely?",
        options: ["exit", "stop", "break", "halt"],
        correctIndex: 2,
        explanation:
          "The 'break' statement exits a loop immediately. 'continue' skips to the next iteration.",
      },
      {
        id: 9,
        text: "What is the correct syntax for an if statement in Python?",
        options: [
          "if (x > 5)",
          "if x > 5:",
          "if x > 5 then:",
          "if x > 5 do:",
        ],
        correctIndex: 1,
        explanation:
          "Python uses 'if condition:' syntax. The colon (:) is required. No parentheses are needed.",
      },
      {
        id: 10,
        text: "What does the import statement do?",
        options: [
          "Creates a new module",
          "Loads a module into your program",
          "Exports data",
          "Deletes a module",
        ],
        correctIndex: 1,
        explanation:
          "The import statement loads external modules. Example: import math or from os import path",
      },
    ],
  },

  Java: {
    name: "Java",
    questions: [
      {
        id: 1,
        text: "What is the correct file extension for Java source files?",
        options: [".java", ".jav", ".javasource", ".j"],
        correctIndex: 0,
        explanation:
          "Java source files use the .java extension. The file name must match the public class name.",
      },
      {
        id: 2,
        text: "Which keyword is used to create a class in Java?",
        options: ["class", "Class", "classdef", "type"],
        correctIndex: 0,
        explanation:
          "The 'class' keyword is used to define a class. Example: public class MyClass { ... }",
      },
      {
        id: 3,
        text: "What is the entry point of a Java program?",
        options: [
          "main() method",
          "start() method",
          "init() method",
          "run() method",
        ],
        correctIndex: 0,
        explanation:
          "The main() method is the entry point. Syntax: public static void main(String[] args)",
      },
      {
        id: 4,
        text: "Which of the following is NOT a primitive data type in Java?",
        options: ["int", "String", "boolean", "double"],
        correctIndex: 1,
        explanation:
          "String is an object type (reference type), not a primitive. The 8 primitives are: byte, short, int, long, float, double, boolean, char.",
      },
      {
        id: 5,
        text: "What is inheritance in Java?",
        options: [
          "A way to copy code",
          "A mechanism to reuse code from a parent class",
          "A method to delete classes",
          "A type of variable",
        ],
        correctIndex: 1,
        explanation:
          "Inheritance allows a class to inherit properties and methods from another class using the 'extends' keyword.",
      },
      {
        id: 6,
        text: "What does the 'static' keyword mean in Java?",
        options: [
          "The variable cannot change",
          "It belongs to the class, not individual objects",
          "It is private",
          "It must be initialized",
        ],
        correctIndex: 1,
        explanation:
          "Static members belong to the class itself, not to instances. They are shared by all objects of the class.",
      },
      {
        id: 7,
        text: "What is the output of System.out.println(5 + 2 * 3)?",
        options: ["21", "11", "17", "15"],
        correctIndex: 1,
        explanation:
          "Multiplication has higher precedence than addition. So, 5 + (2 * 3) = 5 + 6 = 11.",
      },
      {
        id: 8,
        text: "Which access modifier allows access from within the same package?",
        options: ["private", "protected", "default (no modifier)", "public"],
        correctIndex: 2,
        explanation:
          "Default access (package-private) allows access from the same package. It's the default when no modifier is specified.",
      },
      {
        id: 9,
        text: "What is a constructor in Java?",
        options: [
          "A method that destroys objects",
          "A method that initializes objects",
          "A method that returns a value",
          "A type of variable",
        ],
        correctIndex: 1,
        explanation:
          "A constructor is a special method used to initialize objects. It has the same name as the class and no return type.",
      },
      {
        id: 10,
        text: "What does the 'new' keyword do in Java?",
        options: [
          "Creates a new class",
          "Declares a new variable",
          "Allocates memory and creates an object instance",
          "Starts a new program",
        ],
        correctIndex: 2,
        explanation:
          "The 'new' keyword allocates memory on the heap and creates an object instance. Example: MyClass obj = new MyClass();",
      },
    ],
  },

  C: {
    name: "C",
    questions: [
      {
        id: 1,
        text: "What is the correct file extension for C source files?",
        options: [".c", ".cpp", ".cs", ".ch"],
        correctIndex: 0,
        explanation:
          ".c is the extension for C source files. .cpp is for C++, .cs is for C#.",
      },
      {
        id: 2,
        text: "Which header file contains the printf function?",
        options: ["<string.h>", "<stdio.h>", "<math.h>", "<stdlib.h>"],
        correctIndex: 1,
        explanation:
          "stdio.h (Standard Input/Output) contains printf, scanf, and other I/O functions.",
      },
      {
        id: 3,
        text: "What is a pointer in C?",
        options: [
          "A variable that stores an integer",
          "A variable that stores a memory address",
          "A function pointer",
          "A type of loop",
        ],
        correctIndex: 1,
        explanation:
          "A pointer is a variable that stores the memory address of another variable. Created using the & operator.",
      },
      {
        id: 4,
        text: "What is the size of int data type in C (typically)?",
        options: ["1 byte", "2 bytes", "4 bytes", "8 bytes"],
        correctIndex: 2,
        explanation:
          "On most modern systems, int is 4 bytes. However, this can vary by system. Use sizeof(int) to check.",
      },
      {
        id: 5,
        text: "What is the difference between '&' and '*' in C?",
        options: [
          "Both are the same",
          "'&' is address-of operator, '*' is dereference operator",
          "'*' is address-of operator, '&' is dereference operator",
          "They are used for multiplication",
        ],
        correctIndex: 1,
        explanation:
          "'&' gets the address of a variable, '*' accesses the value at an address (dereferences).",
      },
      {
        id: 6,
        text: "Which function is used to allocate memory dynamically in C?",
        options: ["create()", "new()", "malloc()", "allocate()"],
        correctIndex: 2,
        explanation:
          "malloc() allocates memory dynamically on the heap. Other options: calloc(), realloc()",
      },
      {
        id: 7,
        text: "What does free() function do in C?",
        options: [
          "Frees variables",
          "Deallocates dynamically allocated memory",
          "Clears the screen",
          "Closes files",
        ],
        correctIndex: 1,
        explanation:
          "free() releases memory allocated by malloc(), calloc(), or realloc(). Important to prevent memory leaks.",
      },
      {
        id: 8,
        text: "What is the correct way to declare a string in C?",
        options: [
          "string name;",
          "char name[];",
          "String name;",
          "text name;",
        ],
        correctIndex: 1,
        explanation:
          "Strings in C are arrays of characters. Example: char name[50]; No built-in 'string' type in C.",
      },
      {
        id: 9,
        text: "What is the output of 10 % 3 in C?",
        options: ["3", "1", "3.33", "10"],
        correctIndex: 1,
        explanation:
          "The modulo operator (%) returns the remainder. 10 % 3 = 1 (10 divided by 3 leaves remainder 1).",
      },
      {
        id: 10,
        text: "What is a struct in C?",
        options: [
          "A type of loop",
          "A keyword for structures",
          "A user-defined data type that groups variables",
          "A function",
        ],
        correctIndex: 2,
        explanation:
          "struct allows you to create composite data types. Example: struct Person { char name[50]; int age; };",
      },
    ],
  },

  HTML: {
    name: "HTML",
    questions: [
      {
        id: 1,
        text: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "High Tech Modern Language",
          "Home Tool Markup Language",
          "Hyperlinks and Text Markup Language",
        ],
        correctIndex: 0,
        explanation:
          "HTML stands for HyperText Markup Language. It's used to create web pages.",
      },
      {
        id: 2,
        text: "Which tag is used for the largest heading in HTML?",
        options: ["<h6>", "<heading>", "<h1>", "<header>"],
        correctIndex: 2,
        explanation:
          "<h1> is the largest heading. Headings range from <h1> (largest) to <h6> (smallest).",
      },
      {
        id: 3,
        text: "What does <meta> tag do?",
        options: [
          "Creates metadata about the HTML document",
          "Adds style to the page",
          "Creates a menu",
          "Links external files",
        ],
        correctIndex: 0,
        explanation:
          "<meta> tags provide metadata like charset, viewport, and description for search engines.",
      },
      {
        id: 4,
        text: "Which tag is used to create a hyperlink?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        correctIndex: 1,
        explanation:
          "The <a> tag creates hyperlinks. Example: <a href='https://example.com'>Link</a>",
      },
      {
        id: 5,
        text: "What is the correct way to insert an image in HTML?",
        options: [
          "<img src='image.jpg'>",
          "<image src='image.jpg'>",
          "<img href='image.jpg'>",
          "<picture src='image.jpg'>",
        ],
        correctIndex: 0,
        explanation:
          "The <img> tag with 'src' attribute displays images. Also use 'alt' for accessibility.",
      },
      {
        id: 6,
        text: "Which tag is used to define a form?",
        options: ["<input>", "<form>", "<fields>", "<data>"],
        correctIndex: 1,
        explanation:
          "The <form> tag creates a form to collect user input. It contains input fields, buttons, etc.",
      },
      {
        id: 7,
        text: "What is the correct syntax for a comment in HTML?",
        options: [
          "// This is a comment",
          "<!-- This is a comment -->",
          "# This is a comment",
          "/* This is a comment */",
        ],
        correctIndex: 1,
        explanation:
          "HTML comments use <!-- --> syntax. Comments are not displayed in the browser.",
      },
      {
        id: 8,
        text: "Which tag is used to group related elements?",
        options: ["<group>", "<div>", "<section>", "All of the above"],
        correctIndex: 3,
        explanation:
          "<div>, <section>, and other semantic tags group related elements. <div> is generic, <section> is semantic.",
      },
      {
        id: 9,
        text: "What does the <button> tag do?",
        options: [
          "Creates a clickable button",
          "Links to another page",
          "Creates an input field",
          "Defines a section",
        ],
        correctIndex: 0,
        explanation:
          "The <button> tag creates a clickable button. It can trigger JavaScript functions or submit forms.",
      },
      {
        id: 10,
        text: "Which tag is used for line breaks in HTML?",
        options: ["<break>", "<lb>", "<br>", "<newline>"],
        correctIndex: 2,
        explanation:
          "The <br> tag creates a line break. It's a self-closing tag: <br> or <br/>",
      },
    ],
  },
};
