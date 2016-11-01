import { expect } from 'chai'
import code from './code'
import test from 'mocha-test-dsl'

test('Operator: code')
  .that('an instance')
  .should('have a name', () => {
    let result = code('kris')
    expect(result).to.eql(true)
  })
  .run()
