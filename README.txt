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
│   ├── .env.prod
│   └── .env.lambdatest
│
├── playwright/
│   └── .auth/
│       ├── auth.json
│       ├── ios-auth.json
│       └── android-auth.json
│
├── reports/
│   ├── html-report/
│   ├── allure-results/
│   └── logs/
│       ├── test.log
│       ├── teardown.log
│       ├── pim.log
│       ├── recruitment.log
│       └── api.log
│
├── test-results/
│   ├── screenshots/
│   ├── videos/
│   ├── traces/
│   └── failed-tests/
│
└── src/
    ├── core/
    │
    │   ├── base/
    │   │   ├── BasePage.ts
    │   │   └── BaseAPI.ts
    │   │
    │   ├── components/
    │   │   └── TableComponent.ts
    │   │
    │   ├── config/
    │   │   ├── env.ts
    │   │   ├── execution.config.ts
    │   │   ├── lambdatest.config.ts
    │   │   ├── remote.browser.ts
    │   │   ├── global.teardown.ts
    │   │   │
    │   │   └── capabilities/
    │   │       ├── chromium.capabilities.ts
    │   │       ├── firefox.capabilities.ts
    │   │       ├── webkit.capabilities.ts
    │   │       └── mobile.capabilities.ts
    │   │
    │   ├── db/
    │   │   ├── sqlite.ts
    │   │   ├── seed.ts
    │   │   ├── EmployeeRepo.ts
    │   │   └── orangehrm.db
    │   │
    │   ├── fixtures/
    │   │   ├── ui.fixture.ts
    │   │   ├── api.fixture.ts
    │   │   └── hooks.fixture.ts
    │   │
    │   ├── logger/
    │   │   └── logger.ts
    │   │
    │   └── utils/
    │       ├── commonUtils.ts
    │       ├── FileUtils.ts
    │       └── lambdatest.utils.ts
    │
    ├── ui/
    │
    │   ├── login/
    │   │   ├── login.page.ts
    │   │   ├── login.data.ts
    │   │   ├── login.spec.ts
    │   │   ├── global.setup.ts
    │   │   └── mobile.global.setup.ts
    │   │
    │   ├── dashboard/
    │   │   └── dashboard.page.ts
    │   │
    │   ├── leftNavigation/
    │   │   └── leftNavigation.page.ts
    │   │
    │   ├── userProfile/
    │   │   └── userProfile.page.ts
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
    ├── api/
    │
    │   ├── common/
    │   │   └── auth.service.ts
    │   │
    │   └── booking/
    │       ├── booking.service.api.ts
    │       ├── booking.spec.ts
    │       └── booking.data.ts
    │
    └── accessibility/
        └── login.a11y.spec.ts