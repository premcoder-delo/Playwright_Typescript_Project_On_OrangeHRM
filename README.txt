PlaywrightProjectForOrangeHRM/
│── package.json
│── package-lock.json
│── playwright.config.ts
│── tsconfig.json
│── .gitignore
│── README.md
│
├── env-files/
│   ├── .env.demo
│   ├── .env.qa
│   └── .env.prod
│
├── playwright/
│   └── .auth/
│       └── auth.json
│       └── ios-auth.json
│       └── andriod-auth.json
│
├── reports/
│   ├── html-report/
│   ├── allure-results/
│   └── logs/
│       ├── pim.log
│       ├── login.log
│       └── recruitment.log
│
├── test-results/
│   ├── screenshots/
│   ├── videos/
│   ├── traces/
│   └── failed-tests/
│
└── src/
    ├── core/
    │   ├── base/
    │   │   └── BasePage.ts
    │   │
    │   ├── components/
    │   │   └── TableComponent.ts
    │   │
    │   ├── config/
    │   │   └── env.ts
    │   │
    │   ├── db/
    │   │   ├── sqlite.ts
    │   │   ├── seed.ts
    │   │   ├── EmployeeRepo.ts
    │   │   └── orangehrm.db
    │   │
    │   ├── fixtures/
    │   │   └── hooks.fixture.ts
    │   │
    │   ├── logger/
    │   │   └── logger.ts
    │   │
    │   └── utils/
    │       ├── commonUtils.ts
    │       └── cryptoUtils.ts
    │
    ├── ui/
    │   ├── login/
    │   │   ├── login.page.ts
    │   │   ├── login.data.ts
    │   │   ├── login.spec.ts
    │   │   ├── global.setup.ts
    │   │   └── mobile.global.setup.ts
    │   │
    │   ├── leftNavigation/
    │   │   └── leftNavigation.page.ts
    │   │
    │   ├── pim/
    │   │   ├── pim.page.ts
    │   │   ├── pim.data.ts
    │   │   ├── pim.spec.ts
    │   │   └── pim.db.spec.ts
    │   │
    │   └── recruitment/
    │       ├── recruitment.page.ts
    │       ├── recruitment.data.ts
    │       └── recruitment.spec.ts
    │
    └── api/
    │   └── booking/
    │       ├── booking.spec.ts
    │       ├── booking.data.ts
    │       └── booking.api.ts
    │
    └── accesibility/
        └── login.a11y.spec.ts