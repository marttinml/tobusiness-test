/*global angular*/
(function () {

    var controller = function ($scope, $rootScope, $routeParams) {
        //code

        $rootScope.quickMenu = [
            {
                title:"Inicio",
                icoClass : "fa-home",
                url:"#/home",
                active:false
            },
            {
                title:"Tiempo aire",
                icoClass : "fa-phone",
                url:"#/tiempoaire",
                active:false
            },
            {
                title:"Mensajes",
                icoClass : "fa-inbox",
                url:"#/inbox",
                count:5,
                active:false
            },
            {
                title:"Perfil",
                icoClass : "fa-user",
                url:"#/profile",
                active:false
            },
            {
                title:"Ayuda",
                icoClass : "fa-cog",
                url:"#/help",
                active:false
            } 
        ];
        $rootScope.setIndexQuickMenuActive = function(index){
        	for(i in $rootScope.quickMenu){
        		$rootScope.quickMenu[i].active = false;
        	}
        	$rootScope.quickMenu[index].active = true;
        };


        $rootScope.areas = [{text:'SALES REQUEST'}, {text:'CREDIT'},{text:'IT'}];
        $rootScope.applications = [
                                    {text:'WELCOME CENTER',offset:{x:0,y:0}},
                                    {text:'COEXISTENSE'},
                                    {text:'OPUS'},
                                    {text:'AMDOCS'},
                                    {text:'INVOICE GATEWAY'},
                                    {text:'CAPM'},
                                    {text:'AT&T API'},
                                    {text:'ICAS'},
                                    {text:'MAXIMAGE'},
                                    {text:'TBD'},
                                    {text:'NPS'},
                                    {text:'SRM'},
                                    {text:'MEC'},
                                    {text:'EDOC'},
                                    {text:'OFA'},
                                    {text:'ASD'},
                                    {text:'ORACLE GL'},
                                    {text:'OMS'},
                                    {text:'INAR'}
                                ];
        $rootScope.data = {
  "rutas": [
    0,
    0,
    0
  ],
  "arquitectura": [
    {
      "title": "BA",
      "name": "Business Architecture",
      "backColor": "rgba(255,184,28,.8)",
      "img": "url(assets/img/imagen_BA.png)",
      "flipped": false,
      "dominios": [
        {
          "title": "CRM",
          "name": "Customer Relationship Management",
          "color": "#9063CD",
          "selected": false,
          "megaprocesos": [
            {
              "title": "Sales",
              "open": false,
              "macroprocesos": [
                {
                  "title": "Sales at Store Postpaid",
                  "open": false,
                  "procesos": [
                    {
                      "name": "Queue Management",
                      "selected": false,
                      "capacidades": [
                        {
                          "name": "Customer Identification",
                          "selected": false,
                          "kpis": [],
                          "aplicaciones": [
                            {
                              "name": "Welcome Center",
                              "selected": false
                            }
                          ],
                          "areas":{
                              "name": "SALES REQUEST",
                              "selected": false
                            },
                            "offsets":[{x:0,y:0},{x:0,y:0},{x:0,y:0}],
                            "intersection":[
                                                [{x:0,y:0},{x:0,y:0},{x:0,y:0}],
                                                [{x:0,y:0},{x:0,y:0},{x:0,y:0}],
                                                [{x:0,y:0},{x:0,y:0},{x:0,y:0}]
                                            ],
                          "subcapacidades": [
                            {
                              "id": "1",
                              "text": "Welcome Center Add Customer Name Opus Reason for Visit",
                              "type": "activity",
                              "joinTo": [
                                "2"
                              ],
                              "joinElse": ""
                            }
                          ]
                        },
                        {
                          "name": "Customer Billing System Identification",
                          "selected": false,
                          "kpis": [],
                          "aplicaciones": [
                            {
                              "name": "Coxistence (MRD)",
                              "selected": false
                            }
                          ],
                          "areas":{
                              "name": "SALES REQUEST",
                              "selected": false
                            },
                          "subcapacidades": [
                            {
                              "id": "1",
                              "text": "Capture billing & personal information (name, DOB, SSN)",
                              "type": "activity",
                              "joinTo": [
                                "2"
                              ],
                              "joinElse": ""
                            },
                            {
                              "id": "2",
                              "text": "Contact information (phone, email and billing adress)",
                              "type": "activity",
                              "joinTo": [
                                "3"
                              ],
                              "joinElse": "4"
                            },
                            {
                              "id": "3",
                              "text": "Correct Data",
                              "type": "if",
                              "joinTo": [
                                ""
                              ],
                              "joinElse": ""
                            },
                            {
                                "id": "5",
                                "text": "2",
                                "type": "end",
                                "joinTo": [""],
                                "joinElse": ""
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "name": "Offer Type",
                      "selected": false,
                      "capacidades": [
                        {
                          "name": "Commercial Offer",
                          "selected": false,
                          "kpis": [
                            {
                              "name": "# Rate Plans",
                              "selected": false
                            }
                          ],
                          "aplicaciones": [
                            {
                              "name": "Amdocs CRM",
                              "selected": false
                            },
                            {
                              "name": "Opus",
                              "selected": false
                            }
                          ],
                          "areas":{
                              "name": "SALES REQUEST",
                              "selected": false
                            },
                          "subcapacidades": [
                            {
                              "id": "1",
                              "text": "Available for the types of residential customers, business",
                              "type": "activity",
                              "joinTo": [
                                "2"
                              ],
                              "joinElse": ""
                            },
                            {
                              "id": "2",
                              "text": "¿Type Customer Correct?",
                              "type": "if",
                              "joinTo": [
                                "3"
                              ],
                              "joinElse": ""
                            },
                            {
                              "id": "3",
                              "text": "Anonymous Customer",
                              "type": "activity",
                              "joinTo": [
                                "4"
                              ],
                              "joinElse": ""
                            },
                            {
                              "id": "4",
                              "text": "Sales Prepaid",
                              "type": "activity",
                              "joinTo": [
                                "5"
                              ],
                              "joinElse": ""
                            },
                            {
                              "id": "5",
                              "text": "The product allows you to add contracts",
                              "type": "activity",
                              "joinTo": [
                                "6"
                              ],
                              "joinElse": ""
                            },
                            {
                                "id": "6",
                                "text": "3",
                                "type": "end",
                                "joinTo": [""],
                                "joinElse": ""
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "name": "Customer Registration",
                      "selected": false,
                      "capacidades": [
                        {
                          "name": "Contact Creation",
                          "selected": false,
                          "kpis": [],
                          "aplicaciones": [
                            {
                              "name": "Amdocs CRM",
                              "selected": false
                            },
                            {
                              "name": "Opus",
                              "selected": false
                            }
                          ],
                          "areas":{
                              "name": "SALES REQUEST",
                              "selected": false
                            },
                          "subcapacidades": []
                        },
                        {
                          "name": "Customer Creation",
                          "selected": false,
                          "kpis": [
                            {
                              "name": "# Customers",
                              "selected": false
                            }
                          ],
                          "aplicaciones": [
                            {
                              "name": "Opus",
                              "selected": false
                            },
                            {
                              "name": "Amdocs Billing",
                              "selected": false
                            },
                            {
                              "name": "OMS",
                              "selected": false
                            }
                          ],
                          "areas":{
                              "name": "SALES REQUEST",
                              "selected": false
                            },
                          "subcapacidades": []
                        },
                        {
                          "name": "Address Validation",
                          "selected": false,
                          "kpis": [],
                          "aplicaciones": [
                            {
                              "name": "AT&T API",
                              "selected": false
                            }
                          ],
                          "areas":{
                              "name": "SALES REQUEST",
                              "selected": false
                            },
                          "subcapacidades": [
                            {
                              "id": "1",
                              "text": "Shipping addresses and Tax are required",
                              "type": "activity",
                              "joinTo": [
                                "2"
                              ],
                              "joinElse": ""
                            },
                            {
                              "id": "2",
                              "text": "Paperless is optional",
                              "type": "activity",
                              "joinTo": [
                                "2"
                              ],
                              "joinElse": ""
                            }
                          ]
                        },
                        {
                          "name": "Credit Prevalidation",
                          "selected": false,
                          "kpis": [
                            {
                              "name": "# Contract Orders",
                              "selected": false
                            }
                          ],
                          "aplicaciones": [
                            {
                              "name": "iCAS",
                              "selected": false
                            }
                          ],
                          "areas":{
                              "name": "SALES REQUEST",
                              "selected": false
                            },
                          "subcapacidades": []
                        },
                        {
                          "name": "Document Repository",
                          "selected": false,
                          "kpis": [],
                          "aplicaciones": [
                            {
                              "name": "Maximage",
                              "selected": false
                            }
                          ],
                          "areas":{
                              "name": "SALES REQUEST",
                              "selected": false
                            },
                          "subcapacidades": []
                        }
                      ]
                    },
                    {
                      "name": "Credit Check",
                      "selected": false,
                      "capacidades": [
                        {
                          "name": "Credit Score",
                          "selected": false,
                          "kpis": [
                            {
                              "name": "# Contract Orders and status",
                              "selected": false
                            }
                          ],
                          "aplicaciones": [
                            {
                              "name": "iCAS",
                              "selected": false
                            }
                          ],
                          "areas":{
                              "name": "SALES REQUEST",
                              "selected": false
                            },
                          "subcapacidades": [
                            {
                              "id": "1",
                              "text": "It requieres tax and legal customer data",
                              "type": "activity",
                              "joinTo": [
                                "2"
                              ],
                              "joinElse": ""
                            },
                            {
                              "id": "2",
                              "text": "Validation postpaid accounts with credit, may have additives Same Customer Account",
                              "type": "activity",
                              "joinTo": [
                                "2"
                              ],
                              "joinElse": ""
                            }
                          ]
                        },
                        {
                          "name": "Black List",
                          "selected": false,
                          "kpis": [],
                          "aplicaciones": [
                            {
                              "name": "AT&T Blacklist Management",
                              "selected": false
                            }
                          ],
                          "areas":{
                              "name": "SALES REQUEST",
                              "selected": false
                            },
                          "subcapacidades": []
                        }
                      ]
                    },
                    {
                      "name": "Product Assignment",
                      "selected": false,
                      "capacidades": [
                        {
                          "name": "Portability (Port in)",
                          "selected": false,
                          "kpis": [
                            {
                              "name": "# Port-in",
                              "selected": false
                            }
                          ],
                          "aplicaciones": [
                            {
                              "name": "NPS",
                              "selected": false
                            }
                          ],
                          "areas":{
                              "name": "SALES REQUEST",
                              "selected": false
                            },
                          "subcapacidades": [
                            {
                              "id": "1",
                              "text": "The product used in series CPP and MPP mode",
                              "type": "activity",
                              "joinTo": [
                                "2"
                              ],
                              "joinElse": ""
                            }
                          ]
                        },
                        {
                          "name": "NIR Management",
                          "selected": false,
                          "kpis": [],
                          "aplicaciones": [
                            {
                              "name": "Amdocs SRM",
                              "selected": false
                            }
                          ],
                          "areas":{
                              "name": "SALES REQUEST",
                              "selected": false
                            },
                          "subcapacidades": [
                            {
                              "id": "1",
                              "text": "Network resources used in the SIM will use temporary network resources",
                              "type": "activity",
                              "joinTo": [
                                "2"
                              ],
                              "joinElse": ""
                            }
                          ]
                        },
                        {
                          "name": "Store Catalog",
                          "selected": false,
                          "kpis": [
                            {
                              "name": "# Stores",
                              "selected": false
                            }
                          ],
                          "aplicaciones": [
                            {
                              "name": "Amdocs SRM",
                              "selected": false
                            }
                          ],
                          "areas":{
                              "name": "SALES REQUEST",
                              "selected": false
                            },
                          "subcapacidades": [
                            {
                              "id": "1",
                              "text": "In the sales process allows hiring Add-ons available in the plan",
                              "type": "activity",
                              "joinTo": [
                                "2"
                              ],
                              "joinElse": ""
                            }
                          ]
                        },
                        {
                          "name": "Commercial Offer",
                          "selected": false,
                          "kpis": [
                            {
                              "name": "# Rate Plans",
                              "selected": false
                            }
                          ],
                          "aplicaciones": [
                            {
                              "name": "Amdocs MEC",
                              "selected": false
                            }
                          ],
                          "areas":{
                              "name": "SALES REQUEST",
                              "selected": false
                            },
                          "subcapacidades": [
                            {
                              "id": "1",
                              "text": "In the product postpaid plans \"Add-On Control\" can be marketed as Add-on ",
                              "type": "activity",
                              "joinTo": [
                                "2"
                              ],
                              "joinElse": ""
                            }
                          ]
                        },
                        {
                          "name": "Form Creator",
                          "selected": false,
                          "kpis": [],
                          "aplicaciones": [
                            {
                              "name": "eDOC",
                              "selected": false
                            }
                          ],
                          "areas":{
                              "name": "SALES REQUEST",
                              "selected": false
                            },
                          "subcapacidades": []
                        }
                      ]
                    },
                    {
                      "name": "Policy Check",
                      "selected": false,
                      "capacidades": [
                        {
                          "name": "AT&T Credit Policy",
                          "selected": false,
                          "kpis": [
                            {
                              "name": "# Contract and warranties",
                              "selected": false
                            }
                          ],
                          "aplicaciones": [
                            {
                              "name": "iCAS",
                              "selected": false
                            }
                          ],
                          "areas":{
                              "name": "SALES REQUEST",
                              "selected": false
                            },
                          "subcapacidades": []
                        },
                        {
                          "name": "Print Documents",
                          "selected": false,
                          "kpis": [],
                          "aplicaciones": [
                            {
                              "name": "eDOC",
                              "selected": false
                            }
                          ],
                          "areas":{
                              "name": "SALES REQUEST",
                              "selected": false
                            },
                          "subcapacidades": []
                        },
                        {
                          "name": "Storage Documents",
                          "selected": false,
                          "kpis": [],
                          "aplicaciones": [
                            {
                              "name": "Maximage",
                              "selected": false
                            }
                          ],
                          "areas":{
                              "name": "SALES REQUEST",
                              "selected": false
                            },
                          "subcapacidades": []
                        }
                      ]
                    },
                    {
                      "name": "Picking",
                      "selected": false,
                      "capacidades": [
                        {
                          "name": "Inventory",
                          "selected": false,
                          "kpis": [
                            {
                              "name": "# Devices by Contract Order",
                              "selected": false
                            }
                          ],
                          "aplicaciones": [
                            {
                              "name": "OFA",
                              "selected": false
                            }
                          ],
                          "areas":{
                              "name": "SALES REQUEST",
                              "selected": false
                            },
                          "subcapacidades": []
                        },
                        {
                          "name": "Supply Chain",
                          "selected": false,
                          "kpis": [
                            {
                              "name": "# contract orders and devices",
                              "selected": false
                            }
                          ],
                          "aplicaciones": [
                            {
                              "name": "ASD",
                              "selected": false
                            }
                          ],
                          "areas":{
                              "name": "SALES REQUEST",
                              "selected": false
                            },
                          "subcapacidades": []
                        },
                        {
                          "name": "Cost Accounting",
                          "selected": false,
                          "kpis": [
                            {
                              "name": "Conciliation",
                              "selected": false
                            }
                          ],
                          "aplicaciones": [
                            {
                              "name": "Oracle GL",
                              "selected": false
                            }
                          ],
                          "areas":{
                              "name": "SALES REQUEST",
                              "selected": false
                            },
                          "subcapacidades": []
                        },
                        {
                          "name": "Assignment",
                          "selected": false,
                          "kpis": [
                            {
                              "name": "# contract",
                              "selected": false
                            }
                          ],
                          "aplicaciones": [
                            {
                              "name": "Opus",
                              "selected": false
                            },
                            {
                              "name": "Amdocs",
                              "selected": false
                            }
                          ],
                          "areas":{
                              "name": "SALES REQUEST",
                              "selected": false
                            },
                          "subcapacidades": []
                        },
                        {
                          "name": "Payments",
                          "selected": false,
                          "kpis": [],
                          "aplicaciones": [],
                          "areas":{
                              "name": "SALES REQUEST",
                              "selected": false
                            },
                          "subcapacidades": [
                            {
                              "id": "1",
                              "text": "Allows recurring charge and debit from the sale of the product",
                              "type": "activity",
                              "joinTo": [
                                "2"
                              ],
                              "joinElse": ""
                            },
                            {
                              "id": "2",
                              "text": "Payment Credit and debit card, buy back",
                              "type": "activity",
                              "joinTo": [
                                "2"
                              ],
                              "joinElse": ""
                            },
                            {
                                "id": "5",
                                "text": "8",
                                "type": "end",
                                "joinTo": [""],
                                "joinElse": ""
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "name": "Payment Registration",
                      "selected": false,
                      "capacidades": [
                        {
                          "name": "Equipment Invoice",
                          "selected": false,
                          "kpis": [
                            {
                              "name": "# Devices",
                              "selected": false
                            }
                          ],
                          "aplicaciones": [
                            {
                              "name": "Invoice Gateway",
                              "selected": false
                            }
                          ],
                          "areas":{
                              "name": "SALES REQUEST",
                              "selected": false
                            },
                          "subcapacidades": [
                            {
                              "id": "1",
                              "text": "If the commercial supply line is assigned to a device, the process will issue",
                              "type": "activity",
                              "joinTo": [
                                "2"
                              ],
                              "joinElse": ""
                            }
                          ]
                        },
                        {
                          "name": "Sales Accounting",
                          "selected": false,
                          "kpis": [
                            {
                              "name": "Conciliation",
                              "selected": false
                            }
                          ],
                          "aplicaciones": [
                            {
                              "name": "CAPM",
                              "selected": false
                            }
                          ],
                          "areas":{
                              "name": "SALES REQUEST",
                              "selected": false
                            },
                          "subcapacidades": []
                        },
                        {
                          "name": "Accounting Configuration",
                          "selected": false,
                          "kpis": [
                            {
                              "name": "# Root account",
                              "selected": false
                            }
                          ],
                          "aplicaciones": [
                            {
                              "name": "CAPM",
                              "selected": false
                            }
                          ],
                          "areas":{
                              "name": "SALES REQUEST",
                              "selected": false
                            },
                          "subcapacidades": []
                        },
                        {
                          "name": "Payment Accounting",
                          "selected": false,
                          "kpis": [
                            {
                              "name": "Conciliation",
                              "selected": false
                            }
                          ],
                          "aplicaciones": [
                            {
                              "name": "CAPM",
                              "selected": false
                            }
                          ],
                          "areas":{
                              "name": "SALES REQUEST",
                              "selected": false
                            },
                          "subcapacidades": []
                        }
                      ]
                    },
                    {
                      "name": "Delivery",
                      "selected": false,
                      "capacidades": [
                        {
                          "name": "Store Delivery",
                          "selected": false,
                          "kpis": [
                            {
                              "name": "# contract orders",
                              "selected": false
                            }
                          ],
                          "aplicaciones": [
                            {
                              "name": "Opus",
                              "selected": false
                            }
                          ],
                          "areas":{
                              "name": "SALES REQUEST",
                              "selected": false
                            },
                          "subcapacidades": []
                        },
                        {
                          "name": "Home Delivery",
                          "selected": false,
                          "kpis": [
                            {
                              "name": "# contract orders",
                              "selected": false
                            }
                          ],
                          "aplicaciones": [
                            {
                              "name": "ASD",
                              "selected": false
                            }
                          ],
                          "areas":{
                              "name": "SALES REQUEST",
                              "selected": false
                            },
                          "subcapacidades": [
                            {
                              "id": "1",
                              "text": "it considers product delivery order in store and courier delivery",
                              "type": "activity",
                              "joinTo": [
                                "2"
                              ],
                              "joinElse": ""
                            },
                            {
                                "id": "5",
                                "text": "10",
                                "type": "end",
                                "joinTo": [""],
                                "joinElse": ""
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "name": "Notifications",
                      "selected": false,
                      "capacidades": [
                        {
                          "name": "Close credit Policy",
                          "selected": false,
                          "kpis": [
                            {
                              "name": "# Contract Orders",
                              "selected": false
                            }
                          ],
                          "aplicaciones": [
                            {
                              "name": "iCAS",
                              "selected": false
                            }
                          ],
                          "areas":{
                              "name": "SALES REQUEST",
                              "selected": false
                            },
                          "subcapacidades": []
                        },
                        {
                          "name": "Warranties Postpaid Products",
                          "selected": false,
                          "kpis": [
                            {
                              "name": "# warranties",
                              "selected": false
                            }
                          ],
                          "aplicaciones": [
                            {
                              "name": "CAPM",
                              "selected": false
                            }
                          ],
                          "areas":{
                              "name": "SALES REQUEST",
                              "selected": false
                            },
                          "subcapacidades": []
                        }
                      ]
                    },
                    {
                      "name": "Activation",
                      "selected": false,
                      "capacidades": [
                        {
                          "name": "Temporary Resource Management",
                          "selected": false,
                          "kpis": [],
                          "aplicaciones": [
                            {
                              "name": "TBD",
                              "selected": false
                            }
                          ],
                          "areas":{
                              "name": "SALES REQUEST",
                              "selected": false
                            },
                          "subcapacidades": []
                        },
                        {
                          "name": "Provisioning",
                          "selected": false,
                          "kpis": [
                            {
                              "name": "# contracts",
                              "selected": false
                            }
                          ],
                          "aplicaciones": [
                            {
                              "name": "OMS",
                              "selected": false
                            }
                          ],
                          "areas":{
                              "name": "SALES REQUEST",
                              "selected": false
                            },
                          "subcapacidades": []
                        },
                        {
                          "name": "Activation Register",
                          "selected": false,
                          "kpis": [
                            {
                              "name": "# contracts",
                              "selected": false
                            }
                          ],
                          "aplicaciones": [
                            {
                              "name": "INAR",
                              "selected": false
                            }
                          ],
                          "areas":{
                              "name": "SALES REQUEST",
                              "selected": false
                            },
                          "subcapacidades": []
                        }
                      ]
                    }
                  ]
                },
                {
                  "title": "Sales at Store Prepaid",
                  "open": false,
                  "procesos": []
                }
              ]
            },
            {
              "title": "Otro Megaproceso más",
              "open": false,
              "macroprocesos": [
                {
                  "title": "Another Sales at Store Prepaid",
                  "open": false,
                  "procesos": [
                    {
                      "name": "Queue Management",
                      "selected": false,
                      "capacidades": [
                        {
                          "name": "Customer Billing System Identification",
                          "selected": false,
                          "kpis": [],
                          "aplicaciones": [
                            {
                              "name": "Coxistence (MRD)",
                              "selected": false
                            }
                          ],
                          "areas":{
                              "name": "SALES REQUEST",
                              "selected": false
                            },
                        },
                        {
                          "name": "Customer Identification",
                          "selected": false,
                          "kpis": [],
                          "aplicaciones": [
                            {
                              "name": "Welcome Center Opus",
                              "selected": false
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "title": "BSS",
          "name": "Business Support System",
          "color": "#EC7400",
          "selected": false,
          "macroprocesos": []
        },
        {
          "title": "EM",
          "name": "Enterprise Management",
          "color": "#B5BF00",
          "selected": false,
          "macroprocesos": []
        },
        {
          "title": "BI",
          "name": "Business Intelligence",
          "color": "#0066B0",
          "selected": false,
          "macroprocesos": []
        }
      ]
    },
    {
      "title": "IS",
      "name": "Information System",
      "backColor": "rgba(0,158,222,.8)",
      "img": "url(assets/img/imagen_IS.png)",
      "flipped": false,
      "dominios": []
    },
    {
      "title": "TA",
      "name": "Technology Administration",
      "backColor": "rgba(72,171,0,.8)",
      "img": "url(assets/img/imagen_TA.png)",
      "flipped": false,
      "dominios": []
    }
  ]
};
        
    };
    controller.$inject = ['$scope', '$rootScope', '$routeParams'];
    angular.module('app').controller('AppController', controller);

})();