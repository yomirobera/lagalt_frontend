export const checkForUser = async (username) => {
    try {
        const response = await fetch('')
        if (!await response.ok) {
            throw new Error('Could not complete request.')
        }
        const data = await response.json()
    }
    catch(error) {
        
    }
}

export const createUser = () => {

} 