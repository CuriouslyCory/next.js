import { nextTestSetup } from 'e2e-utils'

describe('app dir - duplicate layout components', () => {
  const { next, skipped } = nextTestSetup({
    files: __dirname,
    skipDeployment: true,
  })

  if (skipped) {
    return
  }

  it('should render the home page with correct layout structure', async () => {
    const browser = await next.browser('/')

    // Verify root layout elements
    expect(await browser.elementByCss('html[lang="en"]')).toBeTruthy()
    expect(await browser.elementByCss('body')).toBeTruthy()

    // Verify header and footer from root layout
    expect(await browser.elementByCss('#header')).toBeTruthy()
    expect(await browser.elementByCss('#footer')).toBeTruthy()

    // Verify main content elements from the root page
    expect(await browser.elementByCss('main')).toBeTruthy()
    expect(await browser.elementByCss('h1')).toBeTruthy()
    expect(await browser.elementByCss('#to-404')).toBeTruthy()

    // Verify counts for layout elements
    expect((await browser.elementsByCss('body')).length).toBe(1)
    expect((await browser.elementsByCss('#header')).length).toBe(1)
    expect((await browser.elementsByCss('#footer')).length).toBe(1)
    expect((await browser.elementsByCss('main')).length).toBe(1)
  })

  it('should not duplicate layout elements when navigating to 404', async () => {
    const browser = await next.browser('/')

    // Get initial element counts
    const initialBodyCount = (await browser.elementsByCss('body')).length
    const initialHeaderCount = (await browser.elementsByCss('#header')).length
    const initialFooterCount = (await browser.elementsByCss('#footer')).length
    const initialMainCount = (await browser.elementsByCss('main')).length

    // Navigate to non-existent page
    await browser.elementByCss('#to-404').click()
    await browser.waitForElementByCss('main')

    // Verify counts haven't changed - no duplication
    expect((await browser.elementsByCss('body')).length).toBe(initialBodyCount)
    expect((await browser.elementsByCss('#header')).length).toBe(
      initialHeaderCount
    )
    expect((await browser.elementsByCss('#footer')).length).toBe(
      initialFooterCount
    )
    expect((await browser.elementsByCss('main')).length).toBe(initialMainCount)
  })
})
