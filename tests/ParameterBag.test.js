import parameters from '../src/parameters';
import tape from 'tape';


tape('ParameterBag', (t) => {
  t.plan(19);

  const definitions = {
    'a': {
      type:'boolean',
      default: false,
      metas: {},
    },
  };

  const bag = parameters(definitions, { 'a': true });

  t.comment('get');
  t.deepEqual(bag.get('a'), true, 'should return the value of a given param');

  t.comment('set');
  t.deepEqual(bag.set('a', false), false, 'should update the value of a given param');

  const f1 = function() {};
  const f2 = function() {};

  t.comment('addListener / removeListener');

  bag.addListener(f1);
  t.deepEqual(bag._globalListeners.size, 1, 'should register listeners properly');

  bag.removeListener(f2); // noop if callback not registered
  t.deepEqual(bag._globalListeners.size, 1, 'should remove listeners properly');

  bag.removeListener(f1);
  t.deepEqual(bag._globalListeners.size, 0, 'should remove listeners properly');

  bag.addListener(f1);
  bag.addListener(f2);

  t.deepEqual(bag._globalListeners.size, 2, 'should register listeners properly');

  bag.removeListener();
  t.deepEqual(bag._globalListeners.size, 0, 'should clear listeners properly');


  t.comment('addParamListener / removeParamListener');

  bag.addParamListener('a', f1);
  t.deepEqual(bag._paramsListeners['a'].size, 1, 'should register listeners properly');

  bag.removeParamListener('a', f2); // noop if callback not registered
  t.deepEqual(bag._paramsListeners['a'].size, 1, 'should remove listeners properly');

  bag.removeParamListener('a', f1);
  t.deepEqual(bag._paramsListeners['a'].size, 0, 'should remove listeners properly');

  bag.addParamListener('a', f1);
  bag.addParamListener('a', f2);

  t.deepEqual(bag._paramsListeners['a'].size, 2, 'should register listeners properly');

  bag.removeParamListener('a');
  t.deepEqual(bag._paramsListeners['a'].size, 0, 'should clear listeners properly');


  // callbacks

  bag.set('a', false);
  let counter = 0;
  let globalCallbackCalled = false;
  let paramCallbackCalled = false;

  const globalCallback = function(n, v, m) {
    if (globalCallbackCalled)
      t.fail(`shouln't be called value didn't change`);

    globalCallbackCalled = true
    counter += 1;
    t.comment('listenerCallback');
    t.deepEqual(n, 'a', 'should have param name as first argument');
    t.deepEqual(v, true, 'should have param value as second argument');
    t.deepEqual(m, definitions['a'].metas, 'should have param metas as third argument');
    t.deepEqual(counter, 1, 'should be called before param listeners if value change');
  }

  const paramCallback = function(v, m) {
    if (paramCallbackCalled)
      t.fail(`shouln't be called value didn't change`);

    paramCallbackCalled = true

    counter += 1;
    t.comment('paramListenerCallback');
    t.deepEqual(v, true, 'should have param value as first argument');
    t.deepEqual(m, definitions['a'].metas, 'should have param metas as second argument');
    t.deepEqual(counter, 2, 'should be called after global listeners if value change');
  }

  bag.addListener(globalCallback);
  bag.addParamListener('a', paramCallback);
  bag.set('a', true);
  bag.set('a', true);

});
