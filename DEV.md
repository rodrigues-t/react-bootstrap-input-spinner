# react-bootstrap-input-spinner

## About
An input number spinner based on Bootstrap. 

This project is based on `React Native Input Spinner` from Marco Cesarato. Click [here](https://github.com/marcocesarato/react-native-input-spinner) to check out his Github. 

This project was initially made to meet the needs of my projects. This may change in the future (it will), so if you want to contribute with the project, feel free to do it making pull requests. I truelly will apreciate it.

## Why?
In summary, I needed to:  
1. use Bootstrap 
2. use small decimal numbers, but there was a bug that prevented me from using it. (Bug already fixed by Marco Cesarato in his Input Spinner). 

It's possible there are some bugs once I probably didn't perform tests in all scenarios. So, again, I appreciate if you want to contribute with bug fixes, tests, and enhancements. If you could, of course.  

By the way, I recommend you go to [Marco Cesarato repository](https://github.com/marcocesarato/react-native-input-spinner) and check out his well maintained and great work. 

## Getting Started

**You can clone and modify as you wish**  

Make sure you have a recent version of Node.js installed in yout development environment.

**Cloning Repository**
```
$ git clone https://github.com/rodrigues-t/react-bootstrap-input-spinner.git
```

**Installing all dependencies (library and playground)**
```
$ npm run i-all
```

**Runinng for test:**
The command bellow will build and start the playgroud  
```
$ npm run dev
```

**Publishing in Github Packages**

There is a workflow in the Github Actions to automate this process. Check it out there to see how.

**Publishing in Github Packages**
```
$ npm login --registry=https://npm.pkg.github.com
```
And then
```
$ npm publish
```
Notice Github Packages need to be scoped. The name of the package need to be something like @<your_name>/react-bootstrap-input-spinner

## Built With

1. React
2. Typescript
3. React-Bootstrap
4. Rollup