
export const getUserOrgs = async () => {
    const data = {
        orgs: [
            {
                id: "org1",
                name: "org1",
                description: "org1 description",
                owner: "org1 owner",
                moderators: ["mod1", "mod2"],
                users: ["user1", "user2"],
                events: ["event1", "event2"]
            },
            {
                id: "org2",
                name: "org2",
                description: "org2 description",
                owner: "org2 owner",
                moderators: ["mod1", "mod2"],
                users: ["user1", "user2"],
                events: ["event1", "event2"]
            }
        ]
    }
    return data;
}