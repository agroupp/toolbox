# JSON that can extend each other

How often did you think about code repetition in your configuration files? How great would it be to extend it in a manner similar to “tsconfig.json” does it? So, let’s do it.

## Example
```json
// base.json
{
  "ship": "Enterprise"
}

// kirk.json
{
  "extends": "./base.json",
  "name": "Kirk"
}

// spok.json
{
  "extends": "./base.json",
  "name": "Spok"
}
```
```typescript
const kirk = await parseJson('./kirk.json');
/*
`kirk` will be:
{
  "ship": "Enterprise",
  "name": "Kirk"
}
*/

const spok = await parseJson('./spok.json');
/*
`spok` will be:
{
  "ship": "Enterprise",
  "name": "Spok"
}
*/
```
Feel free to place your jsons in different directories, override properties and use comments inside it.

Feedback and stars are highly appreciated 😊
