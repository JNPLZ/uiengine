require('mocha-sinon')()

const assert = require('assert')
const assertMatches = require('../../../test/support/assertMatches')
const Util = require('../src/util')

describe('Util', () => {
  describe('#upcaseFirstChar', () => {
    it('should convert the first character of the string to uppercase', () => {
      assert.equal(Util.upcaseFirstChar('test'), 'Test')
    })

    it('should not convert other characters to uppercase', () => {
      assert.equal(Util.upcaseFirstChar('test test test'), 'Test test test')
    })
  })

  describe('#dasherize', () => {
    it('should convert non-word character to dashes', () => {
      assert.equal(Util.dasherize('this is a test. does/it.work?'), 'this-is-a-test-does-it-work-')
    })
  })

  describe('#decorateContent', () => {
    it('should remove the rendered title from content if it matches the page title', () => {
      const page = {
        title: 'The page title',
        content: '<h1>The page title</h1>\n<p>This is the page content.</p>'
      }

      const content = Util.decorateContent(page)

      assert.equal(content, '<p>This is the page content.</p>')
    })

    it('should not remove the rendered title from content if it does not match the page title', () => {
      const page = {
        title: 'Another page title',
        content: '<h1>The page title</h1>\n<p>This is the page content.</p>'
      }

      const content = Util.decorateContent(page)

      assert.equal(content, '<h1>The page title</h1>\n<p>This is the page content.</p>')
    })
  })

  describe('#decorateRaw', () => {
    it('should return the highlighted raw code', () => {
      const decorated = Util.decorateRaw('var = "test"', 'js')

      assertMatches(decorated, '<pre class="hljs" lang="js"><span class="hljs-keyword">var</span> = <span class="hljs-string">"test"</span></pre>')
    })
  })

  describe('#decorateContext', () => {
    it('should return the highlighted and pretty-printed json', () => {
      const decorated = Util.decorateContext({ data: true })

      assertMatches(decorated, '<pre class="hljs" lang="json">{\n  <span class="hljs-attr">"data"</span>: <span class="hljs-literal">true</span>\n}</pre>')
    })
  })

  describe('#decorateRendered', () => {
    it('should return the highlighted rendered code', () => {
      const decorated = Util.decorateRendered('<h1>Title</h1>')

      assertMatches(decorated, '<pre class="hljs" lang="html"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></pre>')
    })
  })
})
