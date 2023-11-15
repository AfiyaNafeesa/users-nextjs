import Network from "../network/Network";


export const callUsersApi = () => {
    return Network.makeApiCall({
        method: 'GET',
        url: "/api/?results=10"
    })
}