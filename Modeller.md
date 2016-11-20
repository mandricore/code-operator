## Modeller

Create a modeller app to interface with the file system (project files).,
The modeller app should be used by each server app (see below).
The modeller server app must listen (watch) for file changes and generates a model from the project descriptor and artefacts (source files). Perhaps use gulp-watch or similar file watcher lib.

When testing, use ava with mock-fs to simulate a virtual file system. Use Node 7 async/await for file operations and server request/response.

Use the testdouble library to mock and test communication with the server. This allows you to test your client before the server is developed!

### Abstract Syntax Tree (AST)
The artefact models can be made to contain class functions etc. using an AST library. This is useful for creating methods etc. and when visualising the project structure (see visualiser app below). You can enrich your artefact models with the signatures of each of the methods in the classes and thus display this in the visualiser to get a more detailed understanding. You could also use the AST to generate/modify code, such as inserting or removing functions dynamically. The only limit is your imagination ;)


Use esprima, espree, acorn, esquery or grasp.
Perhaps use one or more of these libs in combination.

### Libs

http://esprima.org/
https://github.com/llafuente/esprima-ast-utils
https://github.com/eslint/espree
https://github.com/ternjs/acorn
https://github.com/estools/esquery
https://github.com/gkz/grasp