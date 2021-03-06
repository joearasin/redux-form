import expect from 'expect';
import getValues from '../getValues';

describe('getValues', () => {
  it('should get values from form', () => {
    const form = {
      foo: {value: 'bar'},
      catLives: {value: 9},
      alive: {value: true}
    };
    const fields = ['foo', 'catLives', 'alive'];
    expect(getValues(fields, form))
      .toBeA('object')
      .toEqual({
        foo: 'bar',
        catLives: 9,
        alive: true
      });
  });

  it('should allow undefined values', () => {
    const form = {
      foo: {value: 'bar'}
    };
    const fields = ['foo', 'missing'];
    expect(getValues(fields, form))
      .toBeA('object')
      .toEqual({
        foo: 'bar',
        missing: undefined
      });
  });

  it('should get values from deep form', () => {
    const form = {
      foo: {
        bar: {value: 'baz'}
      },
      lives: {
        cat: {value: 9}
      },
      alive: {value: true}
    };
    const fields = ['foo.bar', 'lives.cat', 'alive'];
    expect(getValues(fields, form))
      .toBeA('object')
      .toEqual({
        foo: {
          bar: 'baz'
        },
        lives: {
          cat: 9
        },
        alive: true
      });
  });

  it('should get values from array form', () => {
    const form = {
      foo: [
        {value: 'bar'},
        {value: 'baz'},
        {}
      ],
      alive: {value: true}
    };
    const fields = ['foo[]', 'alive'];
    expect(getValues(fields, form))
      .toBeA('object')
      .toEqual({
        foo: ['bar', 'baz', undefined],
        alive: true
      });
  });

  it('should allow an array to be empty', () => {
    const form = {
      foo: []
    };
    const fields = ['foo[]'];
    expect(getValues(fields, form))
      .toBeA('object')
      .toEqual({foo: []});
  });

  it('should get values from deep array form', () => {
    const form = {
      foo: {
        animals: [
          {value: 'cat'},
          {value: 'dog'},
          {value: 'rat'}
        ]
      },
      bar: [
        {
          deeper: {
            value: 42
          }
        }
      ]
    };
    const fields = ['foo.animals[]', 'bar[].deeper'];
    expect(getValues(fields, form))
      .toBeA('object')
      .toEqual({
        foo: {
          animals: ['cat', 'dog', 'rat']
        },
        bar: [{deeper: 42}]
      });
  });
});
