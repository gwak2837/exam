export async function waitForElement(selector: string) {
  return await new Promise<Element>((resolve) => {
    const element = document.querySelector(selector)
    if (element) return resolve(element)

    const observer = new MutationObserver(() => {
      const element = document.querySelector(selector)
      if (!element) return

      observer.disconnect()
      resolve(element)
    })

    observer.observe(document.body, { childList: true, subtree: true })
  })
}
