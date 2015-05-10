inside = (what, from)=>
  if typeof window isnt 'undefined'
    window[what] = from
  else
    global[what] = from
we = (obj)-> obj
load = (thing)=> inside thing, we require thing

getARandomString = -> Math.random().toString(36).replace(/[^a-zA-Z]+/g, '')

inside '_', we require 'underscore'

inside 'backbone-drupal', we require '../dist/js/index'

load('chai').should()


describe 'FAIL', ->
  it 'Should fail, because I need to learn how to use Casper and go TDD !', ->
    (()-> false).should.be.equal true
