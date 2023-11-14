export async function waitForElement(parent: Element | typeof document, selector: string) {
  return await new Promise<Element>((resolve) => {
    const element = parent.querySelector(selector)
    if (element) return resolve(element)

    const observer = new MutationObserver(() => {
      const element = parent.querySelector(selector)
      if (!element) return

      observer.disconnect()
      resolve(element)
    })

    observer.observe(parent === document ? document.body : parent, {
      childList: true,
      subtree: true,
    })
  })
}
