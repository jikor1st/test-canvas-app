import React, { lazy, ComponentType } from 'react';

// const NamedLazy = <T extends {}, U extends keyof T>(
//   loader: (x?: string) => Promise<T>,
// ) =>
//   new Proxy({} as unknown as T, {
//     get: (target, componentName: string | symbol) => {
//       if (typeof componentName === 'string') {
//         return lazy(() =>
//           loader(componentName).then(x => ({
//             default: x[componentName as U] as any as React.ComponentType<any>,
//           })),
//         );
//       }
//     },
//   });

// function NamedLazy<
//   T extends React.ComponentType<any>,
//   I extends { [K2 in K]: T },
//   K extends keyof I,
// >(factory: () => Promise<I>, name: K): I {
//   return Object.create({
//     [name]: React.lazy(() =>
//       factory().then(module => ({ default: module[name] })),
//     ),
//   });
// }

// const NamedLazy = (resolver, name = 'default') => {
//   return lazy(async () => {
//     const resolved = await resolver();
//     return { default: resolved[name] };
//   });
// };

export {};
