const API_REDDIT = 'https://www.reddit.com';

const reddit = {
    async getAccess() {
        const access = await fetch('https://www.reddit.com/api/v1/access_token');
        console.log(access + ' the access token?')
        const response = await access.json()
        console.log(response + ' the response from access.json');
        return response;
    },
    async getSubreddits() {
        try {
            const response = await fetch(`${API_REDDIT}/subreddits.json`);
            const jsonResponse = await response.json();
    
            // console.log(jsonResponse)
        
            const children = jsonResponse.data.children.map(child => child.data);
            // console.log(children)
            return children
        } catch(error) {
            console.log(error)
        }

    },
    async getHome() {
        try {
            const response = await fetch(`${API_REDDIT}/r/Genshin_Impact.json`);
            if (response.ok) {
                const jsonResponse = await response.json();
                const children = jsonResponse.data.children.map(child => child.data)
                // console.log(children)
                return children;
            }
            throw new Error('Request Failed')
        } catch(error) {
            console.log(error)
        }
    },
    async getPopular() {
        const response = await fetch(`${API_REDDIT}/r/popular.json`);
        const jsonResponse = await response.json();

        const regexValidation = /\.(:?jpg|gif|png)$/;
        // const children = jsonResponse.data.children.filter(child => (child.data.url_overridden_by_dest !== undefined && child.data.url_overridden_by_dest.endsWith('jpg')))

        const children = jsonResponse.data.children.filter(child => (regexValidation.test(child.data.url_overridden_by_dest) && child.data.url_overridden_by_dest))

        // console.log(children)
        return children
    },
    async getAnyReddit(data) {
        try {
            const response = await fetch(`${API_REDDIT}/r/${data}.json`);
            if (response.ok) {
                const jsonResponse = await response.json();
                const children = jsonResponse.data.children.map(child => child.data)
                // console.log(children)
                return children;
            }

        } catch(error) {
            console.log(error)
        }

    }
}

export default reddit;
// home
// popular,
// all
// birdswitharms,
// unstirredpaint,
// chairsunderwater,
// boottoobig,


// title and url_overridden_by_dest or url, author


// for popular ... secure_media_embed then -> media_domain_url