var describe = global.describe
var it = global.it

var expect = require('chai').expect
var Kind = require('graphql/language').Kind

var GraphQlDate = require('../index.js')

describe('GraphQlDate', function () {
  describe('serialize', function() {
    it('should error when serializing a string value', function (done) {
      var str = '2015-07-24T10:56:42.744Z'
      expect(
        GraphQlDate.serialize.bind(GraphQlDate, str)
      ).to.throw(/not an instance of Date/)
      done()
    })

    it('should error when serializing a string value', function (done) {
      var date = new Date('invalid')

      expect(
        GraphQlDate.serialize.bind(GraphQlDate, date)
      ).to.throw(/an invalid Date/)
      done()
    })

    it('should serialize a date value', function (done) {
      var str = '2015-07-24T10:56:42.744Z'
      var date = new Date(str)
      expect(
        GraphQlDate.serialize(date)
      ).to.equal(date.toJSON())
      done()
    })
  })

  describe('parseValue', function () {
    it('should error when serializing a string value', function (done) {
      var str = 'invalid'

      expect(
        GraphQlDate.parseValue.bind(GraphQlDate, str)
      ).to.throw(/an invalid Date/)
      done()
    })

    it('should parse a value to date', function (done) {
      var str = '2015-07-24T10:56:42.744Z'
      var date = GraphQlDate.parseValue(str)
      expect(date).to.be.an.instanceOf(Date)
      expect(date.toJSON()).to.equal(str)
      done()
    })
  })

  describe('parseLiteral', function () {
    it('should error when parsing a ast int', function (done) {
      var ast = {
        kind: Kind.INT
      }
      expect(
        GraphQlDate.parseLiteral.bind(GraphQlDate, ast)
      ).to.throw(/only parse strings/)
      done()
    })

    it('should error when parsing ast w/ invalid value', function (done) {
      var ast = {
        kind: Kind.STRING,
        value: 'invalid'
      }
      expect(
        GraphQlDate.parseLiteral.bind(GraphQlDate, ast)
      ).to.throw(/Invalid date$/)
      done()
    })

    it('should error when parsing ast w/ invalid value format', function (done) {
      var ast = {
        kind: Kind.STRING,
        value: '2015-07-24T10:56:42' // doesnt have ms in format
      }
      expect(
        GraphQlDate.parseLiteral.bind(GraphQlDate, ast)
      ).to.throw(/Invalid date format/)
      done()
    })

    it('should parse a ast literal', function (done) {
      var ast = {
        kind: Kind.STRING,
        value: '2015-07-24T10:56:42.744Z'
      }
      var date = GraphQlDate.parseLiteral(ast)
      expect(date).to.be.an.instanceOf(Date)
      expect(date.toJSON()).to.equal(ast.value)
      done()
    })
  })
})