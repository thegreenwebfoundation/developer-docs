const devData = {
    "swagger": "2.0",
    "info": {
      "title": "Welcome to The Green Web Foundation Partner API ",
      "description": "Use this API to update information about the digital infrastructure you are using, services you provide to others, and see the status of providers in your own supply chain.",
      "termsOfService": "https://www.thegreenwebfoundation.org/privacy-statement/",
      "contact": {
        "email": "support@thegreenwebfoundation.org"
      },
      "license": {
        "name": "License: Apache 2.0. "
      },
      "x-logo": {
        "url": "https://www.thegreenwebfoundation.org/wp-content/themes/tgwf2015/img/top-logo-greenweb.png",
        "background": "#000000"
      },
      "version": "v3"
    },
    "basePath": "/",
    "consumes": [
      "application/json"
    ],
    "produces": [
      "application/json"
    ],
    "securityDefinitions": {
      "Basic": {
        "type": "basic"
      }
    },
    "security": [
      {
        "Basic": []
      }
    ],
    "paths": {
      "/api-token-auth/": {
        "post": {
          "operationId": "api-token-auth_create",
          "description": "",
          "parameters": [
            {
              "name": "data",
              "in": "body",
              "required": true,
              "schema": {
                "$ref": "#/definitions/AuthToken"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "",
              "schema": {
                "$ref": "#/definitions/AuthToken"
              }
            }
          },
          "tags": [
            "api-token-auth"
          ]
        },
        "parameters": []
      },
      "/api/v3/asns/": {
        "get": {
          "operationId": "api_v3_asns_list",
          "description": "\nList the AS Networks associated with this provider.\n\nReturns a list of AS Networks registered with the provider.\n",
          "parameters": [],
          "responses": {
            "200": {
              "description": "",
              "schema": {
                "type": "array",
                "items": {
                  "$ref": "#/definitions/AS Network"
                }
              }
            }
          },
          "tags": [
            "AS Network"
          ]
        },
        "parameters": []
      },
      "/api/v3/asns/{id}/": {
        "get": {
          "operationId": "api_v3_asns_read",
          "description": "\nFetch the AS Network for the corresponding id provided.\n",
          "parameters": [],
          "responses": {
            "200": {
              "description": "",
              "schema": {
                "$ref": "#/definitions/AS Network"
              }
            }
          },
          "tags": [
            "AS Network"
          ]
        },
        "delete": {
          "operationId": "api_v3_asns_delete",
          "description": "\nRemoves the association of the AS Network with the corresponding id from this\nhosting provider.\n\nAs with POSTing a new AS Network, there can be a delay until the change propogates.\n\n",
          "parameters": [],
          "responses": {
            "204": {
              "description": ""
            }
          },
          "tags": [
            "AS Network"
          ]
        },
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "A unique integer value identifying this greencheck asn.",
            "required": true,
            "type": "integer"
          }
        ]
      },
      "/api/v3/batch/greencheck": {
        "post": {
          "operationId": "api_v3_batch_greencheck_create",
          "summary": "A batch API for checking domains in bulk, rather than individually.",
          "description": "Upload a CSV file containing a list of domains, to get back the status of each domain.\n\nIf you just want a list of green domains to check against, we publish a daily snapshot of all the green domains we have, for offline use and analysis, at https://datasets.thegreenwebfoundation.org",
          "parameters": [
            {
              "name": "urls",
              "in": "formData",
              "description": "Accepts a csv file, with one domain per line.",
              "required": true,
              "type": "file"
            },
            {
              "name": "response_filename",
              "in": "formData",
              "description": "Provide a filename to get back a downloadable file. Without this, csv information is returned as an inline response.",
              "required": false,
              "type": "string",
              "minLength": 1
            }
          ],
          "responses": {
            "201": {
              "description": "",
              "schema": {
                "$ref": "#/definitions/Batch Greencheck"
              }
            }
          },
          "consumes": [
            "application/x-www-form-urlencoded",
            "multipart/form-data"
          ],
          "produces": [
            "text/csv"
          ],
          "tags": [
            "api"
          ]
        },
        "parameters": []
      },
      "/api/v3/carbontxt": {
        "post": {
          "operationId": "api_v3_carbontxt_create",
          "description": "",
          "parameters": [],
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "api"
          ]
        },
        "put": {
          "operationId": "api_v3_carbontxt_update",
          "description": "Return the information we have for the providers mentioned in\na given carbon.txt file",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Carbon.txt"
          ]
        },
        "parameters": []
      },
      "/api/v3/greencheck/": {
        "get": {
          "operationId": "api_v3_greencheck_list",
          "description": "Our override for bulk URL lookups, like an index/listing view",
          "parameters": [],
          "responses": {
            "200": {
              "description": "",
              "schema": {
                "type": "array",
                "items": {
                  "$ref": "#/definitions/GreenDomain"
                }
              }
            }
          },
          "tags": [
            "api"
          ]
        },
        "parameters": []
      },
      "/api/v3/greencheck/{url}": {
        "get": {
          "operationId": "api_v3_greencheck_read",
          "description": "Fetch entry matching the provided URL, like a 'detail' view",
          "parameters": [],
          "responses": {
            "200": {
              "description": "",
              "schema": {
                "$ref": "#/definitions/GreenDomain"
              }
            }
          },
          "tags": [
            "api"
          ]
        },
        "parameters": [
          {
            "name": "url",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ]
      },
      "/api/v3/ip-ranges/": {
        "get": {
          "operationId": "api_v3_ip-ranges_list",
          "description": "\nList the IP ranges associated with this provider.\n\nReturns a list of ip ranges, with a start and end IP address, registered with the provider.\n",
          "parameters": [],
          "responses": {
            "200": {
              "description": "",
              "schema": {
                "type": "array",
                "items": {
                  "$ref": "#/definitions/IP Range"
                }
              }
            }
          },
          "tags": [
            "IP Range"
          ]
        },
        "parameters": []
      },
      "/api/v3/ip-ranges/{id}/": {
        "get": {
          "operationId": "api_v3_ip-ranges_read",
          "description": "\nFetch the IP Range for the corresponding id provided.\n",
          "parameters": [],
          "responses": {
            "200": {
              "description": "",
              "schema": {
                "$ref": "#/definitions/IP Range"
              }
            }
          },
          "tags": [
            "IP Range"
          ]
        },
        "delete": {
          "operationId": "api_v3_ip-ranges_delete",
          "description": "\nRemoves the association of the IP range with the corresponding id from this\nhosting provider.\n\nAs with POSTing a new IP Range, there can be a delay until the change propogates.\n\n",
          "parameters": [],
          "responses": {
            "204": {
              "description": ""
            }
          },
          "tags": [
            "IP Range"
          ]
        },
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "A unique integer value identifying this greencheck ip.",
            "required": true,
            "type": "integer"
          }
        ]
      },
      "/api/v3/ip-to-co2intensity/": {
        "get": {
          "operationId": "api_v3_ip-to-co2intensity_list",
          "description": "Return the CO2 intensity for the IP address",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "IP Carbon Intensity"
          ]
        },
        "parameters": []
      },
      "/api/v3/ip-to-co2intensity/{ip_to_check}": {
        "get": {
          "operationId": "api_v3_ip-to-co2intensity_read",
          "description": "Return the CO2 intensity for the IP address",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "IP Carbon Intensity"
          ]
        },
        "parameters": [
          {
            "name": "ip_to_check",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ]
      },
      "/checks/latest/": {
        "get": {
          "operationId": "checks_latest_list",
          "description": "",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "produces": [
            "application/javascript"
          ],
          "tags": [
            "checks"
          ]
        },
        "parameters": []
      },
      "/data/directory/": {
        "get": {
          "operationId": "data_directory_list",
          "description": "Return a JSON object keyed by countrycode, listing the providers\nwe have for each country:",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "produces": [
            "application/javascript"
          ],
          "tags": [
            "data"
          ]
        },
        "parameters": []
      },
      "/data/hostingprovider/{id}": {
        "get": {
          "operationId": "data_hostingprovider_read",
          "description": "Return a JSON object representing the provider,\nwhat they do, and evidence supporting their\nsustainability claims",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "data"
          ]
        },
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ]
      },
      "/greencheck/{url}": {
        "get": {
          "operationId": "greencheck_read",
          "description": "Fetch entry matching the provided URL, like a 'detail' view",
          "parameters": [],
          "responses": {
            "200": {
              "description": "",
              "schema": {
                "$ref": "#/definitions/GreenDomain"
              }
            }
          },
          "tags": [
            "greencheck"
          ]
        },
        "parameters": [
          {
            "name": "url",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ]
      },
      "/v2/greencheckmulti/{url_list}": {
        "get": {
          "operationId": "v2_greencheckmulti_read",
          "description": "Return a JSON object for the multichecks, like the API",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "v2"
          ]
        },
        "parameters": [
          {
            "name": "url_list",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ]
      }
    },
    "definitions": {
      "AuthToken": {
        "required": [
          "username",
          "password"
        ],
        "type": "object",
        "properties": {
          "username": {
            "title": "Username",
            "type": "string",
            "minLength": 1
          },
          "password": {
            "title": "Password",
            "type": "string",
            "minLength": 1
          },
          "token": {
            "title": "Token",
            "type": "string",
            "readOnly": true,
            "minLength": 1
          }
        }
      },
      "AS Network": {
        "required": [
          "asn",
          "hostingprovider"
        ],
        "type": "object",
        "properties": {
          "asn": {
            "title": "Asn",
            "type": "integer",
            "maximum": 4294967295,
            "minimum": 1
          },
          "hostingprovider": {
            "title": "Hostingprovider",
            "type": "integer"
          },
          "id": {
            "title": "ID",
            "type": "integer",
            "readOnly": true
          }
        }
      },
      "Batch Greencheck": {
        "type": "object",
        "properties": {
          "urls": {
            "title": "Urls",
            "description": "Accepts a csv file, with one domain per line.",
            "type": "string",
            "readOnly": true,
            "format": "uri"
          },
          "response_filename": {
            "title": "Response filename",
            "description": "Provide a filename to get back a downloadable file. Without this, csv information is returned as an inline response.",
            "type": "string",
            "minLength": 1
          }
        }
      },
      "GreenDomain": {
        "required": [
          "url",
          "hosted_by",
          "hosted_by_website",
          "partner",
          "green",
          "hosted_by_id",
          "modified"
        ],
        "type": "object",
        "properties": {
          "url": {
            "title": "Url",
            "type": "string",
            "maxLength": 255,
            "minLength": 1
          },
          "hosted_by": {
            "title": "Hosted by",
            "type": "string",
            "maxLength": 255,
            "minLength": 1
          },
          "hosted_by_website": {
            "title": "Hosted by website",
            "type": "string",
            "maxLength": 255,
            "minLength": 1
          },
          "partner": {
            "title": "Partner",
            "type": "string",
            "maxLength": 255,
            "minLength": 1
          },
          "green": {
            "title": "Green",
            "type": "boolean"
          },
          "hosted_by_id": {
            "title": "Hosted by id",
            "type": "integer",
            "maximum": 2147483647,
            "minimum": -2147483648
          },
          "modified": {
            "title": "Modified",
            "type": "string",
            "format": "date-time"
          }
        }
      },
      "IP Range": {
        "required": [
          "ip_start",
          "ip_end",
          "hostingprovider"
        ],
        "type": "object",
        "properties": {
          "ip_start": {
            "title": "Ip start",
            "type": "string",
            "format": "decimal"
          },
          "ip_end": {
            "title": "Ip end",
            "type": "string",
            "format": "decimal"
          },
          "hostingprovider": {
            "title": "Hostingprovider",
            "type": "integer"
          },
          "id": {
            "title": "ID",
            "type": "integer",
            "readOnly": true
          }
        }
      }
    }
  }

module.exports = { devData };