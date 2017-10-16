# minimal-result

A minimal, Flow-typed, Rust-style Result library for functional exception handling.

# Purpose

A result type is a [disjoint union](https://flow.org/en/docs/types/unions/) with two type variables. A result value contains _either_ a data or error value.

```js
type Result<Data, Error> =
    {| tag: 'Ok', +data: Data |}
  | {| tag: 'Err', +err: Error |}
```

A function should return a `Result` when errors are expected and recoverable.

Consider a parsing function that accepts a string and returns an abstract syntax tree (`(s: string) => AST`). If the string cannot be parsed - if it is malformed - the function should return an error indicating which line/character the error occurs on. If it can be parsed, it ought to return an AST. In other words, the function should have the type `(s: string) => Result<AST,ParseError>` where `ParseError` might resemble `{ explanation: string, line: number, character: number }`.

For more on the Result types, see [the Rust documentation](https://doc.rust-lang.org/std/result/) and the [`r-result` rationale section](https://github.com/Havvy/result#rationale-and-rant-on-error-handling).

[`r-result`](https://github.com/Havvy/result) is a similar javascript library. The publication of `minimal-result` was motivated by a desire for a library which:

- Has simple flow types, and is published with them.
- Offers a static function, rather than method-based API.

# API

- `Ok`
  - Purpose: Take a value of type `Data`, return an `Ok` `Result` with this value.
  - Type: `<Data, Error>(data: Data) => Result<Data, Error>`
- `Err`
  - Purpose: Take a value of some type `Error`, return an `Err` `Result` with this value.
  - Type: `<Data, Error>(err: Error) => Result<Data, Error>`
- `andThen`
  - Purpose: Given a `Result` and a function that returns a `Result`, apply the function to the value, unless the value is an `Err`, in which case simply return it unaltered. This can be chained together to provide "fall through" flow control.
  - Type: `<Data, NewData, Error>(result: Result<Data, Error>, f: Data => Result<NewData, Error>) => Result<NewData, Error>`

- `mapOk`
  - Purpose: Apply a function to the `Data` value within a `Result` if it is `Ok`, wrap the result in an `Ok`. `Err` falls through.
  - Type: `<Data, Error, NewData>(result: Result<Data, Error>, f: Data => NewData) => Result<NewData, Error>`
- `mapErr`
  - Type: `<Data, NewError, Error>(result: Result<Data, Error>, f: Error => NewError) => Result<Data, NewError>`
- `unwrapOrElse`
  - Type: `<Data, Error>(result: Result<Data, Error>, f: Error => Data) => Data`
- `collectResultMap`
  - Type: `<MapVal, Data, Error>(oldMap: { [key: string]: MapVal }, f: (string, MapVal) => Result<Data, Error>) => Result<{ [key: string]: Data }, Error>`
- `collectResultArray`
  - Type: `<ArrayVal, Data, Error>(oldArray: ArrayVal[], f: ArrayVal => Result<Data, Error>) => Result<Data[], Error>`
- `collectResultArrayIndexed`
  - Type: `<ArrayVal, Data, Error>(oldArray: ArrayVal[], f: (index: number, val: ArrayVal) => Result<Data, Error>) : Result<Data[], Error>`


# License

MIT

# Contributors

[Joshua Yanovski](https://github.com/pythonesque), [Björn Westergard](https://github.com/bwestergard).
