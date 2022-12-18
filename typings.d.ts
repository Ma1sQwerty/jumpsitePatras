export interface Post {
    props: any;
    _id: string;
    _createdAt: string;
    title: string;
    author: {
        name: string;
        image: string;
    };
    description: string;
    mainImage: string;
    slug: {
        current: string;
    };
    body: [object];
}

export interface Contact {
    name: string;
    email: string;
    message: string;
}