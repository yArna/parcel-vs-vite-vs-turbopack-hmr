# Parcel vs Vite 页面重载测试

> _Based on [this benchmark](https://github.com/yyx990803/vite-vs-next-turbo-hmr) by Evan You, creator of Vite._

Vite 宣称自己很快，当我们刚开始尝试在小型项目上使用时确实会感到不错的速度，但是当我们在真实的大型 Web App 上使用时，却感会遇到糟糕的体验：重新加载页面非常缓慢，并且在使用 Devtool 中的网络面板时可能会遇到长达数分钟的冻结。

原因是 Vite 目前的 unbundle 机制并不适用于大型 Web App 的开发，因为它会在每次页面刷新时重新加载大量的代码文件，产生大量的请求。 虽然 Vite 有 [Dependency Pre-Bundling](https://v2.vitejs.dev/guide/dep-pre-bundling.html) 可以解决第三方依赖的问题，但对于大型 Web App 来说，自己的代码库也很大。当一个页面的同时有 500 源文件时就就会遇到糟糕的开发体验，而这个数字对于大型 Web App 来说并不算多，我们的真实项目会有 1500 ~ 2500 的源文件数。

如果页面进行了 hot reload ，速度是非常快的，但是不是每次代码修改都能进行 hot reload， 而且在开发与测试时经常需要页面重载（包括页面的跳转），而每当遇到载 Vite 的开发体验就会变得很差。

当用户为了更快的体验而使用 Vite 时刚开始有不错的体验，但随着项目不断变大，用户会发现页面重载速度越来越慢，而且在使用 Devtool 中的网络面板时可能会遇到长达数分钟的冻结。这时候用户会发现 Parcel 这种开发时 bundle 的工具体验反而更加好，虽然他启动速度会更慢，但是只要等待启动后速度就会很快，而 Devtool 中的网络面板也不会出现冻结的情况。

对于大型 Web App 来说目前的 unbundle 机制并不适合，因为无论如何都会有大量请求，也许 Vite 可以提供一个开发时 bundle 的选项，在开发时 bundle 大多数的代码文件，或者有什么办法其他能够减少请求数量。

我认为这是 Vite 目前急需解决的问题，因为随着时间的推移，原来 Vite 的用户的项目会越来越大，当用户发现 Vite 的开发体验越来越差时，他们不得不面临迁移到开发时 bundle 的工具（如 Parcel）的问题。而 Vite 有着优秀的开发体验和生态，希望 Vite 能够解决这个问题，让大型 Web App 的用户也能留在 Vite 生态。

## Result

- Recorded over 5 runs
- 2.4 GHz Intel Core i5 - MacBook Pro

|                        | Vite (4.3.9)  | Parcel (2.9.3) |
| ---------------------- | ------------- | -------------- |
| Components             | 2500          | 2500           |
| Requests               | 2514          | 4              |
| Page Load              | 5.88s `100%`  | 0.12s `2%`     |
| Devtool Network Freeze | 75.28s `100%` | 1.02s `1.3%`   |
