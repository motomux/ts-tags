import should from 'should';

import * as tags from '../lib/index';

describe('stringify', () => {
  it('should return "Hello World !" when values are ["Hello ", " !"] and "World"', () => {
    tags.stringify(['Hello ', ' !'], 'World').should.be.equal('Hello World !');
  });

  it('should return test when value is "test"', () => {
    tags.stringify(['test']).should.be.equal('test');
  });
});

describe('strings', () => {
  describe('replace', () => {
    it('should return "HelloWorld !" when values are " ", "", `Hello World !`', () => {
      tags.strings().replace(' ', '')`Hello World !`.should.be.equal('HelloWorld !');
    });

    it('should return "HelloWorld!" when values are /\s/g, "", `Hello World !`', () => {
      tags.strings().replace(/\s/g, '')`Hello World !`.should.be.equal('HelloWorld!');
    });

    it('should return "Hello World !" when values are /(^\s*/g, "", `\n      Hello \n      World \n      !`', () => {
      tags.strings().replace(/^\s*/g, '')
      `
      Hello 
      World 
      !
      `.should.be.equal('Hello World !');
    });
  });

  describe('ltrim', () => {
    it('should return "Hello World !" when value is `  Hello World !`', () => {
      tags.strings().ltrim`  Hello World !`.should.be.equal('Hello World !');
    });

    it('should return "Hello World !" when value is `\n      Hello\n      World\n     !\n`', () => {
      tags.strings().ltrim
      `
        Hello 
        World 
        !
      `
    });
  });
});

describe('strs', () => {
  describe('ltrim', () => {
    it('should return "Hello World !" when value is `  Hello World !`', () => {
      tags.strs.ltrim`  Hello World !`.should.be.equal('Hello World !');
    });

    it('should return "Hello World !" when value is `\n      Hello\n      World\n     !\n`', () => {
      tags.strs.ltrim
      `
        Hello 
        World 
        !
      `
    });
  });
});
