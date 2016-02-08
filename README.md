# ts-tags
ts-tags is a library to provide useful tag functions for ES6 template string

## Install

```
npm install -S ts-tags
```

## Usage

```
const tags = require('ts-tags');

// This is long error logs
console.log(
  tags.strs.ltrim
  `
  This 
  is 
  long 
  error 
  logs
  `
);
```
