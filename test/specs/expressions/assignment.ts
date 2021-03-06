import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Espressions - assignment', () => {

       it('should fail on "i #= 42"', () => {
        expect(() => {
            parseScript(`i #= 42`)
        }).to.throw();
    });

    it('should fail on "x %* y"', () => {
        expect(() => {
            parseScript(`x %* y`)
        }).to.throw();
    });

    it('should fail on "x %*= y"', () => {
        expect(() => {
            parseScript(`x %*= y`)
        }).to.throw();
    });

    it('expect "(a,b)=(c,d);" to throw', () => {
        expect(function() {
            parseScript(`(a,b)=(c,d);`);
        }).to.throw();
    });
    
    it('should parse "x = y-->10;\n --> nothing"', () => {
        expect(parseScript('x = y-->10;\n --> nothing', {
            locations: true,
            raw: true,
            ranges: true
        })).to.eql({
              "body": [
                {
                  "end": 11,
                 "expression": {
                    "end": 10,
                    "left": {
                      "end": 1,
                      "loc": {
                        "end": {
                          "column": 1,
                          "line": 1,
                        },
                        "start": {
                          "column": 0,
                          "line": 1,
                        }
                      },
                     "name": "x",
                      "start": 0,
                     "type": "Identifier",
                    },
                    "loc": {
                      "end": {
                        "column": 10,
                        "line": 1,
                      },
                      "start": {
                        "column": 0,
                        "line": 1,
                      }
                    },
                    "operator": "=",
                    "right": {
                      "end": 10,
                      "left": {
                        "argument": {
                          "end": 5,
                          "loc": {
                            "end": {
                              "column": 5,
                              "line": 1,
                            },
                            "start": {
                              "column": 4,
                              "line": 1,
                            },
                          },
                          "name": "y",
                          "start": 4,
                          "type": "Identifier",
                        },
                        "end": 7,
                        "loc": {
                          "end": {
                            "column": 7,
                            "line": 1
                          },
                          "start": {
                            "column": 4,
                            "line": 1,
                          }
                        },
                        "operator": "--",
                        "prefix": false,
                        "start": 4,
                       "type": "UpdateExpression",
                      },
                     "loc": {
                        "end": {
                          "column": 10,
                         "line": 1,
                        },
                        "start": {
                          "column": 4,
                          "line": 1,
                        }
                      },
                      "operator": ">",
                      "right": {
                        "end": 10,
                        "loc": {
                          "end": {
                            "column": 10,
                            "line": 1,
                          },
                          "start": {
                           "column": 8,
                            "line": 1,
                          }
                        },
                        "raw": "10",
                        "start": 8,
                        "type": "Literal",
                        "value": 10,
                      },
                     "start": 4,
                      "type": "BinaryExpression",
                    },
                    "start": 0,
                    "type": "AssignmentExpression",
                  },
                  "loc": {
                    "end": {
                     "column": 11,
                      "line": 1,
                    },
                    "start": {
                      "column": 0,
                      "line": 1,
                    },
                  },
                  "start": 0,
                  "type": "ExpressionStatement",
                },
              ],
              "end": 24,
              "loc": {
                "end": {
                  "column": 12,
                  "line": 2,
                },
                "start": {
                  "column": 0,
                  "line": 1,
                },
             },
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse "x = 0"', () => {
        expect(parseScript('x = 0', {
            locations: true,
            raw: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 5,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 5
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 5,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 5
                  }
                },
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 0,
                  "end": 5,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 0
                    },
                    "end": {
                      "line": 1,
                      "column": 5
                    }
                  },
                  "operator": "=",
                  "left": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 1,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 1
                      }
                    },
                    "name": "x"
                  },
                  "right": {
                    "type": "Literal",
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
                    },
                    "value": 0,
                    "raw": "0"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "(a)=(0)"', () => {
        expect(parseScript('(a)=(0)', {
            locations: true,
            raw: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 7,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 7
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 7,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 7
                  }
                },
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 0,
                  "end": 7,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 0
                    },
                    "end": {
                      "line": 1,
                      "column": 7
                    }
                  },
                  "operator": "=",
                  "left": {
                    "type": "Identifier",
                    "start": 1,
                    "end": 2,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 1
                      },
                      "end": {
                        "line": 1,
                        "column": 2
                      }
                    },
                    "name": "a"
                  },
                  "right": {
                    "type": "Literal",
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
                    "value": 0,
                    "raw": "0"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "x %= 0"', () => {
        expect(parseScript('x %= 0', {
            locations: true,
            raw: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 6,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 6
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 6,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 6
                  }
                },
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 0,
                  "end": 6,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 0
                    },
                    "end": {
                      "line": 1,
                      "column": 6
                    }
                  },
                  "operator": "%=",
                  "left": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 1,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 1
                      }
                    },
                    "name": "x"
                  },
                  "right": {
                    "type": "Literal",
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
                    "value": 0,
                    "raw": "0"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "x <<= 0"', () => {
        expect(parseScript('x <<= 0')).to.eql({
            type: "Program",
            body: [{
                type: "ExpressionStatement",
                expression: {
                    type: "AssignmentExpression",
                    operator: "<<=",
                    left: {
                        type: "Identifier",
                        name: "x",
                    },
                    right: {
                        type: "Literal",
                        value: 0,
                    },
                },
            }, ],
            sourceType: "script",
        });
    });

    it('should parse "((((((((((((((((((((((((((((((((((((((((a)))))))))))))))))))))))))))))))))))))))) = 0"', () => {
        expect(parseScript('((((((((((((((((((((((((((((((((((((((((a)))))))))))))))))))))))))))))))))))))))) = 0', {
            locations: true,
            raw: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 85,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 85
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 85,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 85
                  }
                },
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 0,
                  "end": 85,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 0
                    },
                    "end": {
                      "line": 1,
                      "column": 85
                    }
                  },
                  "operator": "=",
                  "left": {
                    "type": "Identifier",
                    "start": 40,
                    "end": 41,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 40
                      },
                      "end": {
                        "line": 1,
                        "column": 41
                      }
                    },
                    "name": "a"
                  },
                  "right": {
                    "type": "Literal",
                    "start": 84,
                    "end": 85,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 84
                      },
                      "end": {
                        "line": 1,
                        "column": 85
                      }
                    },
                    "value": 0,
                    "raw": "0"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "((((((((((((((((((((((((((((((((((((((((a)))))))))))))))))))))))))))))))))))))))) = 0"', () => {
        expect(parseScript('((((((((((((((((((((((((((((((((((((((((a)))))))))))))))))))))))))))))))))))))))) = 0', {
            locations: true,
            raw: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 85,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 85
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 85,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 85
                  }
                },
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 0,
                  "end": 85,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 0
                    },
                    "end": {
                      "line": 1,
                      "column": 85
                    }
                  },
                  "operator": "=",
                  "left": {
                    "type": "Identifier",
                    "start": 40,
                    "end": 41,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 40
                      },
                      "end": {
                        "line": 1,
                        "column": 41
                      }
                    },
                    "name": "a"
                  },
                  "right": {
                    "type": "Literal",
                    "start": 84,
                    "end": 85,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 84
                      },
                      "end": {
                        "line": 1,
                        "column": 85
                      }
                    },
                    "value": 0,
                    "raw": "0"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });


    it('should parse "x = 0"', () => {
        expect(parseScript('x = 0')).to.eql({
            type: "Program",
            body: [{
                type: "ExpressionStatement",
                expression: {
                    type: "AssignmentExpression",
                    operator: "=",
                    left: {
                        type: "Identifier",
                        name: "x",
                    },
                    right: {
                        type: "Literal",
                        value: 0,
                    },
                },
            }, ],
            sourceType: "script",
        });
    });

    it('should parse "x = 42"', () => {
        expect(parseScript('x = 42')).to.eql({
            "type": "Program",
            "body": [{
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
                        "value": 42
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "eval = 42"', () => {
        expect(parseScript('eval = 42')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "name": "eval"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 42
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "arguments = 42"', () => {
        expect(parseScript('arguments = 42')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "name": "arguments"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 42
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x *= 42"', () => {
        expect(parseScript('x *= 42')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "*=",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 42
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x /= 42"', () => {
        expect(parseScript('x /= 42')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "/=",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 42
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x %= 42"', () => {
        expect(parseScript('x %= 42')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "%=",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 42
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "arguments = 42"', () => {
        expect(parseScript('arguments = 42')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "name": "arguments"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 42
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x *= 42"', () => {
        expect(parseScript('x *= 42')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "*=",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 42
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x /= 42"', () => {
        expect(parseScript('x /= 42')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "/=",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 42
                    }
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse "x %= 42"', () => {
        expect(parseScript('x %= 42')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "%=",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 42
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x += 42"', () => {
        expect(parseScript('x += 42')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "+=",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 42
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x -= 42"', () => {
        expect(parseScript('x -= 42')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "-=",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 42
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x <<= 42"', () => {
        expect(parseScript('x <<= 42')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "<<=",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 42
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x >>= 42"', () => {
        expect(parseScript('x >>= 42')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": ">>=",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 42
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x >>>= 42"', () => {
        expect(parseScript('x >>>= 42')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": ">>>=",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 42
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x &= 42"', () => {
        expect(parseScript('x &= 42')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "&=",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 42
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x ^= 42"', () => {
        expect(parseScript('x ^= 42')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "^=",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 42
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x |= 42"', () => {
        expect(parseScript('x |= 42')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "|=",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 42
                    }
                }
            }],
            "sourceType": "script"
        });
    });

});