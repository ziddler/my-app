export const SearchMembersAPI = (filter) => {
    console.log(`https://hive2.lexvid.com/api/Find?Filter=${filter}`);
    
    try {
        return fetch(`https://hive2.lexvid.com/api/Find?Filter=${filter}`)
            .then( response => {
                return response.json()
            });
    } catch(error) {
        console.log("Error")
        return [];
    }
}


export const MemberDetailsAPI = (memberId) => {
    console.log(`https://hive2.lexvid.com/api/member/${memberId}`);
    
    try {
        return fetch(`https://hive2.lexvid.com/api/member/${memberId}`)
            .then( response => {
                return response.json()
            });
    } catch(error) {
        console.log("Error")
        return [];
    }
}

export const MemberCreditsAPI = (memberId) => {
    try {
        return fetch(`https://hive2.lexvid.com/api/member/${memberId}/credits`)
            .then( response => {
                return response.text()
            });
    } catch(error) {
        console.log("Error")
        return [];
    }
}

export const MemberBundlesAPI = (memberId) => {
    try {
        return fetch(`https://hive2.lexvid.com/api/member/${memberId}/bundles`)
            .then( response => {
                return response.text()
            });
    } catch(error) {
        console.log("Error")
        return [];
    }
}

export const MemberUnlimitedAPI = (memberId) => {
    console.log(`https://hive2.lexvid.com/api/member/${memberId}/unlimited`);
    
    try {
        return fetch(`https://hive2.lexvid.com/api/member/${memberId}/unlimited`)
            .then( response => {
console.log(response);

                return response.text()
            });
    } catch(error) {
        console.log("Error")
        return [];
    }
}