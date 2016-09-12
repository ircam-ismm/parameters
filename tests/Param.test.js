import Param from '../src/Param';
import tape from 'tape';


tape('Param', (t) => {

  t.comment('constructor');

  const definitionTemplate = ['a'];
  const castFunction = (value) => value;

  t.throws(() => new Param('test', definitionTemplate, castFunction, {}, true), 'should throw if invalid definition');

  const param = new Param('test', definitionTemplate, castFunction, { a: true, constant: true }, true);

  t.comment('getValue');
  t.deepEqual(param.getValue(), true, 'should return the value');

  t.comment('setValue');
  t.throws(() => param.setValue(false), 'should throw if setting a constant param');

  t.end();
});
