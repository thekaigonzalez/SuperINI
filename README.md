# SuperINI - INI Parsing next level

Supports Comments, values, addition, types, code, categories, and more!

This conforms to the INI Lexer standard.

:thumbsup:

## Examples

Complex INI

```ini

[info]
name='John Doe'
port='127.0.0.1'

[database]
key='password'

```

```js

{
  info: { name: 'John Doe', port: '127.0.0.1' },
  database: { key: 'password' }
}

```