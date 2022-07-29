export type GeneralInfo = {
    _createdAt: string
    _updatedAt: string
    _id: string
    _rev: string
    _type: string
}

export type Image = {
    _type: string
    asset: {
        _ref: string
        _type: 'reference'
    }
}

export type Slug = {
    current: string
    _type: 'slug'
}