const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
require('dotenv').config()

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pa cuando API',
      description: 'Servidor de una facilitador de eventos',
      version: '1.0.0'
    },
    servers: [{ url: process.env.HOST_CLOUD }],
    tags: [{
      name: 'User',
      description: 'Operations about user'
    },
    {
      name: 'Publications_types',
      description: 'Operations about Publications'
    },
    {
      name: 'Publications',
      description: 'Operations about Publications'
    },
    {
      name: 'States',
      description: 'Operations about states'
    },
    {
      name: 'Cities',
      description: 'Operations about cities'
    },
    {
      name: 'Roles',
      description: 'Operations about roles'
    },
    {
      name: 'Auth',
      description: 'Operations about authorization'
    }
    ],
    components: {
      securitySchemes: {
        jwtAuth: {
          description: `<strong>Add 'JWT' before insert token :</strong> 'JWT 2sdasd.....dsdsdsd'`,
          type: 'apiKey',
          in: 'header',
          name: 'Authorization'
        }
      },
      schemas: {
        user: {
          type: 'object',
          required: ['firstName', 'lastName', 'email', 'password', 'username'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
            },
            firstName: {
              type: 'string',
              example: 'JH'
            },
            lastName: {
              type: 'string',
              example: 'delaCruz'
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'quebendicion@email.com'
            },
            username: {
              type: 'string',
              example: 'jhdelacruz777'
            }
          }
        },
        Publications: {
          type: 'object',
          required: ['profile_id', 'publication_type_id', 'title', 'description', 'content', 'picture', 'city_id'],
          properties: {
            publication_type_id: {
              type: 'string',
              format: 'integer',
              example: '1'
            },
            title: {
              type: 'string',
              example: 'newTitle'
            },
            description: {
              type: 'string',
              example: 'newDescription'
            },
            content: {
              type: 'string',
              example: 'newContent'
            },
            picture: {
              type: 'string',
              format: 'url',
              example: 'www.picture.com'
            },
            city_id: {
              type: 'string',
              format: 'integer',
              example: '1'
            },
            image_url: {
              type: 'string',
              format: 'url',
              example: 'www.image_url'
            }
          }
        },
        States: {
          type: 'object',
          required: ['country_id', 'name'],
          properties: {
            country_id: {
              type: 'string',
              example: 'John'
            },
            name: {
              type: 'string',
              example: 'Doe'
            }
          }
        },
        Cities: {
          type: 'object',
          required: ['state_id', 'name'],
          properties: {
            state_id: {
              type: 'string',
              example: 'John'
            },
            name: {
              type: 'string',
              example: 'Doe'
            }
          }
        },
        Roles: {
          type: 'object',
          required: ['name'],
          properties: {
            name: {
              type: 'string',
              example: 'John'
            }
          }
        }
      }
    },
    paths: {
      '/api/v1/auth/sign-up': {
        post: {
          tags: [
            'Auth'
          ],
          summary: 'Add a new User',
          description: 'Add a new User',
          operationId: 'addUser',
          requestBody: {
            description: 'After registering, a verification email will be sent to your email',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    firstName: {
                      type: 'string', example: 'jh'
                    },
                    lastName: {
                      type: 'string', example: 'delaCruz'
                    },
                    username: {
                      type: 'string', example: 'jhdelacruz777'
                    },
                    email: {
                      type: 'string', format: 'email', example: 'quebendicion@gmail.com'
                    },
                    password: {
                      type: 'string', example: 'pass1234'
                    },
                    imageUrl: {
                      type: 'string', format: 'url', example: 'www.image.com'
                    },
                    codePhone: {
                      type: 'string', format: 'integer', example: '51'
                    },
                    phone: {
                      type: 'string', format: 'integer', example: '999888666'
                    }

                  }
                }
              }
            },
            required: true
          },
          responses: {
            201: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                      },
                      email: {
                        type: 'string', example: 'unknown@email.com'
                      },
                      username: {
                        type: 'string', example: 'unknown'
                      }
                    }
                  }
                }
              }
            },
            40: {
              description: 'Error Bad Request'
            }
          }
        }
      },
      '/api/v1/auth/login': {
        post: {
          tags: [
            'Auth'
          ],
          summary: 'Login to the page',
          description: 'Login to the page Pa cuando',
          operationId: 'LogIn',
          requestBody: {
            description: 'After login you will receive a token',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: {
                      type: 'string', example: 'unknown@email.com'
                    },
                    password: {
                      type: 'string', example: 'pass1234'
                    }
                  }
                }
              }
            },
            required: true
          },
          responses: {
            201: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string', example: 'Correct Credentials!'
                      },
                      token: {
                        type: 'string', example: '3fed23.......434&ñ#+34-'
                      }
                    }
                  }
                }
              }
            },
            401: {
              description: 'Error: Unauthorized'
            }
          }
        }
      },
      '/api/v1/users/user-info': {
        get: {
          tags: [
            'Auth'
          ],
          summary: 'Get my data',
          description: 'Get my information',
          operationId: 'in',
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                      },
                      email: {
                        type: 'string', example: 'unknown@email.com'
                      },
                      username: {
                        type: 'string', example: 'unknown'
                      }
                    }
                  }
                }
              }
            }
          },
          '401': {
            description: 'successful Error',
          },
          security: [
            {
              jwtAuth: []
            }
          ]
        },
      },
      '/api/v1/publications-types': {
        get: {
          tags: [
            'Publications_types'
          ],
          summary: 'Get all Publications types',
          description: 'search all available publications types',
          operationId: 'getPublicationsTypes',
          responses: {
            200: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      results: {
                        type: 'object',
                        properties: {
                          count: {
                            type: 'integer',
                            example: '5'
                          },
                          totalPages: {
                            type: 'integer',
                            example: '1'
                          },
                          CurrentPage: {
                            type: 'integer',
                            example: '1'
                          },
                          results: {
                            type: 'array',
                            items: {
                              properties: {
                                id: {
                                  type: 'string', example: '1'
                                },
                                name: {
                                  type: 'string', example: 'newEvent'
                                },
                                description: {
                                  type: 'string', example: 'newDescription'
                                },
                                created_at: {
                                  type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                                },
                                updated_at: {
                                  type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            401: {
              description: 'Error'
            }
          }
        }
      },
      '/api/v1/publications-types/{publicationsTypesId} ': {
        get: {
          tags: [
            'Publications_types'
          ],
          summary: 'Get all Publications',
          description: 'search all available publications',
          operationId: 'getPublicationType',
          parameters: [
            {
              name: 'publicationsTypesId',
              in: 'path',
              description: 'ID of Publications-types',
              required: true,
              schema: {
                type: 'integer'
              }
            }
          ],
          responses: {
            200: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      results: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'integer', example: '1'
                          },
                          name: {
                            type: 'string', example: 'newEvent'
                          },
                          description: {
                            type: 'string', example: 'newDescription'
                          },
                          created_at: {
                            type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                          },
                          updated_at: {
                            type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            401: {
              description: 'Error'
            }
          }
        }
      },
      '/api/v1/publications ': {
        get: {
          tags: [
            'Publications'
          ],
          summary: 'Get all Publications',
          description: 'search all available publications',
          operationId: ' ??? ',
          responses: {
            200: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      results: {
                        type: 'object',
                        properties: {
                          count: {
                            type: 'integer',
                            example: '5'
                          },
                          totalPages: {
                            type: 'integer',
                            example: '1'
                          },
                          CurrentPage: {
                            type: 'integer',
                            example: '1'
                          },
                          results: {
                            type: 'array',
                            items: {
                              properties: {
                                id: {
                                  type: 'string', format: 'uuid', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                                },
                                profile_id: {
                                  type: 'string', format: 'uuid', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                                },
                                publication_type_id: {
                                  type: 'string', example: '1'
                                },
                                title: {
                                  type: 'string', example: 'newTitle'
                                },
                                description: {
                                  type: 'string', example: 'newDescription'
                                },
                                content: {
                                  type: 'string', example: 'newContent'
                                },
                                picture: {
                                  type: 'string', format: 'url', example: 'www.picture.com'
                                },
                                city_id: {
                                  type: 'string', example: '1'
                                },
                                image_url: {
                                  type: 'string', format: 'url', example: 'www.image.com'
                                },
                                created_at: {
                                  type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                                },
                                updated_at: {
                                  type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            401: {
              description: 'Error'
            }
          }
        },
        post: {
          tags: [
            'Publications'
          ],
          summary: 'Add a publication',
          description: 'Add a new publication',
          operationId: ' createPublications ',
          requestBody: {
            description: 'After registering, a verification email will be sent to your email',
            content: {
              'application/json': {
                schema: {
                  '$ref': '#/components/schemas/Publications'
                }
              }
            },
            required: true
          },
          responses: {
            201: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      results: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'string', format: 'uuid', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                          },
                          profile_id: {
                            type: 'string', format: 'uuid', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                          },
                          publication_type_id: {
                            type: 'string', example: '1'
                          },
                          title: {
                            type: 'string', example: 'newTitle'
                          },
                          description: {
                            type: 'string', example: 'newDescription'
                          },
                          content: {
                            type: 'string', example: 'newContent'
                          },
                          picture: {
                            type: 'string', format: 'url', example: 'www.picture.com'
                          },
                          city_id: {
                            type: 'string', example: '1'
                          },
                          image_url: {
                            type: 'string', format: 'url', example: 'www.image.com'
                          },
                          created_at: {
                            type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                          },
                          updated_at: {
                            type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                          }
                        }

                      }
                    }
                  }
                }
              }
            },
            400: {
              description: 'Error'
            }
          },
          security: [
            {
              jwtAuth: []
            }
          ]
        }
      },
      '/api/v1/publications/{publicationId}': {
        get: {
          tags: [
            'Publications'
          ],
          summary: 'Get a Publication',
          description: 'Search for information about a publication',
          operationId: 'getPublication',
          parameters: [
            {
              name: 'publicationId',
              in: 'path',
              description: 'ID of Publication',
              required: true,
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            201: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      results: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'string', format: 'uuid', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                          },
                          profile_id: {
                            type: 'string', format: 'uuid', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                          },
                          publication_type_id: {
                            type: 'integer', example: '1'
                          },
                          title: {
                            type: 'string', example: 'newTitle'
                          },
                          description: {
                            type: 'string', example: 'newDescription'
                          },
                          content: {
                            type: 'string', example: 'newContent'
                          },
                          picture: {
                            type: 'string', format: 'url', example: 'www.picture.com'
                          },
                          city_id: {
                            type: 'integer', example: '1'
                          },
                          image_url: {
                            type: 'string', format: 'url', example: 'www.image.com'
                          },
                          created_at: {
                            type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                          },
                          updated_at: {
                            type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                          }
                        }

                      }
                    }
                  }
                }
              }
            },
            400: {
              description: 'Error'
            }
          },
        },
        delete: {
          tags: [
            'Publications'
          ],
          summary: 'Delete my publication',
          description: 'Delete avalible publication',
          operationId: 'removePublication',
          parameters: [
            {
              name: 'publicationId',
              in: 'path',
              description: 'ID of publication',
              required: true,
              schema: {
                type: 'string',
                format: 'uuid'
              }
            }
          ],
          responses: {
            200: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      results: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'string', format: 'uuid', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                          },
                          profile_id: {
                            type: 'string', format: 'uuid', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                          },
                          publication_type_id: {
                            type: 'string', example: '1'
                          },
                          title: {
                            type: 'string', example: 'newTitle'
                          },
                          description: {
                            type: 'string', example: 'newDescription'
                          },
                          content: {
                            type: 'string', example: 'newContent'
                          },
                          picture: {
                            type: 'string', format: 'url', example: 'www.picture.com'
                          },
                          city_id: {
                            type: 'string', example: '1'
                          },
                          image_url: {
                            type: 'string', format: 'url', example: 'www.image.com'
                          },
                          created_at: {
                            type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                          },
                          updated_at: {
                            type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                          }
                        }

                      },
                      message: {
                        type: 'object',
                        example: 'removed'
                      }
                    }
                  }
                }
              }
            },
            400: {
              description: 'Error',
            }
          },
          security: [
            {
              jwtAuth: []
            }
          ]
        }
      },
      '/api/v1/publications/{publicationId}/votes': {
        get: {
          tags: [
            'Publications'
          ],
          summary: 'Vote for a publication',
          description: 'Vote for an available publication',
          operationId: 'votePublication',
          parameters: [
            {
              name: 'publicationId',
              in: 'path',
              description: 'ID of publication',
              required: true,
              schema: {
                type: 'string',
                format: 'uuid'
              }
            }
          ],
          responses: {
            201: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      results: {
                        type: 'object',
                        properties: {
                          publication_id: {
                            type: 'string', format: 'uuid', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                          },
                          profile_id: {
                            type: 'string', format: 'uuid', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                          },
                          updated_at: {
                            type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                          },
                          created_at: {
                            type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                          }

                        }
                      }
                    }
                  }
                }
              }
            },
            400: {
              description: 'Error'
            }
          },
          security: [
            {
              jwtAuth: []
            }
          ]
        }
      },
      '/api/v1/users/{userId}': {
        get: {
          tags: [
            'User'
          ],
          summary: 'get my data',
          description: 'find my user information',
          operationId: 'getMyUser',
          parameters: [
            {
              name: 'userId',
              in: 'path',
              description: 'ID of User',
              required: true,
              schema: {
                type: 'string',
                format: 'uuid'
              }
            }
          ],
          responses: {
            201: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      results: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'string', format: 'uuid', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                          },
                          first_name: {
                            type: 'string', example: 'jh'
                          },
                          last_name: {
                            type: 'string', example: 'delaCruz'
                          },
                          email: {
                            type: 'string', example: 'quebendicion@gmail.com'
                          },
                          username: {
                            type: 'string', example: 'jhdelacruz777'
                          },
                          profile: {
                            type: 'object',
                            properties: {
                              image_url: {
                                type: 'string', format: 'url', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                              },
                              code_phone: {
                                type: 'integer', example: '55'
                              },
                              phone: {
                                type: 'integer', example: '999888777'
                              }
                            }

                          }
                        }

                      }
                    }
                  }
                }
              }
            },
            400: {
              description: 'Error'
            }
          },
          security: [
            {
              jwtAuth: []
            }
          ]
        },
        put: {
          tags: [
            'User'
          ],
          summary: 'Update my user',
          description: 'update my user information',
          operationId: 'putUser',
          parameters: [
            {
              name: 'userId',
              in: 'path',
              description: 'ID of User',
              required: true,
              schema: {
                type: 'string',
                format: 'uuid'
              }
            }
          ],
          requestBody: {
            description: 'After registering, a verification email will be sent to your email',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    username: {
                      type: 'string', example: 'jhdelacruz777'
                    },
                    first_name: {
                      type: 'string', example: 'jh'
                    },
                    last_name: {
                      type: 'string', example: 'delaCruz'
                    },
                    image_url: {
                      type: 'string', format: 'url', example: 'www.image.com'
                    },
                    code_phone: {
                      type: 'integer', example: '55'
                    },
                    phone: {
                      type: 'integer', example: '999888777'
                    },
                  }
                }
              }
            },
            required: true
          },
          responses: {
            200: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      result: {
                        type: 'object',
                        properties: {
                          username: {
                            type: 'string', example: 'jhdelacruz777'
                          },
                          first_name: {
                            type: 'string', example: 'jh'
                          },
                          last_name: {
                            type: 'string', example: 'delaCruz'
                          },
                          image_url: {
                            type: 'string', format: 'url', example: 'www.image.com'
                          },
                          code_phone: {
                            type: 'integer', example: '55'
                          },
                          phone: {
                            type: 'integer', example: '999888777'
                          },
                        }
                      }
                    }
                  }
                }
              }
            },
            400: {
              description: 'Error'
            }
          },
          security: [
            {
              jwtAuth: []
            }
          ]
        }
      },
      '/api/v1/users/{userId}/votes': {
        get: {
          tags: [
            'User'
          ],
          summary: 'Get my votes',
          description: 'Get the votes of the publications',
          operationId: 'getMyVotes',
          parameters: [
            {
              name: 'userId',
              in: 'path',
              description: 'ID of User',
              required: true,
              schema: {
                type: 'string',
                format: 'uuid'
              }
            }
          ],
          responses: {
            200: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      results: {
                        type: 'object',
                        properties: {
                          count: {
                            type: 'integer',
                            example: '5'
                          },
                          rows: {
                            type: 'array',
                            items: {
                              properties: {
                                publication_id: {
                                  type: 'string', format: 'uuid', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                                },
                                profile_id: {
                                  type: 'string', format: 'uuid', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            400: {
              description: 'Error'
            }
          },
          security: [
            {
              jwtAuth: []
            }
          ]
        }
      },
      '/api/v1/users/{userId}/publications': {
        get: {
          tags: [
            'User'
          ],
          summary: 'Get my publications',
          description: 'Get my publications',
          operationId: 'getMyPublictions',
          parameters: [
            {
              name: 'userId',
              in: 'path',
              description: 'ID of User',
              required: true,
              schema: {
                type: 'string',
                format: 'uuid'
              }
            }
          ],
          responses: {
            200: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      results: {
                        type: 'object',
                        properties: {
                          count: {
                            type: 'integer',
                            example: '5'
                          },
                          rows: {
                            type: 'array',
                            items: {
                              properties: {
                                publication_id: {
                                  type: 'string', format: 'uuid', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                                },
                                profile_id: {
                                  type: 'string', format: 'uuid', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                                },
                                title: {
                                  type: 'string', example: 'newTitle'
                                },
                                description: {
                                  type: 'string', example: 'newDescription'
                                },
                                content: {
                                  type: 'string', example: 'newContent'
                                },
                                picture: {
                                  type: 'string', format: 'url', example: 'www.picture.com'
                                },
                                city_id: {
                                  type: 'integer', example: '1'
                                },
                                image_url: {
                                  type: 'string', format: 'url', example: 'www.image.com'
                                },
                                created_at: {
                                  type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                                },
                                updated_at: {
                                  type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            400: {
              description: 'Invalid ID supplied'
            }
          },
          security: [
            {
              jwtAuth: []
            }
          ]
        }
      },
      '/api/v1/users': {
        get: {
          tags: [
            'User'
          ],
          summary: 'Get users',
          description: 'admin endpoint',
          operationId: 'getAllUsers',
          responses: {
            200: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      results: {
                        type: 'object',
                        properties: {
                          count: {
                            type: 'integer',
                            example: '5'
                          },
                          totalPages: {
                            type: 'integer',
                            example: '1'
                          },
                          CurrentPage: {
                            type: 'integer',
                            example: '1'
                          },
                          results: {
                            type: 'array',
                            items: {
                              properties: {
                                id: {
                                  type: 'string', format: 'uuid', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                                },
                                first_name: {
                                  type: 'string', example: 'jh'
                                },
                                last_name: {
                                  type: 'string', example: 'delaCruz'
                                },
                                email: {
                                  type: 'string', example: 'quebendicion@gmail.com'
                                },
                                username: {
                                  type: 'string', example: 'jhdelacruz777'
                                },
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            400: {
              description: 'Invalid ID supplied'
            }
          },
          security: [
            {
              jwtAuth: []
            }
          ]
        }
      },
      '/api/v1/states': {
        get: {
          tags: [
            'States'
          ],
          summary: 'get all states',
          description: 'search all users of the social network',
          operationId: 'getAllStates',
          responses: {
            200: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      results: {
                        type: 'object',
                        properties: {
                          count: {
                            type: 'integer',
                            example: '5'
                          },
                          totalPages: {
                            type: 'integer',
                            example: '1'
                          },
                          CurrentPage: {
                            type: 'integer',
                            example: '1'
                          },
                          results: {
                            type: 'array',
                            items: {
                              properties: {
                                id: {
                                  type: 'integer', example: '1'
                                },
                                country_id: {
                                  type: 'integer', example: '1'
                                },
                                name: {
                                  type: 'string', example: 'nowNameState'
                                },
                                created_at: {
                                  type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                                },
                                updated_at: {
                                  type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            400: {
              description: 'Invalid ID supplied'
            }
          }

        }
      },
      '/api/v1/cities': {
        get: {
          tags: [
            'Cities'
          ],
          summary: 'get all cities',
          description: 'search all users of the social network',
          operationId: 'getAllCities',
          responses: {
            200: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      results: {
                        type: 'object',
                        properties: {
                          count: {
                            type: 'integer',
                            example: '5'
                          },
                          totalPages: {
                            type: 'integer',
                            example: '1'
                          },
                          CurrentPage: {
                            type: 'integer',
                            example: '1'
                          },
                          results: {
                            type: 'array',
                            items: {
                              properties: {
                                id: {
                                  type: 'integer', example: '1'
                                },
                                state_id: {
                                  type: 'integer', example: '1'
                                },
                                name: {
                                  type: 'string', example: 'nowNameCity'
                                },
                                created_at: {
                                  type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                                },
                                updated_at: {
                                  type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            400: {
              description: 'Invalid ID supplied'
            }
          }

        }
      },
      '/api/v1/roles': {
        get: {
          tags: [
            'Roles'
          ],
          summary: 'get all roles',
          description: 'search all users of the social network',
          operationId: 'getAllRoles',
          responses: {
            200: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      results: {
                        type: 'object',
                        properties: {
                          count: {
                            type: 'integer',
                            example: '5'
                          },
                          totalPages: {
                            type: 'integer',
                            example: '1'
                          },
                          CurrentPage: {
                            type: 'integer',
                            example: '1'
                          },
                          results: {
                            type: 'array',
                            items: {
                              properties: {
                                id: {
                                  type: 'integer', example: '1'
                                },
                                name: {
                                  type: 'string', example: 'public'
                                },
                                created_at: {
                                  type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                                },
                                updated_at: {
                                  type: 'string', format: 'date', example: '2050-01-26T14:31:49.555Z'
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            400: {
              description: 'Invalid ID supplied'
            }
          }
        }
      },
    }
  },
  apis: ['src/users/users.router.js', 'src/follows/follows.router.js', 'src/posts/posts.router.js', 'src/auth/auth.router.js']
}


const swaggerSpec = swaggerJSDoc(options)

const swaggerDocs = (app, /*port*/) => {
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  app.get('/api/v1/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
  console.log(
    'SWAGGER HOST: /api/v1/docs '
  )
}

module.exports = { swaggerDocs }