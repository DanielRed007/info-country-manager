
export const getServerData = async(url:string, method: string) => {

    const response = await fetch(url, {
        method: method,
    });

    return response.json();
};