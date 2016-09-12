import tape from 'tape';
import parameterTemplates from '../src/parameterTemplates';

tape('boolean', (t) => {
  const test = parameterTemplates.boolean.typeCheckFunction;

  t.doesNotThrow(() => test(true, {}), 'should type check properly');
  t.doesNotThrow(() => test(false, {}), 'should type check properly');
  t.throws(() => test(0.1, {}), 'should type check properly');
  t.throws(() => test(-100000, {}), 'should type check properly');
  t.throws(() => test(Math.PI, {}), 'should type check properly');
  t.throws(() => test(-Infinity, {}), 'should type check properly');
  t.throws(() => test(NaN, {}), 'should type check properly');
  t.throws(() => test(0, {}), 'should type check properly');
  t.throws(() => test('10', {}), 'should type check properly');
  t.throws(() => test(null, {}), 'should type check properly');
  t.throws(() => test(/abc/, {}), 'should type check properly');
  t.throws(() => test(undefined, {}), 'should type check properly');
  t.throws(() => test([0, 1, 2], {}), 'should type check properly');

  t.end();
});

tape('interger', (t) => {
  const test = parameterTemplates.integer.typeCheckFunction;

  t.doesNotThrow(() => test(-100000, {}), 'should type check properly');
  t.doesNotThrow(() => test(-Infinity, {}), 'should type check properly');
  t.doesNotThrow(() => test(0, {}), 'should type check properly');
  t.throws(() => test(true, {}), 'should type check properly');
  t.throws(() => test(false, {}), 'should type check properly');
  t.throws(() => test(0.1, {}), 'should type check properly');
  t.throws(() => test(Math.PI, {}), 'should type check properly');
  t.throws(() => test(NaN, {}), 'should type check properly');
  t.throws(() => test('10', {}), 'should type check properly');
  t.throws(() => test(null, {}), 'should type check properly');
  t.throws(() => test(/abc/, {}), 'should type check properly');
  t.throws(() => test(undefined, {}), 'should type check properly');
  t.throws(() => test([0, 1, 2], {}), 'should type check properly');


  const def = { min: 0, max: 2 };
  t.equal(test(-1, def), 0, 'should clip min');
  t.equal(test(3, def), 2, 'should clip max');

  t.end();
});

tape('float', (t) => {
  const test = parameterTemplates.float.typeCheckFunction;

  t.doesNotThrow(() => test(-100000, {}), 'should type check properly');
  t.doesNotThrow(() => test(-Infinity, {}), 'should type check properly');
  t.doesNotThrow(() => test(0, {}), 'should type check properly');
  t.doesNotThrow(() => test(0.1, {}), 'should type check properly');
  t.doesNotThrow(() => test(Math.PI, {}), 'should type check properly');
  t.throws(() => test(true, {}), 'should type check properly');
  t.throws(() => test(false, {}), 'should type check properly');
  t.throws(() => test(NaN, {}), 'should type check properly');
  t.throws(() => test('10', {}), 'should type check properly');
  t.throws(() => test(null, {}), 'should type check properly');
  t.throws(() => test(/abc/, {}), 'should type check properly');
  t.throws(() => test(undefined, {}), 'should type check properly');
  t.throws(() => test([0, 1, 2], {}), 'should type check properly');


  const def = { min: 0, max: 2 };
  t.equal(test(-1, def), 0, 'should clip min');
  t.equal(test(3, def), 2, 'should clip max');

  t.end();
});

tape('string', (t) => {
  const test = parameterTemplates.string.typeCheckFunction

  t.doesNotThrow(() => test('10'), 'should type check properly');
  t.throws(() => test(-100000), 'should type check properly');
  t.throws(() => test(-Infinity), 'should type check properly');
  t.throws(() => test(true), 'should type check properly');
  t.throws(() => test(false), 'should type check properly');
  t.throws(() => test(0.1), 'should type check properly');
  t.throws(() => test(Math.PI), 'should type check properly');
  t.throws(() => test(NaN), 'should type check properly');
  t.throws(() => test(0), 'should type check properly');
  t.throws(() => test(null), 'should type check properly');
  t.throws(() => test(/abc/), 'should type check properly');
  t.throws(() => test(undefined), 'should type check properly');
  t.throws(() => test([0, 1, 2]), 'should type check properly');

  t.end();
});

tape('enum', (t) => {
  const test = parameterTemplates.enum.typeCheckFunction
  const def = { list: ['a', '1'] };

  t.doesNotThrow(() => test('a', def), 'should type check properly');
  t.throws(() => test('c', def), 'should type check properly');
  t.throws(() => test(1, def), 'should type check properly');

  t.end();
});

