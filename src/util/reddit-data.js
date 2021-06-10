const API_REDDIT = 'https://www.reddit.com';
const secret = 'Ihok5Qj1ikuGNBJkqEztFiIZkdb-NQ';
const APPname = 'Mohamed';
const redirectURI = 'https://xenodochial-kilby-1c5b3b.netlify.app/';
const developers = 'HavenClub';
const firstPart = 'https://www.reddit.com/api/v1/authorize?client_id=CLIENT_ID&response_type=TYPE&';
const secondPart = 'state=RANDOM_STRING&redirect_uri=URI&duration=DURATION&scope=SCOPE_STRING';


const reddit = {
    async getAccess() {
        const access = await fetch('https://www.reddit.com/api/v1/access_token');
        console.log(access + ' the access token?')
        const response = await access.json()
        console.log(response + ' the response from access.json')
        return response;
    },
    async getSubreddits() {
        const response = await fetch(`${API_REDDIT}/subreddits.json`);
        const jsonResponse = await response.json();
    
        const children = jsonResponse.data.children.map(child => child.data.url);
        // console.log(children)
        return children
    },
    async getHome() {
        try {
            const response = await fetch(`${API_REDDIT}/r/home.json`);
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

        
        // const testIt = children.forEach((child, index) => child.test(regexValidation))
        // console.log(children)
        // console.log(jsonResponse)
        console.log(children)
        return children
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