import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Statements - For in', () => {

    it('should fail on async function in statement position', () => {
        expect(() => {
            parseScript('for (var x in {}) async function f() {}');
        }).to.throw();
    });

    it('should fail on async generator function in statement position', () => {
        expect(() => {
            parseScript('for (var x in {}) async function* g() {}');
        }).to.throw();
    });

    it('should fail on invalid prenthesized pattern', () => {
      expect(() => {
          parseScript('for((1 + 1) in list) process(x);');
      }).to.throw();
    });

    it('should fail on class declaration in statement position', () => {
        expect(() => {
            parseScript('for (var x in {}) class C {}');
        }).to.throw();
    });

    it('should fail on lexical declaration in statement position', () => {
        expect(() => {
            parseScript('for (var x in {}) let y;');
        }).to.throw();
    });

    it('should fail on async generator function in statement position', () => {
        expect(() => {
            parseScript('for (var x in {}) async function* g() {}');
        }).to.throw();
    });

    it('should fail on invalid use of eval', () => {
        expect(() => {
            parseScript('"use strict"; for ({ eval } in [{}]) ;');
        }).to.throw();
    });

    it('should fail on invalid use of eval', () => {
        expect(() => {
            parseScript('"use strict"; for ({ eval } in [{}]) ;');
        }).to.throw();
    });

    it('should fail on invalid use of eval', () => {
        expect(() => {
            parseScript('"use strict"; for ({ eval } in [{}]) ;');
        }).to.throw();
    });

    it('should fail on invalid use of eval', () => {
        expect(() => {
            parseScript('"use strict"; for ({ eval } in [{}]) ;');
        }).to.throw();
    });

    it('should fail on ""use strict"; for ({ x: [x = yield] } in [{ x: [] }]) ;"', () => {
        expect(() => {
            parseScript('"use strict"; for ({ x: [x = yield] } in [{ x: [] }]) ;');
        }).to.throw();
    });

    it('should fail on yield nested destructuring assignment', () => {
        expect(() => {
            parseScript('for ([...{ x = yield }] in [[{}]]) ;');
        }).to.not.throw();
    });

    it('should fail on invalid use of eval in assignment target', () => {
        expect(() => {
            parseScript('"use strict"; for ({ eval = 0 } in [{}]) ;');
        }).to.throw();
    });

    it('should fail "for ([...x, ...y] in [[]]) ;"', () => {
        expect(() => {
            parseScript('for ([...x, ...y] in [[]]) ;');
        }).to.not.throw();
    });

    it('should fail "for (const a = 0 in {});"', () => {
        expect(() => {
            parseScript('for (const a = 0 in {});');
        }).to.throw();
    });

    it('should fail "for (var {a} = 0 in {});"', () => {
        expect(() => {
            parseScript('"use strict"; for(var x = 0 in {}) {}');
        }).to.throw();
    });

    it('should fail "for (var {a} = 0 in {});"', () => {
        expect(() => {
            parseScript('for (var {a} = 0 in {});');
        }).to.throw();
    });
   
    it('should fail on assignment rest element with an initializer', () => {
        expect(() => {
            parseScript('for ([...x = 1] in [[]]) ;');
        }).to.throw();
    });

    it('should fail on ""use strict"; for ([[x[yield]]] in [[[]]]) ;"', () => {
        expect(() => {
            parseScript('"use strict"; for ([[x[yield]]] in [[[]]]) ;');
        }).to.throw();
    });

    it('should fail on array rest before elison', () => {
        expect(() => {
            parseScript('for ([...x,] in [[]]) ;');
        }).to.not.throw();
    });

    it('should fail on invalid use of yield in destructuring assignment', () => {
        expect(() => {
            parseScript('"use strict"; for ([ x[yield] ] in [[]]) ;');
        }).to.throw();
    });

    it('should fail on invalid use of yield in destructuring assignment of nested destructuruing assignment', () => {
        expect(() => {
            parseScript('"use strict"; for ([[x[yield]]] in [[[]]]) ;');
        }).to.throw();
    });

    it('should fail on "for ([[(x, y)]] in [[[]]]) ;"', () => {
        expect(() => {
            parseScript('for ([[(x, y)]] in [[[]]]) ;');
        }).to.throw();
    });

    it('should fail on lexical declaration (let) in statement position', () => {
        expect(() => {
            parseScript('for (var x in {}) let y;');
        }).to.throw('');
    });

    it('should fail on async generator declaration in statement position', () => {
        expect(() => {
            parseScript('for (var x in {}) async function* g() {}', { next: true});
        }).to.throw();
    });

    it('should fail if the head declaration contain duplicate entries', () => {
        expect(() => {
            parseScript('for (const [x, x] in {}) {}');
        }).to.throw('');
    });

    it('should fail if the head declaration contain duplicate entries', () => {
        expect(() => {
            parseScript('for (let [x, x] in {}) {}');
        }).to.throw('');
    });

    it('should fail on "for (const x in {}) label1: label2: function f() {}"', () => {
        expect(() => {
            parseScript('for (const x in {}) label1: label2: function f() {}');
        }).to.throw();
    });

    it('should fail on "for (let x in {}) label1: label2: function f() {}"', () => {
        expect(() => {
            parseScript('for (let x in {}) label1: label2: function f() {}');
        }).to.throw();
    });

    it('should fail on "for (var x in {}) label1: label2: function f() {}"', () => {
        expect(() => {
            parseScript('for (var x in {}) label1: label2: function f() {}');
        }).to.throw();
    });

    it('should throw on unexpected number', () => {
        expect(() => { parseScript('for(let a = 0 in b);')}).to.throw();
    });

    it('should throw on unexpected number', () => {
        expect(() => { parseScript('for(const a = 0 in b);')}).to.throw();
    });

    it('should throw on "for(let ? b : c in 0);"', () => {
        expect(() => { parseScript('for(let ? b : c in 0);')}).to.throw();
    });

    it('should throw on "for(({a}) in 0);"', () => {
        expect(() => { parseScript('for(({a}) in 0);')}).to.throw();
    });

    it('should throw on "for (a = 0 in {});"', () => {
        expect(() => { parseScript('for (a = 0 in {});')}).to.throw();
    });

    it('should throw on "for (let a = 0 in {});"', () => {
        expect(() => { parseScript('for (let a = 0 in {});')}).to.throw();
    });

    it('should throw on "for (var [a] = 0 in {});"', () => {
        expect(() =>  { parseScript('for (var [a] = 0 in {});')}).to.throw();
    });

    it('should fail on unexpected number"', () => {
        expect(() => {
            parseScript('for (const of 42);');
        }).to.throw();
    });

    it('should fail on const bound name duplicates (const)', () => {
        expect(() => {
            parseScript('for (const [x, x] in {}) {}');
        }).to.throw('');
    });
    it('should fail on const bound name duplicates (let)', () => {
        expect(() => {
            parseScript('for (let [x, x] in {}) {}');
        }).to.throw('');
    });

    it('should fail on comma after rest element', () => {
      expect(() => {
          parseScript('for (let [...foo, bar] in qux);');
      }).to.throw('');
    });
    it('should fail on const bound name duplicates in statement (const)', () => {
        expect(() => {
            parseScript('for (const x in {}) { var x; }');
        }).to.not.throw('');
    });
    it('should fail on const bound name duplicates in statement (let)', () => {
        expect(() => {
            parseScript('for (let x in {}) { var x; }');
        }).to.not.throw();
    });
    it('should fail on const bound name let', () => {
        expect(() => {
            parseScript('for (const let in {}) {}');
        }).to.throw();
    });
    it('should fail on invalid LHS assignment', () => {
        expect(() => {
            parseScript('for ((this) in {}) {}');
          }).to.throw();
    });
    it('should fail on invalid LHS assignment', () => {
        expect(() => {
            parseScript('for (this in {}) {}');
        }).to.throw();
    });
    it('should fail if declaration contain a binding for `let`', () => {
        expect(() => {
            parseScript('for (let let in {}) {}');
        }).to.throw();
    });

    it('should fail on invalid labeled statement', () => {
        expect(() => {
            parseScript('for (let x in {}) label1: label2: function f() {}}');
        }).to.throw();
    });

    it('should fail on ""use strict"; for ({ x: x[yield] } in [{}]);"', () => {
        expect(() => {
            parseScript('"use strict"; for ({ x: x[yield] } in [{}]);');
        }).to.throw();
    });
    it('should fail on invalid array yield identifier', () => {
        expect(() => {
            parseScript('"use strict"; for ({ x: [x = yield] } in [{ x: [] }]) ;');
        }).to.throw();
    });

    it('should fail on invalid array rest', () => {
        expect(() => {
            parseScript('for ([...x = 1] in [[]]) ;');
        }).to.throw();
    });
  
    it('should fail on invalid rest before ellison', () => {
        expect(() => {
            parseScript('for ([...x,] in [[]]) ;');
        }).to.not.throw();
    });
    it('should fail on invalid array nested object', () => {
        expect(() => {
            parseScript('for ([{ get x() {} }] in [[{}]]) ;');
        }).to.throw();
    });

    it('should fail on invalid array element nested array yield identifier', () => {
        expect(() => {
            parseScript('"use strict"; for ([[x[yield]]] in [[[]]]) ;');
        }).to.throw();
    });

    it('should fail on "for(let a = 0 in b);"', () => {
        expect(() => {
            parseScript('for(let a = 0 in b);');
        }).to.throw();
    });
    it('should fail on "for(const a = 0 in b);"', () => {
        expect(() => {
            parseScript('for(const a = 0 in b);;');
        }).to.throw();
    });
    it('should fail on "for(let ? b : c in 0);"', () => {
        expect(() => {
            parseScript('for(let ? b : c in 0);');
          }).to.throw();
    });

    it('should fail on "for(([{}]) in 0);"', () => {
        expect(() => {
            parseScript('for(([{}]) in 0);');
        }).to.throw();
    });

    it('should fail on "for(({a}) in 0);"', () => {
        expect(() => {
            parseScript('for(({a}) in 0);');
        }).to.throw();
    });
    it('should fail on "for(([a]) in 0);"', () => {
        expect(() => {
            parseScript('for(([a]) in 0);');
        }).to.throw();
    });
  
    it(`should fail on "for (var {x}=0 in y);"`, () => {
        expect(() => {
            parseScript(`for (var {x}=0 in y);`);
        }).to.throw();
    });

    it(`should fail on "for (var a = 0 in {});"`, () => {
        expect(() => {
            parseScript(`"use strict"; for (var a = 0 in {});`);
        }).to.throw();
    });

    it(`should fail on "for (var [p]=0 in q);"`, () => {
        expect(() => {
            parseScript(`for (var [p]=0 in q);`);
        }).to.throw();
    });

    it(`should fail on ""use strict"; for (var {x}=0 in y);"`, () => {
        expect(() => {
            parseScript(`"use strict"; for (var {x}=0 in y);`);
        }).to.throw();
    });

    it(`should fail on ""use strict"; for (var i=0 in j);"`, () => {
        expect(() => {
            parseScript(`"use strict"; for (var i=0 in j);`);
        }).to.throw();
    });

    it(`should fail on ""use strict"; for (var [p]=1 in q);"`, () => {
        expect(() => {
            parseScript(`"use strict"; for (var [p]=1 in q);`);
        }).to.throw();
    });
     
    it(`should fail on ""use strict"; for (var i = "" in { a: 10, b: 20 }) {}"`, () => {
        expect(() => {
            parseScript(`"use strict"; for (var i = "" in { a: 10, b: 20 }) {}`);
        }).to.throw();
    });

    it(`should fail on "for (var a in b)"`, () => {
        expect(() => {
            parseScript(`for (var a in b)`);
        }).to.throw();
    });

    it(`should fail on "for (var [p]=0 in q);"`, () => {
        expect(() => {
            parseScript(`for (var [p]=0 in q);`);
        }).to.throw();
    });

  it('should parse for in inside function body', () => {
    expect(parseScript(`(function(){
      for (attr in attrs) {
        }
  }).call(this);`, {
        ranges: true,
        raw: true,
        next: true,
        locations: true
    })).to.eql({
      "type": "Program",
      "start": 0,
      "end": 67,
      "loc": {
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 4,
          "column": 16
        }
      },
      "body": [
        {
          "type": "ExpressionStatement",
          "start": 0,
          "end": 67,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 4,
              "column": 16
            }
          },
          "expression": {
            "type": "CallExpression",
            "start": 0,
            "end": 66,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 4,
                "column": 15
              }
            },
            "callee": {
              "type": "MemberExpression",
              "start": 0,
              "end": 60,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 4,
                  "column": 9
                }
              },
              "object": {
                "type": "FunctionExpression",
                "start": 1,
                "end": 54,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 1
                  },
                  "end": {
                    "line": 4,
                    "column": 3
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 11,
                  "end": 54,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 11
                    },
                    "end": {
                      "line": 4,
                      "column": 3
                    }
                  },
                  "body": [
                    {
                      "type": "ForInStatement",
                      "start": 19,
                      "end": 50,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 6
                        },
                        "end": {
                          "line": 3,
                          "column": 9
                        }
                      },
                      "left": {
                        "type": "Identifier",
                        "start": 24,
                        "end": 28,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 11
                          },
                          "end": {
                            "line": 2,
                            "column": 15
                          }
                        },
                        "name": "attr"
                      },
                      "right": {
                        "type": "Identifier",
                        "start": 32,
                        "end": 37,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 19
                          },
                          "end": {
                            "line": 2,
                            "column": 24
                          }
                        },
                        "name": "attrs"
                      },
                      "body": {
                        "type": "BlockStatement",
                        "start": 39,
                        "end": 50,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 26
                          },
                          "end": {
                            "line": 3,
                            "column": 9
                          }
                        },
                        "body": []
                      }
                    }
                  ]
                }
              },
              "property": {
                "type": "Identifier",
                "start": 56,
                "end": 60,
                "loc": {
                  "start": {
                    "line": 4,
                    "column": 5
                  },
                  "end": {
                    "line": 4,
                    "column": 9
                  }
                },
                "name": "call"
              },
              "computed": false
            },
            "arguments": [
              {
                "type": "ThisExpression",
                "start": 61,
                "end": 65,
                "loc": {
                  "start": {
                    "line": 4,
                    "column": 10
                  },
                  "end": {
                    "line": 4,
                    "column": 14
                  }
                }
              }
            ]
          }
        }
      ],
      "sourceType": "script"
    });
  });

    it('should parse "for ([...foo, bar].baz in qux);', () => {
      expect(parseScript(`for ([...foo, bar].baz in qux);`, {
          ranges: true,
          raw: true,
          next: true,
          locations: true
      })).to.eql({
        "type": "Program",
        "body": [
            {
                "type": "ForInStatement",
                "body": {
                    "type": "EmptyStatement",
                    "start": 30,
                    "end": 31,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 30
                        },
                        "end": {
                            "line": 1,
                            "column": 31
                        }
                    }
                },
                "left": {
                    "type": "MemberExpression",
                    "object": {
                        "type": "ArrayExpression",
                        "elements": [
                            {
                                "type": "SpreadElement",
                                "argument": {
                                    "type": "Identifier",
                                    "name": "foo",
                                    "start": 9,
                                    "end": 12,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 9
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 12
                                        }
                                    }
                                },
                                "start": 6,
                                "end": 12,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 6
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 12
                                    }
                                }
                            },
                            {
                                "type": "Identifier",
                                "name": "bar",
                                "start": 14,
                                "end": 17,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 14
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 17
                                    }
                                }
                            }
                        ],
                        "start": 5,
                        "end": 18,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 5
                            },
                            "end": {
                                "line": 1,
                                "column": 18
                            }
                        }
                    },
                    "computed": false,
                    "property": {
                        "type": "Identifier",
                        "name": "baz",
                        "start": 19,
                        "end": 22,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 19
                            },
                            "end": {
                                "line": 1,
                                "column": 22
                            }
                        }
                    },
                    "start": 5,
                    "end": 22,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 5
                        },
                        "end": {
                            "line": 1,
                            "column": 22
                        }
                    }
                },
                "right": {
                    "type": "Identifier",
                    "name": "qux",
                    "start": 26,
                    "end": 29,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 26
                        },
                        "end": {
                            "line": 1,
                            "column": 29
                        }
                    }
                },
                "start": 0,
                "end": 31,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 31
                    }
                }
            }
        ],
        "sourceType": "script",
        "start": 0,
        "end": 31,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 1,
                "column": 31
            }
        }
    });
    });
    
    it('should parse "for ([a,b] in x) a;"', () => {
      expect(parseScript(`for ([a,b] in x) a;`, {
          ranges: true,
          raw: true,
          next: true,
          locations: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 19,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 19
          }
        },
        "body": [
          {
            "type": "ForInStatement",
            "start": 0,
            "end": 19,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 19
              }
            },
            "left": {
              "type": "ArrayPattern",
              "start": 5,
              "end": 10,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 5
                },
                "end": {
                  "line": 1,
                  "column": 10
                }
              },
              "elements": [
                {
                  "type": "Identifier",
                  "start": 6,
                  "end": 7,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 6
                    },
                    "end": {
                      "line": 1,
                      "column": 7
                    }
                  },
                  "name": "a"
                },
                {
                  "type": "Identifier",
                  "start": 8,
                  "end": 9,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 8
                    },
                    "end": {
                      "line": 1,
                      "column": 9
                    }
                  },
                  "name": "b"
                }
              ]
            },
            "right": {
              "type": "Identifier",
              "start": 14,
              "end": 15,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 14
                },
                "end": {
                  "line": 1,
                  "column": 15
                }
              },
              "name": "x"
            },
            "body": {
              "type": "ExpressionStatement",
              "start": 17,
              "end": 19,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 17
                },
                "end": {
                  "line": 1,
                  "column": 19
                }
              },
              "expression": {
                "type": "Identifier",
                "start": 17,
                "end": 18,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 17
                  },
                  "end": {
                    "line": 1,
                    "column": 18
                  }
                },
                "name": "a"
              }
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse "for ({a,b} in x) a;"', () => {
      expect(parseScript(`for ({a,b} in x) a;`, {
          ranges: true,
          raw: true,
          next: true,
          locations: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 19,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 19
          }
        },
        "body": [
          {
            "type": "ForInStatement",
            "start": 0,
            "end": 19,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 19
              }
            },
            "left": {
              "type": "ObjectPattern",
              "start": 5,
              "end": 10,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 5
                },
                "end": {
                  "line": 1,
                  "column": 10
                }
              },
              "properties": [
                {
                  "type": "Property",
                  "start": 6,
                  "end": 7,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 6
                    },
                    "end": {
                      "line": 1,
                      "column": 7
                    }
                  },
                  "method": false,
                  "shorthand": true,
                  "computed": false,
                  "key": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 7
                      }
                    },
                    "name": "a"
                  },
                  "kind": "init",
                  "value": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 7
                      }
                    },
                    "name": "a"
                  }
                },
                {
                  "type": "Property",
                  "start": 8,
                  "end": 9,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 8
                    },
                    "end": {
                      "line": 1,
                      "column": 9
                    }
                  },
                  "method": false,
                  "shorthand": true,
                  "computed": false,
                  "key": {
                    "type": "Identifier",
                    "start": 8,
                    "end": 9,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 8
                      },
                      "end": {
                        "line": 1,
                        "column": 9
                      }
                    },
                    "name": "b"
                  },
                  "kind": "init",
                  "value": {
                    "type": "Identifier",
                    "start": 8,
                    "end": 9,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 8
                      },
                      "end": {
                        "line": 1,
                        "column": 9
                      }
                    },
                    "name": "b"
                  }
                }
              ]
            },
            "right": {
              "type": "Identifier",
              "start": 14,
              "end": 15,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 14
                },
                "end": {
                  "line": 1,
                  "column": 15
                }
              },
              "name": "x"
            },
            "body": {
              "type": "ExpressionStatement",
              "start": 17,
              "end": 19,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 17
                },
                "end": {
                  "line": 1,
                  "column": 19
                }
              },
              "expression": {
                "type": "Identifier",
                "start": 17,
                "end": 18,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 17
                  },
                  "end": {
                    "line": 1,
                    "column": 18
                  }
                },
                "name": "a"
              }
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse "for (var i = function() { return 10 in [] } in list) process(x);"', () => {
      expect(parseScript(`for (var i = function() { return 10 in [] } in list) process(x);`, {
          ranges: true,
          raw: true,
          next: true,
          locations: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 64,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 64
          }
        },
        "body": [
          {
            "type": "ForInStatement",
            "start": 0,
            "end": 64,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 64
              }
            },
            "left": {
              "type": "VariableDeclaration",
              "start": 5,
              "end": 43,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 5
                },
                "end": {
                  "line": 1,
                  "column": 43
                }
              },
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "start": 9,
                  "end": 43,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 9
                    },
                    "end": {
                      "line": 1,
                      "column": 43
                    }
                  },
                  "id": {
                    "type": "Identifier",
                    "start": 9,
                    "end": 10,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 9
                      },
                      "end": {
                        "line": 1,
                        "column": 10
                      }
                    },
                    "name": "i"
                  },
                  "init": {
                    "type": "FunctionExpression",
                    "start": 13,
                    "end": 43,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 13
                      },
                      "end": {
                        "line": 1,
                        "column": 43
                      }
                    },
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                      "type": "BlockStatement",
                      "start": 24,
                      "end": 43,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 24
                        },
                        "end": {
                          "line": 1,
                          "column": 43
                        }
                      },
                      "body": [
                        {
                          "type": "ReturnStatement",
                          "start": 26,
                          "end": 41,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 26
                            },
                            "end": {
                              "line": 1,
                              "column": 41
                            }
                          },
                          "argument": {
                            "type": "BinaryExpression",
                            "start": 33,
                            "end": 41,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 33
                              },
                              "end": {
                                "line": 1,
                                "column": 41
                              }
                            },
                            "left": {
                              "type": "Literal",
                              "start": 33,
                              "end": 35,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 33
                                },
                                "end": {
                                  "line": 1,
                                  "column": 35
                                }
                              },
                              "value": 10,
                              "raw": "10"
                            },
                            "operator": "in",
                            "right": {
                              "type": "ArrayExpression",
                              "start": 39,
                              "end": 41,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 39
                                },
                                "end": {
                                  "line": 1,
                                  "column": 41
                                }
                              },
                              "elements": []
                            }
                          }
                        }
                      ]
                    }
                  }
                }
              ],
              "kind": "var"
            },
            "right": {
              "type": "Identifier",
              "start": 47,
              "end": 51,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 47
                },
                "end": {
                  "line": 1,
                  "column": 51
                }
              },
              "name": "list"
            },
            "body": {
              "type": "ExpressionStatement",
              "start": 53,
              "end": 64,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 53
                },
                "end": {
                  "line": 1,
                  "column": 64
                }
              },
              "expression": {
                "type": "CallExpression",
                "start": 53,
                "end": 63,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 53
                  },
                  "end": {
                    "line": 1,
                    "column": 63
                  }
                },
                "callee": {
                  "type": "Identifier",
                  "start": 53,
                  "end": 60,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 53
                    },
                    "end": {
                      "line": 1,
                      "column": 60
                    }
                  },
                  "name": "process"
                },
                "arguments": [
                  {
                    "type": "Identifier",
                    "start": 61,
                    "end": 62,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 61
                      },
                      "end": {
                        "line": 1,
                        "column": 62
                      }
                    },
                    "name": "x"
                  }
                ]
              }
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse "for (a(b in c)[1] in d);', () => {
        expect(parseScript(`for (a(b in c)[1] in d);`, {
            ranges: true,
            raw: true,
            next: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 24,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 24
              }
            },
            "body": [
              {
                "type": "ForInStatement",
                "start": 0,
                "end": 24,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 24
                  }
                },
                "left": {
                  "type": "MemberExpression",
                  "start": 5,
                  "end": 17,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 5
                    },
                    "end": {
                      "line": 1,
                      "column": 17
                    }
                  },
                  "object": {
                    "type": "CallExpression",
                    "start": 5,
                    "end": 14,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 5
                      },
                      "end": {
                        "line": 1,
                        "column": 14
                      }
                    },
                    "callee": {
                      "type": "Identifier",
                      "start": 5,
                      "end": 6,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 5
                        },
                        "end": {
                          "line": 1,
                          "column": 6
                        }
                      },
                      "name": "a"
                    },
                    "arguments": [
                      {
                        "type": "BinaryExpression",
                        "start": 7,
                        "end": 13,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 7
                          },
                          "end": {
                            "line": 1,
                            "column": 13
                          }
                        },
                        "left": {
                          "type": "Identifier",
                          "start": 7,
                          "end": 8,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 7
                            },
                            "end": {
                              "line": 1,
                              "column": 8
                            }
                          },
                          "name": "b"
                        },
                        "operator": "in",
                        "right": {
                          "type": "Identifier",
                          "start": 12,
                          "end": 13,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 12
                            },
                            "end": {
                              "line": 1,
                              "column": 13
                            }
                          },
                          "name": "c"
                        }
                      }
                    ]
                  },
                  "property": {
                    "type": "Literal",
                    "start": 15,
                    "end": 16,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 15
                      },
                      "end": {
                        "line": 1,
                        "column": 16
                      }
                    },
                    "value": 1,
                    "raw": "1"
                  },
                  "computed": true
                },
                "right": {
                  "type": "Identifier",
                  "start": 21,
                  "end": 22,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 21
                    },
                    "end": {
                      "line": 1,
                      "column": 22
                    }
                  },
                  "name": "d"
                },
                "body": {
                  "type": "EmptyStatement",
                  "start": 23,
                  "end": 24,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 23
                    },
                    "end": {
                      "line": 1,
                      "column": 24
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "for(let in 1);', () => {
        expect(parseScript(`for (;;) {
            a;
          }`, {
            ranges: true,
            raw: true,
            next: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 37,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 3,
                "column": 11
              }
            },
            "body": [
              {
                "type": "ForStatement",
                "start": 0,
                "end": 37,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 3,
                    "column": 11
                  }
                },
                "init": null,
                "test": null,
                "update": null,
                "body": {
                  "type": "BlockStatement",
                  "start": 9,
                  "end": 37,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 9
                    },
                    "end": {
                      "line": 3,
                      "column": 11
                    }
                  },
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 23,
                      "end": 25,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 12
                        },
                        "end": {
                          "line": 2,
                          "column": 14
                        }
                      },
                      "expression": {
                        "type": "Identifier",
                        "start": 23,
                        "end": 24,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 12
                          },
                          "end": {
                            "line": 2,
                            "column": 13
                          }
                        },
                        "name": "a"
                      }
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "for (let();;) ;"', () => {
        expect(parseScript(`for (let();;) ;`, {
            ranges: true,
            raw: true,
            next: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 15,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 15
              }
            },
            "body": [
              {
                "type": "ForStatement",
                "start": 0,
                "end": 15,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 15
                  }
                },
                "init": {
                  "type": "CallExpression",
                  "start": 5,
                  "end": 10,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 5
                    },
                    "end": {
                      "line": 1,
                      "column": 10
                    }
                  },
                  "callee": {
                    "type": "Identifier",
                    "start": 5,
                    "end": 8,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 5
                      },
                      "end": {
                        "line": 1,
                        "column": 8
                      }
                    },
                    "name": "let"
                  },
                  "arguments": []
                },
                "test": null,
                "update": null,
                "body": {
                  "type": "EmptyStatement",
                  "start": 14,
                  "end": 15,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 14
                    },
                    "end": {
                      "line": 1,
                      "column": 15
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "for (var a = (("b") in c), d = (1); d < (2); ++d) ;"', () => {
        expect(parseScript(`for (var a = (("b") in c), d = (1); d < (2); ++d) ;`, {
            ranges: true,
            raw: true,
            next: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 51,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 51
              }
            },
            "body": [
              {
                "type": "ForStatement",
                "start": 0,
                "end": 51,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 51
                  }
                },
                "init": {
                  "type": "VariableDeclaration",
                  "start": 5,
                  "end": 34,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 5
                    },
                    "end": {
                      "line": 1,
                      "column": 34
                    }
                  },
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
                      "start": 9,
                      "end": 25,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 9
                        },
                        "end": {
                          "line": 1,
                          "column": 25
                        }
                      },
                      "id": {
                        "type": "Identifier",
                        "start": 9,
                        "end": 10,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 9
                          },
                          "end": {
                            "line": 1,
                            "column": 10
                          }
                        },
                        "name": "a"
                      },
                      "init": {
                        "type": "BinaryExpression",
                        "start": 14,
                        "end": 24,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 14
                          },
                          "end": {
                            "line": 1,
                            "column": 24
                          }
                        },
                        "left": {
                          "type": "Literal",
                          "start": 15,
                          "end": 18,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 15
                            },
                            "end": {
                              "line": 1,
                              "column": 18
                            }
                          },
                          "value": "b",
                          "raw": "\"b\""
                        },
                        "operator": "in",
                        "right": {
                          "type": "Identifier",
                          "start": 23,
                          "end": 24,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 23
                            },
                            "end": {
                              "line": 1,
                              "column": 24
                            }
                          },
                          "name": "c"
                        }
                      }
                    },
                    {
                      "type": "VariableDeclarator",
                      "start": 27,
                      "end": 34,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 27
                        },
                        "end": {
                          "line": 1,
                          "column": 34
                        }
                      },
                      "id": {
                        "type": "Identifier",
                        "start": 27,
                        "end": 28,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 27
                          },
                          "end": {
                            "line": 1,
                            "column": 28
                          }
                        },
                        "name": "d"
                      },
                      "init": {
                        "type": "Literal",
                        "start": 32,
                        "end": 33,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 32
                          },
                          "end": {
                            "line": 1,
                            "column": 33
                          }
                        },
                        "value": 1,
                        "raw": "1"
                      }
                    }
                  ],
                  "kind": "var"
                },
                "test": {
                  "type": "BinaryExpression",
                  "start": 36,
                  "end": 43,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 36
                    },
                    "end": {
                      "line": 1,
                      "column": 43
                    }
                  },
                  "left": {
                    "type": "Identifier",
                    "start": 36,
                    "end": 37,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 36
                      },
                      "end": {
                        "line": 1,
                        "column": 37
                      }
                    },
                    "name": "d"
                  },
                  "operator": "<",
                  "right": {
                    "type": "Literal",
                    "start": 41,
                    "end": 42,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 41
                      },
                      "end": {
                        "line": 1,
                        "column": 42
                      }
                    },
                    "value": 2,
                    "raw": "2"
                  }
                },
                "update": {
                  "type": "UpdateExpression",
                  "start": 45,
                  "end": 48,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 45
                    },
                    "end": {
                      "line": 1,
                      "column": 48
                    }
                  },
                  "operator": "++",
                  "prefix": true,
                  "argument": {
                    "type": "Identifier",
                    "start": 47,
                    "end": 48,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 47
                      },
                      "end": {
                        "line": 1,
                        "column": 48
                      }
                    },
                    "name": "d"
                  }
                },
                "body": {
                  "type": "EmptyStatement",
                  "start": 50,
                  "end": 51,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 50
                    },
                    "end": {
                      "line": 1,
                      "column": 51
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });
    
    it('should parse "for(let.let in 1);"', () => {
        expect(parseScript(`for(let.let in 1);`, {
            ranges: true,
            raw: true,
            next: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 18,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 18
              }
            },
            "body": [
              {
                "type": "ForInStatement",
                "start": 0,
                "end": 18,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 18
                  }
                },
                "left": {
                  "type": "MemberExpression",
                  "start": 4,
                  "end": 11,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 4
                    },
                    "end": {
                      "line": 1,
                      "column": 11
                    }
                  },
                  "object": {
                    "type": "Identifier",
                    "start": 4,
                    "end": 7,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 4
                      },
                      "end": {
                        "line": 1,
                        "column": 7
                      }
                    },
                    "name": "let"
                  },
                  "property": {
                    "type": "Identifier",
                    "start": 8,
                    "end": 11,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 8
                      },
                      "end": {
                        "line": 1,
                        "column": 11
                      }
                    },
                    "name": "let"
                  },
                  "computed": false
                },
                "right": {
                  "type": "Literal",
                  "start": 15,
                  "end": 16,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 15
                    },
                    "end": {
                      "line": 1,
                      "column": 16
                    }
                  },
                  "value": 1,
                  "raw": "1"
                },
                "body": {
                  "type": "EmptyStatement",
                  "start": 17,
                  "end": 18,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 17
                    },
                    "end": {
                      "line": 1,
                      "column": 18
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "for (var a = ("b" in c), d = 1; d < 2; ++d);"', () => {
        expect(parseScript(`for (var a = ("b" in c), d = 1; d < 2; ++d);`, {
            ranges: true,
            raw: true,
            next: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 44,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 44
              }
            },
            "body": [
              {
                "type": "ForStatement",
                "start": 0,
                "end": 44,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 44
                  }
                },
                "init": {
                  "type": "VariableDeclaration",
                  "start": 5,
                  "end": 30,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 5
                    },
                    "end": {
                      "line": 1,
                      "column": 30
                    }
                  },
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
                      "start": 9,
                      "end": 23,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 9
                        },
                        "end": {
                          "line": 1,
                          "column": 23
                        }
                      },
                      "id": {
                        "type": "Identifier",
                        "start": 9,
                        "end": 10,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 9
                          },
                          "end": {
                            "line": 1,
                            "column": 10
                          }
                        },
                        "name": "a"
                      },
                      "init": {
                        "type": "BinaryExpression",
                        "start": 14,
                        "end": 22,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 14
                          },
                          "end": {
                            "line": 1,
                            "column": 22
                          }
                        },
                        "left": {
                          "type": "Literal",
                          "start": 14,
                          "end": 17,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 14
                            },
                            "end": {
                              "line": 1,
                              "column": 17
                            }
                          },
                          "value": "b",
                          "raw": "\"b\""
                        },
                        "operator": "in",
                        "right": {
                          "type": "Identifier",
                          "start": 21,
                          "end": 22,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 21
                            },
                            "end": {
                              "line": 1,
                              "column": 22
                            }
                          },
                          "name": "c"
                        }
                      }
                    },
                    {
                      "type": "VariableDeclarator",
                      "start": 25,
                      "end": 30,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 25
                        },
                        "end": {
                          "line": 1,
                          "column": 30
                        }
                      },
                      "id": {
                        "type": "Identifier",
                        "start": 25,
                        "end": 26,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 25
                          },
                          "end": {
                            "line": 1,
                            "column": 26
                          }
                        },
                        "name": "d"
                      },
                      "init": {
                        "type": "Literal",
                        "start": 29,
                        "end": 30,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 29
                          },
                          "end": {
                            "line": 1,
                            "column": 30
                          }
                        },
                        "value": 1,
                        "raw": "1"
                      }
                    }
                  ],
                  "kind": "var"
                },
                "test": {
                  "type": "BinaryExpression",
                  "start": 32,
                  "end": 37,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 32
                    },
                    "end": {
                      "line": 1,
                      "column": 37
                    }
                  },
                  "left": {
                    "type": "Identifier",
                    "start": 32,
                    "end": 33,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 32
                      },
                      "end": {
                        "line": 1,
                        "column": 33
                      }
                    },
                    "name": "d"
                  },
                  "operator": "<",
                  "right": {
                    "type": "Literal",
                    "start": 36,
                    "end": 37,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 36
                      },
                      "end": {
                        "line": 1,
                        "column": 37
                      }
                    },
                    "value": 2,
                    "raw": "2"
                  }
                },
                "update": {
                  "type": "UpdateExpression",
                  "start": 39,
                  "end": 42,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 39
                    },
                    "end": {
                      "line": 1,
                      "column": 42
                    }
                  },
                  "operator": "++",
                  "prefix": true,
                  "argument": {
                    "type": "Identifier",
                    "start": 41,
                    "end": 42,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 41
                      },
                      "end": {
                        "line": 1,
                        "column": 42
                      }
                    },
                    "name": "d"
                  }
                },
                "body": {
                  "type": "EmptyStatement",
                  "start": 43,
                  "end": 44,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 43
                    },
                    "end": {
                      "line": 1,
                      "column": 44
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "for ((a(b in c))[1] in d) ;"', () => {
        expect(parseScript(`for ((a(b in c))[1] in d) ;`, {
            ranges: true,
            raw: true,
            next: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 27,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 27
              }
            },
            "body": [
              {
                "type": "ForInStatement",
                "start": 0,
                "end": 27,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 27
                  }
                },
                "left": {
                  "type": "MemberExpression",
                  "start": 5,
                  "end": 19,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 5
                    },
                    "end": {
                      "line": 1,
                      "column": 19
                    }
                  },
                  "object": {
                    "type": "CallExpression",
                    "start": 6,
                    "end": 15,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 15
                      }
                    },
                    "callee": {
                      "type": "Identifier",
                      "start": 6,
                      "end": 7,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 6
                        },
                        "end": {
                          "line": 1,
                          "column": 7
                        }
                      },
                      "name": "a"
                    },
                    "arguments": [
                      {
                        "type": "BinaryExpression",
                        "start": 8,
                        "end": 14,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 8
                          },
                          "end": {
                            "line": 1,
                            "column": 14
                          }
                        },
                        "left": {
                          "type": "Identifier",
                          "start": 8,
                          "end": 9,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 8
                            },
                            "end": {
                              "line": 1,
                              "column": 9
                            }
                          },
                          "name": "b"
                        },
                        "operator": "in",
                        "right": {
                          "type": "Identifier",
                          "start": 13,
                          "end": 14,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 13
                            },
                            "end": {
                              "line": 1,
                              "column": 14
                            }
                          },
                          "name": "c"
                        }
                      }
                    ]
                  },
                  "property": {
                    "type": "Literal",
                    "start": 17,
                    "end": 18,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 17
                      },
                      "end": {
                        "line": 1,
                        "column": 18
                      }
                    },
                    "value": 1,
                    "raw": "1"
                  },
                  "computed": true
                },
                "right": {
                  "type": "Identifier",
                  "start": 23,
                  "end": 24,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 23
                    },
                    "end": {
                      "line": 1,
                      "column": 24
                    }
                  },
                  "name": "d"
                },
                "body": {
                  "type": "EmptyStatement",
                  "start": 26,
                  "end": 27,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 26
                    },
                    "end": {
                      "line": 1,
                      "column": 27
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });
   
    it('should parse "for (var i = "" in { a: 10, b: 20 }) {}" in sloppy mode only', () => {
        expect(parseScript(`for (var i = "" in { a: 10, b: 20 }) {}`, {
            ranges: true,
            raw: true,
            next: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 39,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 39
              }
            },
            "body": [
              {
                "type": "ForInStatement",
                "start": 0,
                "end": 39,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 39
                  }
                },
                "left": {
                  "type": "VariableDeclaration",
                  "start": 5,
                  "end": 15,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 5
                    },
                    "end": {
                      "line": 1,
                      "column": 15
                    }
                  },
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
                      "start": 9,
                      "end": 15,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 9
                        },
                        "end": {
                          "line": 1,
                          "column": 15
                        }
                      },
                      "id": {
                        "type": "Identifier",
                        "start": 9,
                        "end": 10,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 9
                          },
                          "end": {
                            "line": 1,
                            "column": 10
                          }
                        },
                        "name": "i"
                      },
                      "init": {
                        "type": "Literal",
                        "start": 13,
                        "end": 15,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 13
                          },
                          "end": {
                            "line": 1,
                            "column": 15
                          }
                        },
                        "value": "",
                        "raw": "\"\""
                      }
                    }
                  ],
                  "kind": "var"
                },
                "right": {
                  "type": "ObjectExpression",
                  "start": 19,
                  "end": 35,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 19
                    },
                    "end": {
                      "line": 1,
                      "column": 35
                    }
                  },
                  "properties": [
                    {
                      "type": "Property",
                      "start": 21,
                      "end": 26,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 21
                        },
                        "end": {
                          "line": 1,
                          "column": 26
                        }
                      },
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 21,
                        "end": 22,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 21
                          },
                          "end": {
                            "line": 1,
                            "column": 22
                          }
                        },
                        "name": "a"
                      },
                      "value": {
                        "type": "Literal",
                        "start": 24,
                        "end": 26,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 24
                          },
                          "end": {
                            "line": 1,
                            "column": 26
                          }
                        },
                        "value": 10,
                        "raw": "10"
                      },
                      "kind": "init"
                    },
                    {
                      "type": "Property",
                      "start": 28,
                      "end": 33,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 28
                        },
                        "end": {
                          "line": 1,
                          "column": 33
                        }
                      },
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 28,
                        "end": 29,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 28
                          },
                          "end": {
                            "line": 1,
                            "column": 29
                          }
                        },
                        "name": "b"
                      },
                      "value": {
                        "type": "Literal",
                        "start": 31,
                        "end": 33,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 31
                          },
                          "end": {
                            "line": 1,
                            "column": 33
                          }
                        },
                        "value": 20,
                        "raw": "20"
                      },
                      "kind": "init"
                    }
                  ]
                },
                "body": {
                  "type": "BlockStatement",
                  "start": 37,
                  "end": 39,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 37
                    },
                    "end": {
                      "line": 1,
                      "column": 39
                    }
                  },
                  "body": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "for (var a = 0 in {});" in sloppy mode only', () => {
        expect(parseScript(`for (var a = 0 in {});`, {
            ranges: true,
            raw: true,
            next: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 22,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 22
              }
            },
            "body": [
              {
                "type": "ForInStatement",
                "start": 0,
                "end": 22,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 22
                  }
                },
                "left": {
                  "type": "VariableDeclaration",
                  "start": 5,
                  "end": 14,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 5
                    },
                    "end": {
                      "line": 1,
                      "column": 14
                    }
                  },
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
                      "start": 9,
                      "end": 14,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 9
                        },
                        "end": {
                          "line": 1,
                          "column": 14
                        }
                      },
                      "id": {
                        "type": "Identifier",
                        "start": 9,
                        "end": 10,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 9
                          },
                          "end": {
                            "line": 1,
                            "column": 10
                          }
                        },
                        "name": "a"
                      },
                      "init": {
                        "type": "Literal",
                        "start": 13,
                        "end": 14,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 13
                          },
                          "end": {
                            "line": 1,
                            "column": 14
                          }
                        },
                        "value": 0,
                        "raw": "0"
                      }
                    }
                  ],
                  "kind": "var"
                },
                "right": {
                  "type": "ObjectExpression",
                  "start": 18,
                  "end": 20,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 18
                    },
                    "end": {
                      "line": 1,
                      "column": 20
                    }
                  },
                  "properties": []
                },
                "body": {
                  "type": "EmptyStatement",
                  "start": 21,
                  "end": 22,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 21
                    },
                    "end": {
                      "line": 1,
                      "column": 22
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse head declaration expression', () => {
        expect(parseScript(`for (let x in null, { key: 0 }) {}`, {
            ranges: true,
            next: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ForInStatement",
                    "body": {
                        "type": "BlockStatement",
                        "body": [],
                        "start": 32,
                        "end": 34,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 32
                            },
                            "end": {
                                "line": 1,
                                "column": 34
                            }
                        }
                    },
                    "left": {
                        "type": "VariableDeclaration",
                        "declarations": [
                            {
                                "type": "VariableDeclarator",
                                "init": null,
                                "id": {
                                    "type": "Identifier",
                                    "name": "x",
                                    "start": 9,
                                    "end": 10,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 9
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 10
                                        }
                                    }
                                },
                                "start": 9,
                                "end": 10,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 9
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 10
                                    }
                                }
                            }
                        ],
                        "kind": "let",
                        "start": 5,
                        "end": 10,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 5
                            },
                            "end": {
                                "line": 1,
                                "column": 10
                            }
                        }
                    },
                    "right": {
                        "type": "SequenceExpression",
                        "expressions": [
                            {
                                "type": "Literal",
                                "value": null,
                                "start": 14,
                                "end": 18,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 14
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 18
                                    }
                                }
                            },
                            {
                                "type": "ObjectExpression",
                                "properties": [
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "key",
                                            "start": 22,
                                            "end": 25,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 22
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 25
                                                }
                                            }
                                        },
                                        "value": {
                                            "type": "Literal",
                                            "value": 0,
                                            "start": 27,
                                            "end": 28,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 27
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 28
                                                }
                                            }
                                        },
                                        "kind": "init",
                                        "computed": false,
                                        "method": false,
                                        "shorthand": false,
                                        "start": 22,
                                        "end": 28,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 22
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 28
                                            }
                                        }
                                    }
                                ],
                                "start": 20,
                                "end": 30,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 20
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 30
                                    }
                                }
                            }
                        ],
                        "start": 0,
                        "end": 30,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 30
                            }
                        }
                    },
                    "start": 0,
                    "end": 34,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 34
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 34,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 34
                }
            }
        });
    });

    it('should parse "for (var [name, value] in obj) {}"', () => {
        expect(parseScript(`for (var [name, value] in obj) {}`, {
            ranges: true,
            raw: true,
            next: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 33,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 33
              }
            },
            "body": [
              {
                "type": "ForInStatement",
                "start": 0,
                "end": 33,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 33
                  }
                },
                "left": {
                  "type": "VariableDeclaration",
                  "start": 5,
                  "end": 22,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 5
                    },
                    "end": {
                      "line": 1,
                      "column": 22
                    }
                  },
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
                      "start": 9,
                      "end": 22,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 9
                        },
                        "end": {
                          "line": 1,
                          "column": 22
                        }
                      },
                      "id": {
                        "type": "ArrayPattern",
                        "start": 9,
                        "end": 22,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 9
                          },
                          "end": {
                            "line": 1,
                            "column": 22
                          }
                        },
                        "elements": [
                          {
                            "type": "Identifier",
                            "start": 10,
                            "end": 14,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 10
                              },
                              "end": {
                                "line": 1,
                                "column": 14
                              }
                            },
                            "name": "name"
                          },
                          {
                            "type": "Identifier",
                            "start": 16,
                            "end": 21,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 16
                              },
                              "end": {
                                "line": 1,
                                "column": 21
                              }
                            },
                            "name": "value"
                          }
                        ]
                      },
                      "init": null
                    }
                  ],
                  "kind": "var"
                },
                "right": {
                  "type": "Identifier",
                  "start": 26,
                  "end": 29,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 26
                    },
                    "end": {
                      "line": 1,
                      "column": 29
                    }
                  },
                  "name": "obj"
                },
                "body": {
                  "type": "BlockStatement",
                  "start": 31,
                  "end": 33,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 31
                    },
                    "end": {
                      "line": 1,
                      "column": 33
                    }
                  },
                  "body": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "for ((x) in { attr: null }) {}"', () => {
        expect(parseScript(`for ((x) in { attr: null }) {}`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 30,
            "body": [{
                "type": "ForInStatement",
                "start": 0,
                "end": 30,
                "left": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "x"
                },
                "right": {
                    "type": "ObjectExpression",
                    "start": 12,
                    "end": 26,
                    "properties": [{
                        "type": "Property",
                        "start": 14,
                        "end": 24,
                        "method": false,
                        "shorthand": false,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 14,
                            "end": 18,
                            "name": "attr"
                        },
                        "value": {
                            "type": "Literal",
                            "start": 20,
                            "end": 24,
                            "value": null,
                            "raw": "null"
                        },
                        "kind": "init"
                    }]
                },
                "body": {
                    "type": "BlockStatement",
                    "start": 28,
                    "end": 30,
                    "body": []
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse expression', () => {
        expect(parseScript(`for (x in null, { key: 0 }) {}`, {
            ranges: true,
            raw: true,
            next: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ForInStatement",
                    "body": {
                        "type": "BlockStatement",
                        "body": [],
                        "start": 28,
                        "end": 30,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 28
                            },
                            "end": {
                                "line": 1,
                                "column": 30
                            }
                        }
                    },
                    "left": {
                        "type": "Identifier",
                        "name": "x",
                        "start": 5,
                        "end": 6,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 5
                            },
                            "end": {
                                "line": 1,
                                "column": 6
                            }
                        }
                    },
                    "right": {
                        "type": "SequenceExpression",
                        "expressions": [
                            {
                                "type": "Literal",
                                "value": null,
                                "start": 10,
                                "end": 14,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 10
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 14
                                    }
                                },
                                "raw": "null"
                            },
                            {
                                "type": "ObjectExpression",
                                "properties": [
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "key",
                                            "start": 18,
                                            "end": 21,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 18
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 21
                                                }
                                            }
                                        },
                                        "value": {
                                            "type": "Literal",
                                            "value": 0,
                                            "start": 23,
                                            "end": 24,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 23
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 24
                                                }
                                            },
                                            "raw": "0"
                                        },
                                        "kind": "init",
                                        "computed": false,
                                        "method": false,
                                        "shorthand": false,
                                        "start": 18,
                                        "end": 24,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 18
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 24
                                            }
                                        }
                                    }
                                ],
                                "start": 16,
                                "end": 26,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 16
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 26
                                    }
                                }
                            }
                        ],
                        "start": 0,
                        "end": 26,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 26
                            }
                        }
                    },
                    "start": 0,
                    "end": 30,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 30
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 30,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 30
                }
            }
        });
    });

    it('should parse "for(var a in b, c);"', () => {
        expect(parseScript(`for(var a in b, c);`, {
            ranges: true,
            raw: true,
            next: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ForInStatement",
                    "body": {
                        "type": "EmptyStatement",
                        "start": 18,
                        "end": 19,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 18
                            },
                            "end": {
                                "line": 1,
                                "column": 19
                            }
                        }
                    },
                    "left": {
                        "type": "VariableDeclaration",
                        "declarations": [
                            {
                                "type": "VariableDeclarator",
                                "init": null,
                                "id": {
                                    "type": "Identifier",
                                    "name": "a",
                                    "start": 8,
                                    "end": 9,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 8
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 9
                                        }
                                    }
                                },
                                "start": 8,
                                "end": 9,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 8
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 9
                                    }
                                }
                            }
                        ],
                        "kind": "var",
                        "start": 4,
                        "end": 9,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
                            },
                            "end": {
                                "line": 1,
                                "column": 9
                            }
                        }
                    },
                    "right": {
                        "type": "SequenceExpression",
                        "expressions": [
                            {
                                "type": "Identifier",
                                "name": "b",
                                "start": 13,
                                "end": 14,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 13
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 14
                                    }
                                }
                            },
                            {
                                "type": "Identifier",
                                "name": "c",
                                "start": 16,
                                "end": 17,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 16
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 17
                                    }
                                }
                            }
                        ],
                        "start": 0,
                        "end": 17,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 17
                            }
                        }
                    },
                    "start": 0,
                    "end": 19,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 19
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 19,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 19
                }
            }
        });
    });

    it('should parse "for(a in b, c);"', () => {
        expect(parseScript(`for(a in b, c);`, {
            ranges: true,
            raw: true,
            next: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ForInStatement",
                    "body": {
                        "type": "EmptyStatement",
                        "start": 14,
                        "end": 15,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 14
                            },
                            "end": {
                                "line": 1,
                                "column": 15
                            }
                        }
                    },
                    "left": {
                        "type": "Identifier",
                        "name": "a",
                        "start": 4,
                        "end": 5,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
                            },
                            "end": {
                                "line": 1,
                                "column": 5
                            }
                        }
                    },
                    "right": {
                        "type": "SequenceExpression",
                        "expressions": [
                            {
                                "type": "Identifier",
                                "name": "b",
                                "start": 9,
                                "end": 10,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 9
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 10
                                    }
                                }
                            },
                            {
                                "type": "Identifier",
                                "name": "c",
                                "start": 12,
                                "end": 13,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 13
                                    }
                                }
                            }
                        ],
                        "start": 0,
                        "end": 13,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 13
                            }
                        }
                    },
                    "start": 0,
                    "end": 15,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 15
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 15,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 15
                }
            }
        });
    });

    it('should parse "for (() => { this in null };;);"', () => {
        expect(parseScript(`for (() => { this in null };;);`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 31,
            "body": [{
                "type": "ForStatement",
                "start": 0,
                "end": 31,
                "init": {
                    "type": "ArrowFunctionExpression",
                    "start": 5,
                    "end": 27,
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "start": 11,
                        "end": 27,
                        "body": [{
                            "type": "ExpressionStatement",
                            "start": 13,
                            "end": 25,
                            "expression": {
                                "type": "BinaryExpression",
                                "start": 13,
                                "end": 25,
                                "left": {
                                    "type": "ThisExpression",
                                    "start": 13,
                                    "end": 17
                                },
                                "operator": "in",
                                "right": {
                                    "type": "Literal",
                                    "start": 21,
                                    "end": 25,
                                    "value": null,
                                    "raw": "null"
                                }
                            }
                        }]
                    }
                },
                "test": null,
                "update": null,
                "body": {
                    "type": "EmptyStatement",
                    "start": 30,
                    "end": 31
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "for(a in b);"', () => {
        expect(parseScript(`for(a in b);`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 12,
            "body": [{
                "type": "ForInStatement",
                "start": 0,
                "end": 12,
                "left": {
                    "type": "Identifier",
                    "start": 4,
                    "end": 5,
                    "name": "a"
                },
                "right": {
                    "type": "Identifier",
                    "start": 9,
                    "end": 10,
                    "name": "b"
                },
                "body": {
                    "type": "EmptyStatement",
                    "start": 11,
                    "end": 12
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse "for(a.b in c);"', () => {
        expect(parseScript(`for(a.b in c);`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 14,
            "body": [{
                "type": "ForInStatement",
                "start": 0,
                "end": 14,
                "left": {
                    "type": "MemberExpression",
                    "start": 4,
                    "end": 7,
                    "object": {
                        "type": "Identifier",
                        "start": 4,
                        "end": 5,
                        "name": "a"
                    },
                    "property": {
                        "type": "Identifier",
                        "start": 6,
                        "end": 7,
                        "name": "b"
                    },
                    "computed": false
                },
                "right": {
                    "type": "Identifier",
                    "start": 11,
                    "end": 12,
                    "name": "c"
                },
                "body": {
                    "type": "EmptyStatement",
                    "start": 13,
                    "end": 14
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse "for(let of in of);"', () => {
        expect(parseScript(`for(let of in of);`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 18,
            "body": [{
                "type": "ForInStatement",
                "start": 0,
                "end": 18,
                "left": {
                    "type": "VariableDeclaration",
                    "start": 4,
                    "end": 10,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 8,
                        "end": 10,
                        "id": {
                            "type": "Identifier",
                            "start": 8,
                            "end": 10,
                            "name": "of"
                        },
                        "init": null
                    }],
                    "kind": "let"
                },
                "right": {
                    "type": "Identifier",
                    "start": 14,
                    "end": 16,
                    "name": "of"
                },
                "body": {
                    "type": "EmptyStatement",
                    "start": 17,
                    "end": 18
                }
            }],
            "sourceType": "script"
        });
    });



    it('should parse "for(const a in b);"', () => {
        expect(parseScript(`for(const a in b);`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 18,
            "body": [{
                "type": "ForInStatement",
                "start": 0,
                "end": 18,
                "left": {
                    "type": "VariableDeclaration",
                    "start": 4,
                    "end": 11,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 10,
                        "end": 11,
                        "id": {
                            "type": "Identifier",
                            "start": 10,
                            "end": 11,
                            "name": "a"
                        },
                        "init": null
                    }],
                    "kind": "const"
                },
                "right": {
                    "type": "Identifier",
                    "start": 15,
                    "end": 16,
                    "name": "b"
                },
                "body": {
                    "type": "EmptyStatement",
                    "start": 17,
                    "end": 18
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse "for({a=0} in b);"', () => {
        expect(parseScript(`for({a=0} in b);`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 16,
            "body": [{
                "type": "ForInStatement",
                "start": 0,
                "end": 16,
                "left": {
                    "type": "ObjectPattern",
                    "start": 4,
                    "end": 9,
                    "properties": [{
                        "type": "Property",
                        "start": 5,
                        "end": 8,
                        "method": false,
                        "shorthand": true,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 5,
                            "end": 6,
                            "name": "a"
                        },
                        "kind": "init",
                        "value": {
                            "type": "AssignmentPattern",
                            "start": 5,
                            "end": 8,
                            "left": {
                                "type": "Identifier",
                                "start": 5,
                                "end": 6,
                                "name": "a"
                            },
                            "right": {
                                "type": "Literal",
                                "start": 7,
                                "end": 8,
                                "value": 0,
                                "raw": "0"
                            }
                        }
                    }]
                },
                "right": {
                    "type": "Identifier",
                    "start": 13,
                    "end": 14,
                    "name": "b"
                },
                "body": {
                    "type": "EmptyStatement",
                    "start": 15,
                    "end": 16
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "for(()=>{a in b};;);"', () => {
        expect(parseScript(`for(()=>{a in b};;);`)).to.eql({
        "body": [
          {
            "body": {
              "type": "EmptyStatement"
           },
            "init": {
              "async": false,
              "body": {
                "body": [
                  {
                    "expression": {
                      "left": {
                        "name": "a",
                        "type": "Identifier"
                      },
                      "operator": "in",
                     "right": {
                        "name": "b",
                        "type": "Identifier"
                      },
                      "type": "BinaryExpression"
                    },
                    "type": "ExpressionStatement"
                  }
                ],
                "type": "BlockStatement"
              },
              "expression": false,
              "generator": false,
              "id": null,
              "params": [],
              "type": "ArrowFunctionExpression"
           },
            "test": null,
            "type": "ForStatement",
            "update": null,
          }
        ],
        "sourceType": "script",
        "type": "Program"
      });
    });

    it('should parse "for(let of of b);"', () => {
        expect(parseScript(`for(let of of b);`)).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ForOfStatement",
                    "await": false,
                    "left": {
                        "type": "VariableDeclaration",
                        "declarations": [
                            {
                                "type": "VariableDeclarator",
                                "id": {
                                    "type": "Identifier",
                                    "name": "of"
                                },
                                "init": null
                            }
                        ],
                        "kind": "let"
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "b"
                    },
                    "body": {
                        "type": "EmptyStatement"
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "for([{a=0}] in b);"', () => {
        expect(parseScript(`for([{a=0}] in b);`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 18,
            "body": [{
                "type": "ForInStatement",
                "start": 0,
                "end": 18,
                "left": {
                    "type": "ArrayPattern",
                    "start": 4,
                    "end": 11,
                    "elements": [{
                        "type": "ObjectPattern",
                        "start": 5,
                        "end": 10,
                        "properties": [{
                            "type": "Property",
                            "start": 6,
                            "end": 9,
                            "method": false,
                            "shorthand": true,
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "start": 6,
                                "end": 7,
                                "name": "a"
                            },
                            "kind": "init",
                            "value": {
                                "type": "AssignmentPattern",
                                "start": 6,
                                "end": 9,
                                "left": {
                                    "type": "Identifier",
                                    "start": 6,
                                    "end": 7,
                                    "name": "a"
                                },
                                "right": {
                                    "type": "Literal",
                                    "start": 8,
                                    "end": 9,
                                    "value": 0,
                                    "raw": "0"
                                }
                            }
                        }]
                    }]
                },
                "right": {
                    "type": "Identifier",
                    "start": 15,
                    "end": 16,
                    "name": "b"
                },
                "body": {
                    "type": "EmptyStatement",
                    "start": 17,
                    "end": 18
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "for(let [a=b in c] in null);"', () => {
        expect(parseScript(`for(let [a=b in c] in null);`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 28,
            "body": [{
                "type": "ForInStatement",
                "start": 0,
                "end": 28,
                "left": {
                    "type": "VariableDeclaration",
                    "start": 4,
                    "end": 18,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 8,
                        "end": 18,
                        "id": {
                            "type": "ArrayPattern",
                            "start": 8,
                            "end": 18,
                            "elements": [{
                                "type": "AssignmentPattern",
                                "start": 9,
                                "end": 17,
                                "left": {
                                    "type": "Identifier",
                                    "start": 9,
                                    "end": 10,
                                    "name": "a"
                                },
                                "right": {
                                    "type": "BinaryExpression",
                                    "start": 11,
                                    "end": 17,
                                    "left": {
                                        "type": "Identifier",
                                        "start": 11,
                                        "end": 12,
                                        "name": "b"
                                    },
                                    "operator": "in",
                                    "right": {
                                        "type": "Identifier",
                                        "start": 16,
                                        "end": 17,
                                        "name": "c"
                                    }
                                }
                            }]
                        },
                        "init": null
                    }],
                    "kind": "let"
                },
                "right": {
                    "type": "Literal",
                    "start": 22,
                    "end": 26,
                    "value": null,
                    "raw": "null"
                },
                "body": {
                    "type": "EmptyStatement",
                    "start": 27,
                    "end": 28
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse let identifier with newline', () => {
        expect(parseScript(`for (var x in null) let // ASI
  x = 1;`, {
            ranges: false,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [{
                    "type": "ForInStatement",
                    "left": {
                        "type": "VariableDeclaration",
                        "declarations": [{
                            "type": "VariableDeclarator",
                            "id": {
                                "type": "Identifier",
                                "name": "x"
                            },
                            "init": null
                        }],
                        "kind": "var"
                    },
                    "right": {
                        "type": "Literal",
                        "value": null,
                        "raw": "null"
                    },
                    "body": {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "Identifier",
                            "name": "let"
                        }
                    }
                },
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "right": {
                            "type": "Literal",
                            "value": 1,
                            "raw": "1"
                        }
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse let block with newline', () => {
        expect(parseScript(`for (var x in null) let // ASI
  {}`, {
            ranges: false,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [{
                    "type": "ForInStatement",
                    "left": {
                        "type": "VariableDeclaration",
                        "declarations": [{
                            "type": "VariableDeclarator",
                            "id": {
                                "type": "Identifier",
                                "name": "x"
                            },
                            "init": null
                        }],
                        "kind": "var"
                    },
                    "right": {
                        "type": "Literal",
                        "value": null,
                        "raw": "null"
                    },
                    "body": {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "Identifier",
                            "name": "let"
                        }
                    }
                },
                {
                    "type": "BlockStatement",
                    "body": []
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse expression in head', () => {
        expect(parseScript(`for (x in null, { key: 0 }) {}`, {
            ranges: true,
            raw: true,
            next: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ForInStatement",
                    "body": {
                        "type": "BlockStatement",
                        "body": [],
                        "start": 28,
                        "end": 30,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 28
                            },
                            "end": {
                                "line": 1,
                                "column": 30
                            }
                        }
                    },
                    "left": {
                        "type": "Identifier",
                        "name": "x",
                        "start": 5,
                        "end": 6,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 5
                            },
                            "end": {
                                "line": 1,
                                "column": 6
                            }
                        }
                    },
                    "right": {
                        "type": "SequenceExpression",
                        "expressions": [
                            {
                                "type": "Literal",
                                "value": null,
                                "start": 10,
                                "end": 14,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 10
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 14
                                    }
                                },
                                "raw": "null"
                            },
                            {
                                "type": "ObjectExpression",
                                "properties": [
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "key",
                                            "start": 18,
                                            "end": 21,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 18
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 21
                                                }
                                            }
                                        },
                                        "value": {
                                            "type": "Literal",
                                            "value": 0,
                                            "start": 23,
                                            "end": 24,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 23
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 24
                                                }
                                            },
                                            "raw": "0"
                                        },
                                        "kind": "init",
                                        "computed": false,
                                        "method": false,
                                        "shorthand": false,
                                        "start": 18,
                                        "end": 24,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 18
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 24
                                            }
                                        }
                                    }
                                ],
                                "start": 16,
                                "end": 26,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 16
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 26
                                    }
                                }
                            }
                        ],
                        "start": 0,
                        "end": 26,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 26
                            }
                        }
                    },
                    "start": 0,
                    "end": 30,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 30
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 30,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 30
                }
            }
        });
    });

    it('should parse "for (x.y in { attr: null }) {}"', () => {
        expect(parseScript(`for (x.y in { attr: null }) {}`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ForInStatement",
                    "body": {
                        "type": "BlockStatement",
                        "body": [],
                        "start": 28,
                        "end": 30
                    },
                    "left": {
                        "type": "MemberExpression",
                        "object": {
                            "type": "Identifier",
                            "name": "x",
                            "start": 5,
                            "end": 6
                        },
                        "computed": false,
                        "property": {
                            "type": "Identifier",
                            "name": "y",
                            "start": 7,
                            "end": 8
                        },
                        "start": 5,
                        "end": 8
                    },
                    "right": {
                        "type": "ObjectExpression",
                        "properties": [
                            {
                                "type": "Property",
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "name": "attr",
                                    "start": 14,
                                    "end": 18
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false,
                                "value": {
                                    "type": "Literal",
                                    "value": null,
                                    "start": 20,
                                    "end": 24,
                                    "raw": "null"
                                },
                                "start": 14,
                                "end": 24
                            }
                        ],
                        "start": 12,
                        "end": 26
                    },
                    "start": 0,
                    "end": 30
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 30
        });
    });

    it('should parse "for(let [a=b in c] in null);"', () => {
        expect(parseScript(`for (
            let [_ = probeDecl = function() { return x; }]
            in
            { '': probeExpr = function() { return x; }}
          )
          var x = 2, __ = probeBody = function() { return x; };`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 211,
            "body": [
              {
                "type": "ForInStatement",
                "start": 0,
                "end": 211,
                "left": {
                  "type": "VariableDeclaration",
                  "start": 18,
                  "end": 64,
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
                      "start": 22,
                      "end": 64,
                      "id": {
                        "type": "ArrayPattern",
                        "start": 22,
                        "end": 64,
                        "elements": [
                          {
                            "type": "AssignmentPattern",
                            "start": 23,
                            "end": 63,
                            "left": {
                              "type": "Identifier",
                              "start": 23,
                              "end": 24,
                              "name": "_"
                            },
                            "right": {
                              "type": "AssignmentExpression",
                              "start": 27,
                              "end": 63,
                              "operator": "=",
                              "left": {
                                "type": "Identifier",
                                "start": 27,
                                "end": 36,
                                "name": "probeDecl"
                              },
                              "right": {
                                "type": "FunctionExpression",
                                "start": 39,
                                "end": 63,
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                  "type": "BlockStatement",
                                  "start": 50,
                                  "end": 63,
                                  "body": [
                                    {
                                      "type": "ReturnStatement",
                                      "start": 52,
                                      "end": 61,
                                      "argument": {
                                        "type": "Identifier",
                                        "start": 59,
                                        "end": 60,
                                        "name": "x"
                                      }
                                    }
                                  ]
                                }
                              }
                            }
                          }
                        ]
                      },
                      "init": null
                    }
                  ],
                  "kind": "let"
                },
                "right": {
                  "type": "ObjectExpression",
                  "start": 92,
                  "end": 135,
                  "properties": [
                    {
                      "type": "Property",
                      "start": 94,
                      "end": 134,
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Literal",
                        "start": 94,
                        "end": 96,
                        "value": "",
                        "raw": "''"
                      },
                      "value": {
                        "type": "AssignmentExpression",
                        "start": 98,
                        "end": 134,
                        "operator": "=",
                        "left": {
                          "type": "Identifier",
                          "start": 98,
                          "end": 107,
                          "name": "probeExpr"
                        },
                        "right": {
                          "type": "FunctionExpression",
                          "start": 110,
                          "end": 134,
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [],
                          "body": {
                            "type": "BlockStatement",
                            "start": 121,
                            "end": 134,
                            "body": [
                              {
                                "type": "ReturnStatement",
                                "start": 123,
                                "end": 132,
                                "argument": {
                                  "type": "Identifier",
                                  "start": 130,
                                  "end": 131,
                                  "name": "x"
                                }
                              }
                            ]
                          }
                        }
                      },
                      "kind": "init"
                    }
                  ]
                },
                "body": {
                  "type": "VariableDeclaration",
                  "start": 158,
                  "end": 211,
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
                      "start": 162,
                      "end": 167,
                      "id": {
                        "type": "Identifier",
                        "start": 162,
                        "end": 163,
                        "name": "x"
                      },
                      "init": {
                        "type": "Literal",
                        "start": 166,
                        "end": 167,
                        "value": 2,
                        "raw": "2"
                      }
                    },
                    {
                      "type": "VariableDeclarator",
                      "start": 169,
                      "end": 210,
                      "id": {
                        "type": "Identifier",
                        "start": 169,
                        "end": 171,
                        "name": "__"
                      },
                      "init": {
                        "type": "AssignmentExpression",
                        "start": 174,
                        "end": 210,
                        "operator": "=",
                        "left": {
                          "type": "Identifier",
                          "start": 174,
                          "end": 183,
                          "name": "probeBody"
                        },
                        "right": {
                          "type": "FunctionExpression",
                          "start": 186,
                          "end": 210,
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [],
                          "body": {
                            "type": "BlockStatement",
                            "start": 197,
                            "end": 210,
                            "body": [
                              {
                                "type": "ReturnStatement",
                                "start": 199,
                                "end": 208,
                                "argument": {
                                  "type": "Identifier",
                                  "start": 206,
                                  "end": 207,
                                  "name": "x"
                                }
                              }
                            ]
                          }
                        }
                      }
                    }
                  ],
                  "kind": "var"
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse let destructuring', () => {
        expect(parseScript(`for ( let[x] in obj ) {}`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 24,
            "body": [
              {
                "type": "ForInStatement",
                "start": 0,
                "end": 24,
                "left": {
                  "type": "VariableDeclaration",
                  "start": 6,
                  "end": 12,
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
                      "start": 9,
                      "end": 12,
                      "id": {
                        "type": "ArrayPattern",
                        "start": 9,
                        "end": 12,
                        "elements": [
                          {
                            "type": "Identifier",
                            "start": 10,
                            "end": 11,
                            "name": "x"
                          }
                        ]
                      },
                      "init": null
                    }
                  ],
                  "kind": "let"
                },
                "right": {
                  "type": "Identifier",
                  "start": 16,
                  "end": 19,
                  "name": "obj"
                },
                "body": {
                  "type": "BlockStatement",
                  "start": 22,
                  "end": 24,
                  "body": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "for(x in list) process(x);"', () => {
        expect(parseScript(`for(x in list) process(x);`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 26,
            "body": [
              {
                "type": "ForInStatement",
                "start": 0,
                "end": 26,
                "left": {
                  "type": "Identifier",
                  "start": 4,
                  "end": 5,
                  "name": "x"
                },
                "right": {
                  "type": "Identifier",
                  "start": 9,
                  "end": 13,
                  "name": "list"
                },
                "body": {
                  "type": "ExpressionStatement",
                  "start": 15,
                  "end": 26,
                  "expression": {
                    "type": "CallExpression",
                    "start": 15,
                    "end": 25,
                    "callee": {
                      "type": "Identifier",
                      "start": 15,
                      "end": 22,
                      "name": "process"
                    },
                    "arguments": [
                      {
                        "type": "Identifier",
                        "start": 23,
                        "end": 24,
                        "name": "x"
                      }
                    ]
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "for (var x in list) process(x);"', () => {
        expect(parseScript(`for (var x in list) process(x);`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 31,
            "body": [
              {
                "type": "ForInStatement",
                "start": 0,
                "end": 31,
                "left": {
                  "type": "VariableDeclaration",
                  "start": 5,
                  "end": 10,
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
                      "start": 9,
                      "end": 10,
                      "id": {
                        "type": "Identifier",
                        "start": 9,
                        "end": 10,
                        "name": "x"
                      },
                      "init": null
                    }
                  ],
                  "kind": "var"
                },
                "right": {
                  "type": "Identifier",
                  "start": 14,
                  "end": 18,
                  "name": "list"
                },
                "body": {
                  "type": "ExpressionStatement",
                  "start": 20,
                  "end": 31,
                  "expression": {
                    "type": "CallExpression",
                    "start": 20,
                    "end": 30,
                    "callee": {
                      "type": "Identifier",
                      "start": 20,
                      "end": 27,
                      "name": "process"
                    },
                    "arguments": [
                      {
                        "type": "Identifier",
                        "start": 28,
                        "end": 29,
                        "name": "x"
                      }
                    ]
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "for (let x in list) process(x);"', () => {
        expect(parseScript(`for (let x in list) process(x);`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 31,
            "body": [
              {
                "type": "ForInStatement",
                "start": 0,
                "end": 31,
                "left": {
                  "type": "VariableDeclaration",
                  "start": 5,
                  "end": 10,
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
                      "start": 9,
                      "end": 10,
                      "id": {
                        "type": "Identifier",
                        "start": 9,
                        "end": 10,
                        "name": "x"
                      },
                      "init": null
                    }
                  ],
                  "kind": "let"
                },
                "right": {
                  "type": "Identifier",
                  "start": 14,
                  "end": 18,
                  "name": "list"
                },
                "body": {
                  "type": "ExpressionStatement",
                  "start": 20,
                  "end": 31,
                  "expression": {
                    "type": "CallExpression",
                    "start": 20,
                    "end": 30,
                    "callee": {
                      "type": "Identifier",
                      "start": 20,
                      "end": 27,
                      "name": "process"
                    },
                    "arguments": [
                      {
                        "type": "Identifier",
                        "start": 28,
                        "end": 29,
                        "name": "x"
                      }
                    ]
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });
});