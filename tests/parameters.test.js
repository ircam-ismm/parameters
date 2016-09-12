import parameters from '../src/parameters';
import tape from 'tape';

tape('parameter', (t) => {

  let defs;
  const params = parameters({}, {});

  t.throws(() => parameters({}, { test: 1 }), 'should throw if value not found in definitions')

  const def0 = { unknownType: { type: 'unknown' } };

  t.throws(() => parameter(def0), 'should throw if unknown parameter type');

  const def1 = {
    twice: { type: 'boolean' },
    twice: { type: 'boolean' },
  };

  t.throws(() => parameter(def1), 'should throw if param name defined twice');

  t.end();
});
