describe('simple pipeline', () => {
  const toUpper = str => str.toUpperCase();
  const prepend = pre => str => pre + str;
  const append = suffix => str => str + suffix;

  test('applies the functions in reverse order', () => {
    const res = 'string'
      |> toUpper 
      |> prepend('____');


    expect(res).toEqual('____STRING');
  });

  test('allows arrow fns for functions with multiple inputs', () => {
    const append = (str, post) => str + post;

    const res = 'test' |> toUpper |> (x => append(x, '$$'));
    expect(res).toEqual('TEST$$');
  });

  test('applies the fn (and casts 2nd arg to `undefined`) if all arguments aren`t passed', () => {
    const append = (str, post) => str + post;

    const res = 'test' |> toUpper |> append;

    expect(res).toEqual('TESTundefined');
  });

  test('usage with promises/async isn`t as nice', async () => {
    const then = cb => promise => promise.then(cb)
    const catch_ = cb => promise => promise.catch(cb)
    const genPromise = (val) => new Promise(resolve => resolve(val));

    const val =
      genPromise('test')
      |> then(toUpper)
      |> then(prepend('_'))

    const result = await val;
    expect(result).toEqual('_TEST')
  })
});
