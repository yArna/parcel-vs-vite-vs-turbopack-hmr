# Parcel vs Vite Reload Benchmark

> Vite Reload too slow for large web app development

![Vite重载速度](https://github.com/yArna/parcel-vs-vite-vs-turbopack-hmr/assets/82231420/f568d336-6946-406f-a927-9f57ec90433c)



Vite claims to be fast, and indeed, we initially experience good speed when using it on small projects. However, when we use it on a real world large web app, we encounter a poor experience: page reloading is extremely slow, and using the network panel in Devtool may result in freezing for several minutes.

The reason is that Vite's current unbundle mechanism is not suitable for large web app development, as it reloads a large number of code files and generates numerous requests on every page refresh. While Vite has [Dependency Pre-Bundling](https://v2.vitejs.dev/guide/dep-pre-bundling.html) to solve third-party dependency issues, for large web app, our own codebase is also substantial. When a page has 500 source files simultaneously, the development experience becomes terrible, and this number is not uncommon for large web app. Our real projects have 1500 to 2500 source files.

If the page undergoes hot reload, the speed is very fast, but not every code modification can be hot reloaded. Furthermore, page reloading (including page navigation) is often required during development and testing.

Users initially have a good experience using Vite for faster development. However, as the project grows, they find that page reloading becomes slower and freezing may occur for several minutes when using the network panel in Devtool. At this point, users may discover that tools like Parcel, which bundle during development, provide a better experience. Although Parcel may have a slower startup, it becomes fast once it is up and running, and the network panel in Devtool does not freeze.

For large web app, the current unbundle mechanism is not suitable because there will always be a significant number of requests. Perhaps Vite can provide an option to bundle during development, where the majority of code files are bundled, or find other ways to reduce the number of requests.

I believe this is a pressing issue that Vite needs to address because over time, the projects of Vite users will continue to grow. When users realize that the development experience with Vite is deteriorating, they will face the dilemma of migrating to development bundling tools like Parcel. Vite has excellent development experience and ecosystem, and I hope it can solve this problem and retain users of large-scale web apps within the Vite ecosystem.

## Benchmark

- Recorded over 5 runs
- 2.4 GHz Intel Core i5 - MacBook Pro

|                        | Vite (4.3.9)  | Parcel (2.9.3) |
| ---------------------- | ------------- | -------------- |
| Components             | 2500          | 2500           |
| Requests               | 2514          | 4             |
| Page Load              | 5.88s `100%`  | 0.12s `2%`     |
| Devtool Network Freeze | 75.28s `100%` | 1.02s `1.3%`   |



## Related
- [Very slow browser dev-tools after migrating to Vite #12980](https://github.com/vitejs/vite/discussions/12980)
- [Page reload on dev server is very slow in large codebase #7608](https://github.com/vitejs/vite/issues/7608)
- [How to prevent creating 1000 chunks ? #11711](https://github.com/vitejs/vite/discussions/11711)
---

[中文](./README_ZH.md)
