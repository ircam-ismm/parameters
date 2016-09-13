import parameters from '../src/parameters';
import tape from 'tape';

tape('example', (t) => {
  t.plan(7);

  const definitions = {
    myBooleanParam: {
      type: 'boolean',
      default: false,
      constant: false,
      metas: { kind: 'static' }
    },
    myIntegerParam: {
      type: 'integer',
      min: 0,
      max: Infinity,
      default: 0,
      constant: false,
      metas: {
        kind: 'static',
        shortDescr: 'My First Integer Param',
        fullDescr: 'This parameter is my first integer parameter in this example.',
        unit: '%',
        step: 1,
        max: 100,
      }
    },
    // ...
  };

  class MyClass {
    constructor(options) {
      this.params = parameters(definitions, options);

      this.params.addListener((name, value, metas) => {
        t.deepEqual(name, 'myIntegerParam', 'should have proper name');
        t.deepEqual(value, definitions.myIntegerParam.min, 'should have proper value');
        t.deepEqual(metas, definitions.myIntegerParam.metas, 'should have proper metas');
      });

      this.params.addParamListener('myIntegerParam', (value, metas) => {
        t.deepEqual(value, definitions.myIntegerParam.min, 'should have proper value');
        t.deepEqual(metas, definitions.myIntegerParam.metas, 'should have proper metas');
      });
    }
  }

  const myInstance = new MyClass({ myIntegerParam: 42 });

  const bValue = myInstance.params.get('myBooleanParam');
  t.deepEqual(bValue, false, 'should have proper value');

  const iValue = myInstance.params.get('myIntegerParam');
  t.deepEqual(iValue, 42, 'should have proper value');

  myInstance.params.set('myIntegerParam', definitions.myIntegerParam.min - 1);
});
