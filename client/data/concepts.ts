export interface Concept {
  id: string;
  title: string;
  description: string;
  example: string;
  icon?: string;
}

export interface SubjectConcepts {
  name: string;
  concepts: Concept[];
  introduction: string;
}

export const conceptsData: Record<string, SubjectConcepts> = {
  Python: {
    name: "Python",
    introduction:
      "Python is a high-level, interpreted programming language known for its simplicity and readability. It's widely used in web development, data science, artificial intelligence, and automation.",
    concepts: [
      {
        id: "variables",
        title: "Variables and Data Types",
        description:
          "Variables are containers for storing data values. Python supports integers, floats, strings, booleans, lists, dictionaries, and more.",
        example: `x = 10  # integer
y = 3.14  # float
name = "Alice"  # string
is_active = True  # boolean`,
      },
      {
        id: "control_flow",
        title: "Control Flow (if, elif, else)",
        description:
          "Control flow statements allow you to execute different code blocks based on conditions.",
        example: `age = 20
if age < 18:
    print("You are a minor")
elif age < 65:
    print("You are an adult")
else:
    print("You are a senior")`,
      },
      {
        id: "loops",
        title: "Loops (for, while)",
        description:
          "Loops allow you to execute a block of code multiple times, iterating over sequences or conditions.",
        example: `# For loop
for i in range(5):
    print(i)

# While loop
count = 0
while count < 5:
    print(count)
    count += 1`,
      },
      {
        id: "functions",
        title: "Functions",
        description:
          "Functions are reusable blocks of code that perform specific tasks. They help organize and simplify your code.",
        example: `def greet(name):
    return f"Hello, {name}!"

result = greet("Alice")
print(result)  # Output: Hello, Alice!`,
      },
      {
        id: "lists",
        title: "Lists and Collections",
        description:
          "Lists are ordered, mutable collections that can hold multiple items. Tuples, sets, and dictionaries are other collection types.",
        example: `fruits = ["apple", "banana", "orange"]
fruits.append("grape")
print(fruits[0])  # apple

my_dict = {"name": "Alice", "age": 25}
print(my_dict["name"])  # Alice`,
      },
      {
        id: "oop",
        title: "Object-Oriented Programming",
        description:
          "OOP is a programming paradigm based on classes and objects. It promotes code reusability and organization.",
        example: `class Dog:
    def __init__(self, name):
        self.name = name
    
    def bark(self):
        return f"{self.name} says Woof!"

dog = Dog("Rex")
print(dog.bark())`,
      },
    ],
  },

  Java: {
    name: "Java",
    introduction:
      "Java is a general-purpose, object-oriented programming language known for its 'write once, run anywhere' philosophy. It's widely used in enterprise applications, Android development, and large-scale systems.",
    concepts: [
      {
        id: "classes_objects",
        title: "Classes and Objects",
        description:
          "Classes are blueprints for creating objects. Objects are instances of classes that contain data and behavior.",
        example: `public class Car {
    String color;
    int speed;
    
    public void drive() {
        System.out.println("Car is driving");
    }
}

Car myCar = new Car();
myCar.color = "red";`,
      },
      {
        id: "inheritance",
        title: "Inheritance",
        description:
          "Inheritance allows a class to inherit properties and methods from another class, promoting code reuse.",
        example: `public class Vehicle {
    void drive() {
        System.out.println("Driving...");
    }
}

public class Car extends Vehicle {
    void honk() {
        System.out.println("Honk!");
    }
}`,
      },
      {
        id: "polymorphism",
        title: "Polymorphism",
        description:
          "Polymorphism allows objects to take multiple forms. Methods with the same name can behave differently in different classes.",
        example: `interface Animal {
    void sound();
}

class Dog implements Animal {
    public void sound() {
        System.out.println("Woof!");
    }
}`,
      },
      {
        id: "encapsulation",
        title: "Encapsulation",
        description:
          "Encapsulation hides internal details and provides a controlled interface. Use private variables with public getters/setters.",
        example: `public class Person {
    private int age;
    
    public void setAge(int newAge) {
        if (newAge > 0) age = newAge;
    }
    
    public int getAge() {
        return age;
    }
}`,
      },
      {
        id: "arrays_collections",
        title: "Arrays and Collections",
        description:
          "Arrays store multiple values of the same type. Collections like ArrayList, HashMap, and HashSet provide flexible data structures.",
        example: `int[] numbers = {1, 2, 3, 4, 5};
System.out.println(numbers[0]);  // 1

ArrayList<String> list = new ArrayList<>();
list.add("apple");
list.add("banana");`,
      },
      {
        id: "exception_handling",
        title: "Exception Handling",
        description:
          "Exception handling manages errors gracefully using try-catch blocks, preventing program crashes.",
        example: `try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Cannot divide by zero");
} finally {
    System.out.println("Execution complete");
}`,
      },
    ],
  },

  C: {
    name: "C",
    introduction:
      "C is a procedural, general-purpose programming language known for its efficiency and control. It's widely used in system software, embedded systems, and performance-critical applications.",
    concepts: [
      {
        id: "variables_types",
        title: "Variables and Data Types",
        description:
          "C has basic data types: int, float, double, char. Variables must be declared with their type before use.",
        example: `int age = 25;
float height = 5.9;
char initial = 'A';
double pi = 3.14159;

printf("Age: %d\\n", age);`,
      },
      {
        id: "pointers",
        title: "Pointers",
        description:
          "Pointers store memory addresses of variables. They enable dynamic memory management and complex data structures.",
        example: `int x = 10;
int *p = &x;  // p stores address of x

printf("Value: %d\\n", *p);  // Dereference to get value
printf("Address: %p\\n", p);  // Print address`,
      },
      {
        id: "arrays_strings",
        title: "Arrays and Strings",
        description:
          "Arrays store multiple values of the same type. Strings in C are arrays of characters terminated with null character.",
        example: `int arr[5] = {1, 2, 3, 4, 5};
printf("%d\\n", arr[0]);  // 1

char str[] = "Hello";
printf("%s\\n", str);`,
      },
      {
        id: "functions",
        title: "Functions",
        description:
          "Functions break code into reusable blocks. Functions in C must be declared before use.",
        example: `int add(int a, int b) {
    return a + b;
}

int result = add(5, 3);
printf("Sum: %d\\n", result);`,
      },
      {
        id: "memory_management",
        title: "Memory Management",
        description:
          "Dynamic memory allocation allows allocating memory at runtime using malloc() and freeing it with free().",
        example: `int *ptr = (int *)malloc(sizeof(int));
*ptr = 42;
printf("%d\\n", *ptr);
free(ptr);  // Always free allocated memory`,
      },
      {
        id: "structs",
        title: "Structures",
        description:
          "Structures group related variables together, creating composite data types. Useful for organizing complex data.",
        example: `struct Person {
    char name[50];
    int age;
};

struct Person p1 = {"Alice", 25};
printf("Name: %s, Age: %d\\n", p1.name, p1.age);`,
      },
    ],
  },

  HTML: {
    name: "HTML",
    introduction:
      "HTML (HyperText Markup Language) is the standard markup language for creating web pages. It provides the structure and content of web documents.",
    concepts: [
      {
        id: "basic_tags",
        title: "Basic HTML Structure",
        description:
          "HTML documents have a specific structure: doctype, html, head, and body tags form the foundation.",
        example: `<!DOCTYPE html>
<html lang="en">
<head>
    <title>My Page</title>
</head>
<body>
    <h1>Welcome</h1>
</body>
</html>`,
      },
      {
        id: "headings_paragraphs",
        title: "Headings and Paragraphs",
        description:
          "Use h1-h6 tags for headings (h1 is largest) and p tags for paragraphs. Headings define document structure.",
        example: `<h1>Main Title</h1>
<h2>Subtitle</h2>
<p>This is a paragraph of text.</p>
<p>Another paragraph.</p>`,
      },
      {
        id: "links_images",
        title: "Links and Images",
        description:
          "Use <a> tags for hyperlinks and <img> tags for images. Both are essential for multimedia web pages.",
        example: `<a href="https://example.com">Click here</a>
<img src="photo.jpg" alt="A beautiful photo">
<a href="about.html">About Page</a>`,
      },
      {
        id: "lists",
        title: "Lists",
        description:
          "HTML supports ordered lists (ol), unordered lists (ul), and definition lists (dl) for organizing information.",
        example: `<ul>
    <li>Item 1</li>
    <li>Item 2</li>
</ul>

<ol>
    <li>First</li>
    <li>Second</li>
</ol>`,
      },
      {
        id: "forms",
        title: "Forms",
        description:
          "Forms collect user input through text fields, checkboxes, radio buttons, and submit buttons.",
        example: `<form action="/submit" method="POST">
    <input type="text" placeholder="Name">
    <input type="email" placeholder="Email">
    <textarea>Comments</textarea>
    <button type="submit">Submit</button>
</form>`,
      },
      {
        id: "semantic_html",
        title: "Semantic HTML",
        description:
          "Semantic tags like <header>, <nav>, <article>, <section> provide meaning to content and improve accessibility.",
        example: `<header><h1>Site Title</h1></header>
<nav><a href="/">Home</a></nav>
<article>
    <h2>Article Title</h2>
    <p>Content here</p>
</article>
<footer>Copyright 2024</footer>`,
      },
    ],
  },
};
