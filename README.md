`lazy-preload` wraps the `React.lazy()` API and adds the ability to preload the component before it is rendered for the first time.

## Install

```sh
npm install lazy-preload
```

## Usage

**Before:**

```js
import {
    lazy,
    Suspense
} from "react";
const LazyLoadComponent = lazy(() => import("./LazyLoadComponent"));
```

**After:**

```js
import {
    Suspense
} from "react";
import {
    lazyWithPreload
} from "lazy-preload";
const LazyLoadComponent = lazyWithPreload(() => import("./LazyLoadComponent"));

// ...
LazyLoadComponent.preload();
```

To preload a component before it is rendered for the first time, the component that is returned from `lazy()` has a `preload` function attached that you can invoke. `preload()` returns a `Promise` that you can wait on if needed. The promise is idempotent, meaning that `preload()` will return the same `Promise` instance if called multiple times.

For more information about React code-splitting, `React.lazy` and `React.Suspense` , see https://reactjs.org/docs/code-splitting.html.

## Example

For example, if you need to load a component when a button is pressed, you could start preloading the component when the user hovers over the button:

```tsx
import { lazyWithPreload, LazyLoadComponent } from 'lazy-preload';
const Component = lazyWithPreload(() => import("./component"));

export function render() {
  return <LazyLoadComponent
        defaultLoadComponent={<>Icon</>}
        loading={<div>Loading</div>}
        lazyLoadComponent={Component}
    >
        <Component  {...options} />
    </LazyLoadComponent>
}
```

## Acknowledgements

Inspired by the preload behavior of [react-loadable](https://github.com/jamiebuilds/react-loadable) and [react-lazy-with-preload](https://github.com/ianschmitz/react-lazy-with-preload).
