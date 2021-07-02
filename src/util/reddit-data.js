const API_REDDIT = 'https://www.reddit.com';

const reddit = {
    async getAccess() {
        const access = await fetch('https://www.reddit.com/api/v1/access_token');
        // console.log(access + ' the access token?')
        const response = await access.json()
        // console.log(response + ' the response from access.json');
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
            const response = await fetch(`${API_REDDIT}/r/Home.json`);
            if (response.ok) {
                const jsonResponse = await response.json();
                const children = jsonResponse.data.children.map(child => child.data)
                // console.log(jsonResponse)
                // console.log(children)
                return children;
            }
            throw new Error('Request Failed');
        } catch(error) {
            console.log(error)
        }
    },
    async getPopular() {
        try {
            const response = await fetch(`${API_REDDIT}/r/popular.json`);
            if (response.ok) {
                const jsonResponse = await response.json();

                const children = jsonResponse.data.children.map(child => child.data);
        
                // console.log(children)
                return children
            }
            throw new Error('Request Failed');
        } catch(error) {
            console.log(error)
        }
    },
    async getAnyReddit(data) {
        try {
            const response = await fetch(`${API_REDDIT}/r/${data}.json`);
            if (response.ok) {
                const jsonResponse = await response.json();
                const children = jsonResponse.data.children.map(child => child.data)
                // console.log(jsonResponse);
                // console.log(children)
                return children;
            }
            throw new Error('Request Failed');
        } catch(error) {
            console.log(error)
        }

    },
    async getPost(permalink) {
        try {
            const response = await fetch(`${API_REDDIT}${permalink}.json`);
            const jsonResponse = await response.json();

            const children = jsonResponse[1].data.children.map(child => child.data)

            return children;
        } catch(error) {
            console.log(error)
        }
    }
}

export default reddit;