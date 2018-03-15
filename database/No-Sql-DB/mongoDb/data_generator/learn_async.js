function delay() {
  return new Promise(resolve => setTimeout(resolve, 3000))
}

async function delayedLog(item) {
  await delay()
  console.log(item)
}

async function processArray(array) {
  for (let i = 0; i < array.length; i++) {
    await delayedLog(array[i])
  }
  console.log('Done')
}

