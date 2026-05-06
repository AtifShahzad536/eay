export const useHero = () => {
  const handleStartDesigning = () => {
    console.log('Starting design flow...')
  }

  const handleBrowseCollection = () => {
    console.log('Browsing collection...')
  }

  return {
    handleStartDesigning,
    handleBrowseCollection
  }
}
