import { Item } from './itemDefinition';

export let ITEMS: Item[] = [

    {
        id: 11, itemName: 'Initial Assessment & Requirements', saveFlag: false, questions: [
            {
                questionId: 1,
                value: 'Is the initial assessment in scope?',
                weight: 3
            },
            {
                questionId: 2,
                value: 'Complexity of MDM Landscape</br>Are the number of attributes > 20 and/or number of source systems> 5</br>Are there integration points more than 10?',
                weight: 3
            },
            {
                questionId: 3,
                value: 'Is Solution Architecture document in scope?',
                weight: 3
            },
            {
                questionId: 4,
                value: 'Is functional requirements document in scope?',
                weight: 3
            }
        ]
    },
    {
        id: 12, itemName: 'Business Proxy (Composites)', saveFlag: false, questions: [
            {
                questionId: 1,
                value: 'Is the underlying data model complex?',
                weight: 3
            },
            {
                questionId: 2,
                value: 'Is there a lot of business logic (includes validations as well) to be performed in BP?',
                weight: 3
            },
            {
                questionId: 3,
                value: 'Are there multiple transactions to be invoked?',
                weight: 1
            }
        ]
    },
    {
        id: 13, itemName: 'Physical & Logical Data Model', saveFlag: true, questions: [
            {
                questionId: 1,
                value: 'Is this a new domain?',
                weight: 3
            },
            {
                questionId: 2,
                value: 'Is there more than 20 tables to be created (Choose to certain extent if between 10 and 20) ?',
                weight: 2
            }
        ]
    },
    {
        id: 14, itemName: 'Data Extensions', saveFlag: true, questions: [
            {
                questionId: 1,
                value: 'Is there logical extensions involved?',
                weight: 2
            },
            {
                questionId: 2,
                value: 'Are there additional validations to be done to OOTB generated services & objects?',
                weight: 2
            }
        ]
    },
    {
        id: 15, itemName: 'Data Additions', saveFlag: false, questions: [
            {
                questionId: 1,
                value: 'Are there additional validations to be done to OOTB generated services & objects?',
                weight: 2
            }
        ]
    },
    {
        id: 16, itemName: 'Code Types', saveFlag: false, questions: [
            {
                questionId: 1,
                value: 'Does the code types have custom fields outside MDM Standards?',
                weight: 3
            },
            {
                questionId: 2,
                value: 'Do you want BA UI to support new code types?',
                weight: 3
            }
        ]
    },
    {
        id: 17, itemName: 'Behavior Extensions', saveFlag: false, questions: [
            {
                questionId: 1,
                value: 'Is the business logic complex - integration with external systems, database queries?',
                weight: 3
            }
        ]
    },
    {
        id: 18, itemName: 'Notifications (Pub Sub)', saveFlag: false, questions: [
            {
                questionId: 1,
                value: 'Does creation of notification message require XSLT translation or equivalent?',
                weight: 3
            },
            {
                questionId: 2,
                value: 'Does creation of notification message require ASI transformation?',
                weight: 3
            }
        ]
    },
    {
        id: 19, itemName: 'Suspect Duplicate Processing', saveFlag: false, questions: [
            {
                questionId: 1,
                value: 'Is it Probabilistic Matching?',
                weight: 3
            },
            {
                questionId: 2,
                value: 'Is the Match algorithm complex?',
                weight: 2
            },
            {
                questionId: 3,
                value: 'Is auto collapse on?',
                weight: 1
            },
            {
                questionId: 4,
                value: 'Should suspects be notified to external systems?',
                weight: 1
            },
            {
                questionId: 5,
                value: 'Is second level of matching applied to correct the suspect category?',
                weight: 2
            }
        ]
    },
    {
        id: 20, itemName: 'Event Manager', saveFlag: false, questions: [
            {
                questionId: 1,
                value: 'Should Event Manager be used to collapse parties?',
                weight: 2
            },
            {
                questionId: 2,
                value: 'Should a custom Message Driven Bean be developed to manage custom events?',
                weight: 3
            }
        ]
    },
    {
        id: 21, itemName: 'Batch Processor Customizations', saveFlag: false, questions: [
            {
                questionId: 1,
                value: 'Any customizations to Batch Processor Application (Java Classes)?',
                weight: 2
            },
            {
                questionId: 2,
                value: 'New Scripts to be written as wrapper to Batch Processor?',
                weight: 1
            }
        ]
    },
    {
        id: 22, itemName: 'Search Framework Customization', saveFlag: false, questions: [
            {
                questionId: 1,
                value: 'Do you want to go for Denormalized Search?',
                weight: 3
            },
            {
                questionId: 2,
                value: 'Are you introducing new Search parameters?',
                weight: 2
            },
            {
                questionId: 3,
                value: 'Are there major changes to underlying SQLs or Result Set Processor?',
                weight: 3
            }
        ]
    },
    {
        id: 23, itemName: 'User Interface', saveFlag: false, questions: [
            {
                questionId: 1,
                value: 'Do you want DSUI to work with new objects?',
                weight: 2
            },
            {
                questionId: 2,
                value: 'Are there new screens to be developed for DSUI?',
                weight: 3
            },
            {
                questionId: 3,
                value: 'Do you want Product UI to work with new objects?',
                weight: 3
            }
        ]
    },
    {
        id: 24, itemName: 'ODM Rules', saveFlag: false, questions: [
            {
                questionId: 1,
                value: 'Are these rules supposed to integrate with database or external systems as part of the business logic?',
                weight: 3
            }
        ]
    },
    {
        id: 25, itemName: 'External Rules', saveFlag: false, questions: [
            {
                questionId: 1,
                value: 'Is there complex business logic on external rules?',
                weight: 3
            }
        ]
    },
    {
        id: 26, itemName: 'Hierarchy', saveFlag: false, questions: [
            {
                questionId: 1,
                value: 'Are you building custom Hierarchy Framework? If no, it is assumed you are using MDM Hierarchy Framework',
                weight: 3
            },
            {
                questionId: 2,
                value: 'Do you want BAUI to manage Hierarchy?',
                weight: 3
            }
        ]
    },
    {
        id: 27, itemName: 'Integration', saveFlag: false, questions: [
            {
                questionId: 1,
                value: 'Is there an integration with Quality Stage or Trillium?',
                weight: 2
            },
            {
                questionId: 2,
                value: 'Is there an integration with D&B?',
                weight: 2
            },
            {
                questionId: 3,
                value: 'Is there an integration with client application?',
                weight: 3
            }
        ]
    },
    {
        id: 28, itemName: 'Web Services', saveFlag: false, questions: [
            {
                questionId: 1,
                value: 'Custom Web Services to be developed?',
                weight: 3
            }
        ]
    },
    {
        id: 29, itemName: 'Spec', saveFlag: false, questions: [
            {
                questionId: 1,
                value: 'Are there complex validations on spec?',
                weight: 3
            },
            {
                questionId: 2,
                value: 'Are there code types in spec?',
                weight: 2
            }
        ]
    },
    {
        id: 30, itemName: 'Security', saveFlag: false, questions: [
            {
                questionId: 1,
                value: 'Is there an LDAP Integration?',
                weight: 3
            }
        ]
    },
    {
        id: 31, itemName: 'Environment Set Up', saveFlag: false, questions: [
            {
                questionId: 1,
                value: 'Is this a new MDM Installation?',
                weight: 3
            },
            {
                questionId: 2,
                value: 'Should a build system be set up?',
                weight: 3
            }
        ]
    },
    {
        id: 32, itemName: 'UAT, Initial Load & Go-Live Support', saveFlag: false, questions: [
            {
                questionId: 1,
                value: 'Is the volume of data high? Choose Yes for > 20M, To Certain extent for <20M & >5M & No for <5M ?',
                weight: 3
            }
        ]
    },
];
