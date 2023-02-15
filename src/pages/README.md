# services

```bash
└── /src
    └── /services
        ├── /LocalStorage
        │   ├── LocalStorage.service.js
        │   └── LocalStorage.test.js
        └── index.js
```

An example of the service:

_src/services/LocalStorage/LocalStorage.service.js_

```ts
export const LocalStorage = {
  get(key) {},
  set(key, value) {},
  remove(key) {},
  clear() {},
};
```

```ts
import { LocalStorage } from '@services';

LocalStorage.get('foo');
```
